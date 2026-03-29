# Markdown 转 HTML（aiset-markdown-to-html）

## 描述

将 Markdown 转换为带样式的 HTML，支持微信公众号兼容主题。提供代码高亮、数学公式、PlantUML、脚注、警告框和信息图等丰富功能。

## 功能

- 多种微信兼容主题样式
- 代码语法高亮
- 数学公式渲染（LaTeX/KaTeX）
- PlantUML 图表支持
- 脚注（footnotes）支持
- GitHub 风格警告框（alerts）
- 信息图嵌入

## 快速上手

```bash
# 转换 Markdown 为 HTML（传入文件路径）
/aiset-markdown-to-html article.md

# 直接传入 Markdown 内容（无需文件）
/aiset-markdown-to-html "# 标题\n\n正文内容..."

# 指定主题
/aiset-markdown-to-html article.md --theme wechat

# 输出到指定文件
/aiset-markdown-to-html article.md --output article.html

# MD 转 HTML（中文触发，可直接跟内容）
md转html: article.md
md转html: # 标题内容...
```

## 支持的特殊语法

```markdown
# 数学公式
$$E = mc^2$$

# 警告框
> [!NOTE]
> 这是一条注意信息

> [!WARNING]
> 这是一条警告

# PlantUML 图表
​```plantuml
@startuml
A -> B: 请求
B -> A: 响应
@enduml
​```

# 脚注
这是一段文字[^1]
[^1]: 这是脚注内容
```

## 最佳实践

1. **微信发布**：使用微信兼容主题，确保在公众号中渲染正常
2. **技术文章**：代码高亮和数学公式让技术内容更专业
3. **配合 post-to-wechat**：先转 HTML 再发布到微信公众号
4. **触发关键词**：当用户提到"Markdown 转 HTML"、"md转html"、"convert md"时使用此 skill
