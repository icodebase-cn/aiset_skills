#!/usr/bin/env node
/**
 * aiset-markdown-to-html
 * 将 Markdown 转换为带样式的 HTML，支持微信公众号兼容主题
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface ConvertOptions {
  theme?: string;
  output?: string;
}

function parseArgs(args: string[]): { input: string; options: ConvertOptions } {
  const options: ConvertOptions = {};
  let input = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--theme' && i + 1 < args.length) {
      options.theme = args[++i];
    } else if (arg === '--output' && i + 1 < args.length) {
      options.output = args[++i];
    } else if (!arg.startsWith('--') && !input) {
      input = arg;
    }
  }

  return { input, options };
}

function markdownToHtml(markdown: string, theme: string = 'default'): string {
  let html = markdown;

  // 转义 HTML 特殊字符
  html = html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

  // 代码块 (```...```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'text';
    return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
  });

  // 行内代码 (`...`)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 标题 (# ...)
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 粗体 (**...**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 斜体 (*...*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 删除线 (~~...~~)
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // 链接 ([text](url))
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // 图片 (![alt](url))
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // 引用 (> ...)
  html = html.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>');

  // 无序列表 (- ... 或 * ...)
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');

  // 有序列表 (1. ...)
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // 水平线 (--- 或 ***)
  html = html.replace(/^(---|\*\*\*)$/gim, '<hr />');

  // 换行处理
  html = html.replace(/\n/g, '<br />');

  return wrapWithTheme(html, theme);
}

function wrapWithTheme(content: string, theme: string): string {
  const themes: Record<string, string> = {
    default: `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
        h1, h2, h3, h4, h5, h6 { color: #2c3e50; margin-top: 24px; margin-bottom: 16px; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
        h2 { border-bottom: 1px solid #eee; padding-bottom: 8px; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
        code { background: #f6f8fa; padding: 2px 6px; border-radius: 3px; font-family: "SFMono-Regular", Consolas, monospace; }
        pre code { background: none; padding: 0; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #666; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        img { max-width: 100%; height: auto; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        td, th { border: 1px solid #ddd; padding: 8px; }
        hr { border: none; border-top: 1px solid #eee; margin: 24px 0; }
      </style>
    `,
    wechat: `
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", sans-serif; line-height: 1.8; max-width: 677px; margin: 0 auto; padding: 20px; color: #333; background: #fff; }
        h1 { font-size: 20px; font-weight: bold; margin: 20px 0; color: #000; }
        h2 { font-size: 18px; font-weight: bold; margin: 18px 0; color: #000; }
        h3 { font-size: 16px; font-weight: bold; margin: 16px 0; color: #000; }
        p { margin: 10px 0; text-align: justify; }
        pre { background: #f8f8f8; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 14px; }
        code { background: #f8f8f8; padding: 2px 4px; border-radius: 2px; font-family: "SFMono-Regular", Consolas, monospace; font-size: 14px; }
        pre code { background: none; padding: 0; }
        blockquote { border-left: 3px solid #07c160; margin: 10px 0; padding: 10px 15px; background: #f7f7f7; color: #666; }
        a { color: #576b95; text-decoration: none; }
        img { max-width: 100%; height: auto; display: block; margin: 10px 0; }
        strong { font-weight: bold; }
        em { font-style: italic; }
        hr { border: none; border-top: 1px solid #e5e5e5; margin: 20px 0; }
      </style>
    `
  };

  const themeStyle = themes[theme] || themes.default;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown to HTML</title>
  ${themeStyle}
</head>
<body>
${content}
</body>
</html>`;
}

async function main() {
  try {
    const { input, options } = parseArgs(process.argv.slice(2));

    if (!input) {
      console.error('Error: 请提供 Markdown 文件路径或内容');
      console.error('用法: tsx main.ts <input-file> [--theme wechat] [--output output.html]');
      process.exit(1);
    }

    let markdown: string;

    // 检查输入是文件路径还是直接内容
    if (fs.existsSync(input)) {
      markdown = fs.readFileSync(input, 'utf-8');
    } else {
      // 作为直接内容处理
      markdown = input;
    }

    // 转换为 HTML
    const html = markdownToHtml(markdown, options.theme);

    // 确定输出路径
    let outputPath: string;
    if (options.output) {
      outputPath = options.output;
    } else if (fs.existsSync(input)) {
      const parsed = path.parse(input);
      outputPath = path.join(parsed.dir, `${parsed.name}.html`);
    } else {
      outputPath = 'output.html';
    }

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, html, 'utf-8');

    // 输出结果（JSON 格式，供服务器解析）
    const result = {
      success: true,
      htmlPath: outputPath,
      message: `HTML 文件已生成: ${outputPath}`
    };

    console.log(JSON.stringify(result));

  } catch (error) {
    const errorResult = {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
    console.error(JSON.stringify(errorResult));
    process.exit(1);
  }
}

main();
