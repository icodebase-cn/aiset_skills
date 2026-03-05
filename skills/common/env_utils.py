#!/usr/bin/env python3
"""
环境变量加载工具模块
统一处理 .env 文件加载，遵循 aiset-image-gen 的加载顺序
"""

import os
import sys
from pathlib import Path
from typing import Dict, List, Optional


def load_env_file(file_path: Path) -> Dict[str, str]:
    """
    加载单个 .env 文件

    Args:
        file_path: .env 文件路径

    Returns:
        环境变量字典
    """
    env: Dict[str, str] = {}
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            for line in f:
                trimmed = line.strip()
                if not trimmed or trimmed.startswith("#"):
                    continue
                idx = trimmed.find("=")
                if idx == -1:
                    continue
                key = trimmed[:idx].strip()
                val = trimmed[idx + 1:].strip()
                if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                    val = val[1:-1]
                env[key] = val
    except FileNotFoundError:
        pass
    return env


def load_env() -> None:
    """
    按优先级加载环境变量

    加载顺序 (高 -> 低):
    1. 已存在的 process.env (系统环境变量)
    2. <cwd>/.aiset_skills/.env (当前工作目录)
    3. ~/.aiset_skills/.env (用户主目录)
    """
    home = Path.home()
    cwd = Path.cwd()

    # 从低优先级开始加载，高优先级会覆盖低优先级
    home_env = load_env_file(home / ".aiset_skills" / ".env")
    cwd_env = load_env_file(cwd / ".aiset_skills" / ".env")

    # 先加载用户主目录的（低优先级）
    for key, val in home_env.items():
        if key not in os.environ:
            os.environ[key] = val

    # 再加载当前工作目录的（中优先级）
    for key, val in cwd_env.items():
        if key not in os.environ:
            os.environ[key] = val

    # 已存在的环境变量保持不变（最高优先级）


def get_env_key(key_name: str, alias_names: Optional[List[str]] = None) -> Optional[str]:
    """
    获取环境变量值，支持别名

    Args:
        key_name: 主要环境变量名
        alias_names: 别名列表（可选）

    Returns:
        环境变量值，未找到返回 None
    """
    # 确保 env 已加载
    load_env()

    # 先检查主键
    val = os.environ.get(key_name)
    if val:
        return val

    # 检查别名
    if alias_names:
        for alias in alias_names:
            val = os.environ.get(alias)
            if val:
                return val

    return None


def require_env_key(key_name: str, alias_names: Optional[List[str]] = None, error_message: Optional[str] = None) -> str:
    """
    获取必需的环境变量，未找到则退出程序

    Args:
        key_name: 主要环境变量名
        alias_names: 别名列表（可选）
        error_message: 自定义错误消息（可选）

    Returns:
        环境变量值

    Exits:
        如果未找到环境变量则退出程序
    """
    val = get_env_key(key_name, alias_names)
    if not val:
        if error_message:
            print(f"❌ 错误: {error_message}", file=sys.stderr)
        else:
            keys = [key_name]
            if alias_names:
                keys.extend(alias_names)
            key_list = " 或 ".join(keys)
            print(f"❌ 错误: 请设置 {key_list} 环境变量", file=sys.stderr)
        print(f"\n💡 配置方式:", file=sys.stderr)
        print(f"   1. 复制 .aiset_skills/.env.example 到 .aiset_skills/.env 并填写", file=sys.stderr)
        print(f"   2. 或设置环境变量: export {key_name}=your-key", file=sys.stderr)
        sys.exit(1)
    return val


# 为了兼容旧代码，单独导入 sys
import sys
