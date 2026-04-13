#!/usr/bin/env python3
"""
aiset-volcengine-video-understanding
基于火山引擎（豆包 ARK API）的视频内容理解工具
支持本地视频文件路径（OSS URL）或在线视频链接
用法：
  main.py <video_path_or_url> [--task content|subtitle|summary|scene] [--question 自定义问题]
  main.py "[视频:path_or_url]" ...
"""

import argparse
import base64
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request

# ── 配置 ──────────────────────────────────────────────────────────────────────

ARK_API_KEY = os.environ.get("ARK_API_KEY", "")
DOUBAO_BASE_URL = os.environ.get("DOUBAO_BASE_URL", "https://ark.cn-beijing.volces.com/api/v3")
# 豆包视觉理解模型（支持视频输入）
DEFAULT_MODEL = "doubao-seed-2-0-lite-260215"
# 提取的帧数（均匀采样）
FRAME_COUNT = 8


# ── 辅助函数 ──────────────────────────────────────────────────────────────────

def parse_args(argv=None):
    """解析命令行参数，同时兼容 [视频:path] 格式"""
    raw = " ".join(argv or sys.argv[1:])

    # 从 [视频:path] 格式提取视频路径
    video_tag_match = re.search(r'\[视频:([^\]]+)\]', raw)
    if video_tag_match:
        video_input = video_tag_match.group(1).strip()
        # 去除原始文本中的 [视频:...] 标签，剩余部分作为 question
        remaining = raw.replace(video_tag_match.group(0), "").strip()
        # 解析剩余的参数
        remaining_args = remaining.split() if remaining else []
    else:
        remaining_args = argv or sys.argv[1:]
        video_input = None

    parser = argparse.ArgumentParser(description="火山引擎视频内容理解工具")
    parser.add_argument("video", nargs="?", help="视频路径或 URL")
    parser.add_argument("--task", choices=["content", "subtitle", "summary", "scene"],
                        default="content", help="分析任务类型（默认：content）")
    parser.add_argument("--question", type=str, default="",
                        help="自定义分析问题（优先于 --task）")
    parser.add_argument("--model", type=str, default=DEFAULT_MODEL,
                        help="使用的模型 ID")

    try:
        parsed = parser.parse_args(remaining_args)
    except SystemExit:
        parsed = parser.parse_args([])

    if video_input:
        parsed.video = video_input
    elif not parsed.video and remaining_args:
        # 兼容直接传路径的情况
        parsed.video = remaining_args[0]

    return parsed


def build_question(task: str, custom_question: str) -> str:
    """根据任务类型生成分析问题"""
    if custom_question:
        return custom_question
    questions = {
        "content":  "请详细分析这个视频的内容，包括：主题、主要情节、人物、场景、传递的信息或情感。",
        "subtitle": "请提取这个视频中所有出现的语音对话或字幕文字，按时间顺序整理成文字稿。",
        "summary":  "请为这个视频生成一段简洁的内容摘要（200字以内），概括视频的核心主题和要点。",
        "scene":    "请描述视频中的关键场景画面，包括：画面构成、视觉元素、色调、氛围、每个场景的转换时机。",
    }
    return questions.get(task, questions["content"])


def is_url(s: str) -> bool:
    return s.startswith("http://") or s.startswith("https://")


def _is_responses_model(model: str) -> bool:
    """判断是否使用 /responses 接口。
    doubao-seed 系列是图片理解模型，需要先提取帧再调用。
    其他豆包视觉模型直接支持 video_url。
    """
    return 'seed' in model.lower()


