---
name: aiset-compress-image
description: Compresses images to WebP (default) or PNG with automatic tool selection. Use when user asks to "compress image", "optimize image", "convert to webp", or reduce image file size.
---

# 图片压缩工具（aiset-compress-image）

## 描述

将图片压缩为WebP（默认）或PNG格式，自动选择最佳工具。适用于压缩图片、优化图片、转换为WebP、减小文件大小等场景。

## 功能

- 自动选择最佳工具：sips → cwebp → ImageMagick → Sharp
- 默认输出WebP格式，可选PNG
- 支持批量压缩
- 保持图片质量的同时减小文件大小

## Script Directory

Scripts in `scripts/` subdirectory. Replace `${SKILL_DIR}` with this SKILL.md's directory path.

| Script | Purpose |
|--------|---------|
| `scripts/main.ts` | Image compression CLI |

## Preferences (EXTEND.md)

Use Bash to check EXTEND.md existence (priority order):

```bash
# Check project-level first
test -f .aiset_skills/aiset-compress-image/EXTEND.md && echo "project"

# Then user-level (cross-platform: $HOME works on macOS/Linux/WSL)
test -f "$HOME/.aiset_skills/aiset-compress-image/EXTEND.md" && echo "user"
```

┌────────────────────────────────────────────────────────┬───────────────────┐
│                          Path                          │     Location      │
├────────────────────────────────────────────────────────┼───────────────────┤
│ .aiset_skills/aiset-compress-image/EXTEND.md           │ Project directory │
├────────────────────────────────────────────────────────┼───────────────────┤
│ $HOME/.aiset_skills/aiset-compress-image/EXTEND.md     │ User home         │
└────────────────────────────────────────────────────────┴───────────────────┘

┌───────────┬───────────────────────────────────────────────────────────────────────────┐
│  Result   │                                  Action                                   │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Found     │ Read, parse, apply settings                                               │
├───────────┼───────────────────────────────────────────────────────────────────────────┤
│ Not found │ Use defaults                                                              │
└───────────┴───────────────────────────────────────────────────────────────────────────┘

**EXTEND.md Supports**: Default format | Default quality | Keep original preference

## Usage

```bash
npx -y bun ${SKILL_DIR}/scripts/main.ts <input> [options]
```

## Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `<input>` | | File or directory | Required |
| `--output` | `-o` | Output path | Same path, new ext |
| `--format` | `-f` | webp, png, jpeg | webp |
| `--quality` | `-q` | Quality 0-100 | 80 |
| `--keep` | `-k` | Keep original | false |
| `--recursive` | `-r` | Process subdirs | false |
| `--json` | | JSON output | false |

## Examples

```bash
# Single file → WebP (replaces original)
npx -y bun ${SKILL_DIR}/scripts/main.ts image.png

# Keep PNG format
npx -y bun ${SKILL_DIR}/scripts/main.ts image.png -f png --keep

# Directory recursive
npx -y bun ${SKILL_DIR}/scripts/main.ts ./images/ -r -q 75

# JSON output
npx -y bun ${SKILL_DIR}/scripts/main.ts image.png --json
```

**Output**:
```
image.png → image.webp (245KB → 89KB, 64% reduction)
```

## Extension Support

Custom configurations via EXTEND.md. See **Preferences** section for paths and supported options.
