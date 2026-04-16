---
name: low-ai-rate-writing
description: Reduce AI detection rate in Chinese content from 50%+ to <20%. Use when Frank writes articles or content and needs to lower "疑似 AI" scores from detection tools. Covers: breaking parallelism, using colloquial expressions, avoiding academic language, shortening sentences, removing logical connectors, adding personal voice, and creating natural paragraph breaks. Includes reference workflow and specific anti-patterns to avoid.
---

# 降低AI检测率写作（low-ai-rate-writing）

## 描述

帮助降低中文内容的AI检测率，将"疑似AI"分数从50%+降至20%以下。通过应用经过验证的技术使写作感觉更自然、更像人类写作。适用于需要降低AI检测分数的文章写作场景。

## 功能

- 打破平行结构，避免对称句式
- 使用口语化表达，避免学术语言
- 缩短句子长度，去除逻辑连接词
- 添加个人声音，创造自然段落分隔
- 提供具体的反模式参考

## Core Principle

AI detection tools identify patterns that appear in LLM outputs: symmetrical structures, formal vocabulary, logical connectors, uniform paragraph length, and hedging language. This skill teaches you to deliberately break these patterns.

The goal: **Make writing look like how a real person would type casually, not how an AI polished something.**

## Quick Start: The Anti-Patterns

### ✅ DO THIS:

- Short sentences (1-3 words per thought)
- Command/imperative: "Mac 用户"、"Windows 跑"
- First person, casual: "我觉得"、"说实话"、"挺舒服"
- Uneven paragraph lengths (some 1 line, some 5 lines)
- Repetitive short words: "搞""跑""下""装"
- Phrase fragments: "这事挺重要"、"有点卡"
- Conversational tangents: "不过""其实"、"话说回来"

### ❌ DON'T DO THIS:

- Parallel structures: "既...又..."、"不仅...而且..."
- Academic connectors: "此外""值得注意的是""综上所述"
- Uniform paragraph structure: every paragraph same length
- Symmetrical listings: "共三个特点"然后"1... 2... 3..."
- Hedging language: "在某种程度上""相对来说"
- Formal adjectives: "重大的""显著的""完美的"
- Hyphenated lists with consistent formatting
- Compound sentences with "，" repeating every line

## Process: From Polished to Natural

### Step 1: Identify "疑似 AI" Content

After writing or receiving content, run it through detection tools to identify which sections score high on "疑似 AI".

Common high-scoring patterns:

- **List structure**: "E2B，23 亿参数，4GB..." (too clean)
- **Explanations**: "混合注意力架构可以..." (too formal)
- **Transitions**: "首先...然后...最后..."
- **Technical descriptions**: Back-to-back technical terms with no break

### Step 2: Rewrite High-Scoring Sections

For each high-scoring section, apply one or more techniques:

#### Technique 1: Break Parallel Structure

**Before (AI-like):**
```
Gemma 4 分四个版本。下面都按 4-bit 量化算。
E2B，23 亿参数，4GB 内存搞定。能看图片、音频。128K 上下文。手机树莓派都能跑。
E4B，45 亿参数，5.5 GB。图片、音频都支持。128K 上下文。日常聊天用这个。
```

**After (Human-like):**
```
Gemma 4 分四个版本。

最小的叫 E2B。23 亿参数。只要 4GB 内存。能看图片，能听音频。上下文能到 128K。手机上都能装。

升级版叫 E4B。45 亿参数。6GB 内存。图片、音频都支持。上下文 128K。日常用这个挺舒服。
```

**Key changes:**
- Varied sentence structure (2 words, 1 word, 2 words, vs uniform)
- Different connectors ("都能装" vs "都能跑")
- Subjective coloring ("挺舒服")

#### Technique 2: Use Conversational Language

**Before:**
```
这种混合注意力机制可以提高...
```

**After:**
```
Google 改了架构。不是所有 token 都平等对待。有的快速处理，有的深度分析。这样小模型也能理解长文本，功耗还不会飙升。
```

#### Technique 3: Add Personal Voice

Insert expressions that only humans use naturally:

- "我觉得""说实话""其实""说白了"
- "这事挺..."、"有点..."、"有点费劲"
- "挺舒服""差不多""一大截"
- Questions: "你的电脑能跑吗？"
- Exaggeration: "性能怪兽"

#### Technique 4: Shorten Sentences and Add Stops

**Before:**
```
Gemma 4 的上下文窗口最多可容纳 25.6 万个 token，并支持 140 多种语言。
```

**After:**
```
上下文能到 25.6 万。支持 140 多种语言。
```

#### Technique 5: Avoid Logical Connectors

Remove: 此外、值得注意的是、综上所述、因此、所以、与此同时

Instead, just list facts or use informal connectors:

- 然后、不过、其实、嗯、话说回来

#### Technique 6: Use Commands Instead of Descriptions

**Before:**
```
用户可以使用以下命令来启动对话。
```

**After:**
```
然后拉 26B 试试。ollama run gemma4:26b
```

### Step 3: Iterate with Scoring

1. Rewrite a section
2. Run detection again
3. If still high, apply another technique
4. Repeat until score drops

## Reference: Anti-AI Patterns

See `references/anti-patterns.md` for a checklist of specific things to avoid and how to rewrite them.

## Real Example: Gemma 4 Article

**Original (65% 疑似 AI):**
```
Gemma 4 采用密集型架构和混合专家 (MoE) 架构，非常适合文本生成、编码和推理等任务。这些模型有四种不同的规模：E2B、E4B、26B A4B 和 31B。这些模型的大小各异，因此可部署在从高端手机到笔记本电脑和服务器的各种环境中。
```

**Rewritten (7% 疑似 AI):**
```
Gemma 4 分四个版本。

最小的叫 E2B。23 亿参数。只要 4GB 内存。能看图片，能听音频。手机上都能装。

升级版叫 E4B。45 亿参数。6GB 内存。图片、音频都支持。日常用这个就够了。
```

Changes applied:
1. Broke parallel structure (四种不同 → 分四个版本)
2. Used commands (不是"可部署在"，而是直接说规格)
3. Added casual language ("就够了"、"都能装")
4. Varied sentence length
5. Removed logical connectors

## When to Use This Skill

- After writing: Run detection, get high score, apply techniques
- During writing: If a sentence sounds "AI-like," rewrite it before moving on
- Editing pass: Go through and break up uniform structures
- Reference check: Use anti-patterns list to catch problem areas

## Tips

1. **Read aloud**: If it sounds natural when you say it, it probably scores low
2. **Short is safer**: Shorter sentences are harder to flag as AI
3. **Repetition is human**: Real people repeat words ("搞""跑""装"). AI tends to vary.
4. **Tangents are natural**: Real writing has asides and unexpected turns
5. **Test aggressively**: Run detection after every rewrite to see what works
