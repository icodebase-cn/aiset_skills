# 火山引擎视频理解（aiset-volcengine-video-understanding）

## 描述

基于火山引擎（字节跳动）的视频内容理解工具，对视频进行智能分析，提取关键信息、场景描述、字幕和内容摘要。

## 功能

- 视频内容智能分析
- 场景识别和描述
- 字幕提取和转写
- 内容摘要生成
- 基于火山引擎 API

## 快速上手

```bash
# 分析本地视频
/aiset-volcengine-video-understanding video.mp4

# 分析在线视频
/aiset-volcengine-video-understanding https://example.com/video.mp4

# 提取字幕
/aiset-volcengine-video-understanding video.mp4 --task subtitle

# 生成摘要
/aiset-volcengine-video-understanding video.mp4 --task summary
```

## 支持的分析任务

| 任务 | 说明 |
|------|------|
| 内容理解 | 理解视频主题和内容 |
| 场景描述 | 描述关键场景画面 |
| 字幕提取 | 从视频中提取语音字幕 |
| 内容摘要 | 生成视频内容摘要 |

## 最佳实践

1. **API 配置**：使用前需配置火山引擎 API 密钥
2. **视频格式**：支持常见视频格式（MP4、AVI、MOV 等）
3. **结合内容创作**：视频理解结果可用于生成文章或字幕
4. **触发关键词**：当用户提到"视频分析"、"视频理解"、"volcengine video"时使用此 skill