def extract_frames(video_url: str, frame_count: int = FRAME_COUNT) -> list:
    """从视频 URL 用 ffmpeg 均匀提取帧，返回 base64 列表。需要服务器已安装 ffmpeg。"""
    if not shutil.which('ffmpeg'):
        raise RuntimeError("服务器未安装 ffmpeg，无法提取视频帧。请联系管理员执行: apt-get install -y ffmpeg")

    # 获取视频时长
    probe_cmd = [
        'ffprobe', '-v', 'quiet', '-print_format', 'json',
        '-show_streams', video_url
    ]
    try:
        probe_out = subprocess.check_output(probe_cmd, stderr=subprocess.DEVNULL, timeout=30)
        probe_data = json.loads(probe_out)
        duration = float(next(
            s['duration'] for s in probe_data.get('streams', [])
            if s.get('codec_type') == 'video'
        ))
    except Exception:
        duration = 60.0  # 无法检测时默认 60 秒

    with tempfile.TemporaryDirectory() as tmp_dir:
        # 将视频分成 N 个等分点，每个等分点提取一帧
        interval = duration / (frame_count + 1)
        frames_b64 = []
        for i in range(1, frame_count + 1):
            seek = interval * i
            out_path = os.path.join(tmp_dir, f'frame_{i:02d}.jpg')
            cmd = [
                'ffmpeg', '-ss', str(seek), '-i', video_url,
                '-frames:v', '1', '-q:v', '3',
                '-vf', 'scale=800:-1',  # 宽度小于等于 800px，节省 token
                out_path, '-y', '-loglevel', 'quiet'
            ]
            try:
                subprocess.run(cmd, timeout=60, check=True,
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                if os.path.exists(out_path):
                    with open(out_path, 'rb') as f:
                        frames_b64.append(base64.b64encode(f.read()).decode())
            except Exception:
                pass  # 单帧失败不中断
        return frames_b64


def call_with_frames(frames_b64: list, question: str, model: str) -> str:
    """用帧图片调用 /responses 接口（doubao-seed 系列）"""
    api_url = DOUBAO_BASE_URL.rstrip('/') + '/responses'
    content = []
    for b64 in frames_b64:
        content.append({
            "type": "input_image",
            "image_url": f"data:image/jpeg;base64,{b64}",
        })
    content.append({"type": "input_text", "text": question})

    payload = {
        "model": model,
        "input": [{"role": "user", "content": content}],
    }
    data = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {ARK_API_KEY}'}
    req = urllib.request.Request(api_url, data=data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = resp.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='replace')
        raise RuntimeError(f"HTTP {e.code}: {err_body}")

    result = json.loads(body)
    for item in result.get('output', []):
        for c in item.get('content', []):
            if isinstance(c, dict) and c.get('type') == 'output_text':
                return c.get('text', '')
            if isinstance(c, dict) and 'text' in c:
                return c.get('text', '')
    raise RuntimeError(f"/responses 返回格式未预期: {body[:200]}")


def call_with_video_url(video_url: str, question: str, model: str) -> str:
    """直接用 video_url 调用 /chat/completions（原生视频理解模型）"""
    api_url = DOUBAO_BASE_URL.rstrip('/') + '/chat/completions'
    payload = {
        "model": model,
        "messages": [{
            "role": "user",
            "content": [
                {"type": "video_url", "video_url": {"url": video_url}},
                {"type": "text", "text": question},
            ],
        }],
    }
    data = json.dumps(payload).encode('utf-8')
    headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {ARK_API_KEY}'}
    req = urllib.request.Request(api_url, data=data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            body = resp.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='replace')
        raise RuntimeError(f"HTTP {e.code}: {err_body}")
    result = json.loads(body)
    return result['choices'][0]['message']['content']


# ── 主流程 ────────────────────────────────────────────────────────────────────

def main():
    args = parse_args()

    # 检查 API Key
    if not ARK_API_KEY:
        print("❌ 未配置火山引擎 API Key", flush=True)
        print("请在服务器配置中添加 doubao/ark 供应商的 API Key", flush=True)
        sys.exit(1)

    # 检查视频输入
    video_input = args.video
    if not video_input:
        print("❌ 请提供视频路径或 URL", flush=True)
        print("用法：/aiset-volcengine-video <视频路径或URL> [--task content|subtitle|summary|scene]", flush=True)
        sys.exit(1)

    video_input = video_input.strip().strip('"').strip("'")

    # 确定视频 URL
    if is_url(video_input):
        video_url = video_input
        print(f"🔗 使用在线视频链接: {video_url}", flush=True)
    else:
        # 本地文件路径：检查文件是否存在
        if not os.path.exists(video_input):
            print(f"❌ 视频文件不存在: {video_input}", flush=True)
            print("请通过上传按钮上传视频，或提供可访问的在线视频链接", flush=True)
            sys.exit(1)
        # 本地文件无法直接传给 ARK API，需要 OSS URL
        # 服务端会在消息处理阶段将本地路径转换为 OSS URL
        # 这里直接使用 file:// 路径尝试，实际应为 OSS URL
        file_size = os.path.getsize(video_input)
        print(f"📁 检测到本地视频文件: {os.path.basename(video_input)} ({file_size // 1024 // 1024}MB)", flush=True)
        print("⚠️ 火山引擎 API 需要可公网访问的视频 URL，本地文件路径无法直接使用", flush=True)
        print("请使用客户端上传按钮上传视频，系统会自动上传到 OSS 并获取可访问链接", flush=True)
        sys.exit(1)

    # 构建分析问题
    question = build_question(args.task, args.question)
    task_name = {"content": "内容理解", "subtitle": "字幕提取", "summary": "内容摘要", "scene": "场景描述"}.get(args.task, "内容理解")
    print(f"🎯 分析任务: {task_name}", flush=True)
    print(f"📝 分析问题: {question}", flush=True)

    # 调用 API
    try:
        if _is_responses_model(args.model):
            # seed 系列图片模型：用 ffmpeg 提取帧再调用
            print(f"🎥 正在从视频提取关键帧（共 {FRAME_COUNT} 帧）...", flush=True)
            frames = extract_frames(video_url, FRAME_COUNT)
            if not frames:
                raise RuntimeError("视频帧提取失败，请确认服务器已安装 ffmpeg")
            print(f"✅ 已提取 {len(frames)} 帧，正在调用视觉模型分析...", flush=True)
            result = call_with_frames(frames, question, args.model)
        else:
            # 原生视频理解模型：直接传视频 URL
            print("📡 正在调用火山引擎视频理解 API...", flush=True)
            result = call_with_video_url(video_url, question, args.model)
        print("\n✅ 视频分析完成\n", flush=True)
        print(result, flush=True)
    except Exception as e:
        err_msg = str(e)
        print(f"\n❌ 视频分析失败: {err_msg}", flush=True)
        if "api_key" in err_msg.lower() or "unauthorized" in err_msg.lower() or "authentication" in err_msg.lower():
            print("💡 提示：请检查服务器中 doubao/ark 供应商的 API Key 配置是否正确", flush=True)
        elif "ffmpeg" in err_msg.lower():
            print("💡 提示：请在服务器执行: sudo apt-get install -y ffmpeg", flush=True)
        elif "model" in err_msg.lower():
            print(f"💡 提示：模型 {args.model} 可能不支持视频输入，请确认已开通视觉模型权限", flush=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
