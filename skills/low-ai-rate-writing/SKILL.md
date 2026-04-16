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

## 第四步：四层自检体系

写完后必须跑完整个四层质检流程。这个自检体系的设计理念来自软件工程中的测试金字塔，从最基础的硬性规则到最主观的活人感判断，层层递进。每一层都有明确的通过标准和修复指引。只有四层全部通过，内容才算达标。

### L1 硬性规则检查（自动扫描层）

这一层检查的是绝对不能违反的规则，类似代码的语法检查。任何一项不通过就必须修复，没有例外。

**L1-1 禁用词扫描**
全文搜索以下词汇，出现则必须替换：
- "此外" → 换成"然后"、"还有"
- "值得注意的是" / "不难发现" → 直接删掉
- "综上所述" / "总的来说" → 换成"说白了"、"其实就是"
- "在一定程度上" / "相对而言" → 直接删掉
- "既...又..." / "不仅...而且..." → 换成自然的口语表达
- "首先...其次...最后" → 用自然的转场词替代
- "这意味着" / "其结果是" → 换成"所以呢"、"那咋样"

**L1-2 禁用标点扫描**
全文搜索以下标点，出现则必须替换：
- 冒号"：" → 用逗号替代
- 破折号"——" → 用逗号或句号替代
- 分号"；" → 用句号替代
- 双引号""或"" → 用「」替代，或直接不加引号

**L1-3 结构性套话扫描**
检查是否出现以下模式：
- "让我们来看看..." / "接下来让我们..."
- "在当今...的时代" / "随着...的发展"
- 连续使用bullet point罗列观点（超过3个就需要改成散文叙述）
- 对称的列表结构（"共三个特点"然后"1... 2... 3..."）
- 大段加粗（超过2行的加粗几乎肯定是过度结构化）

**L1-4 AI特征词检查**
确认没有出现以下AI常用词汇：
- "复杂"、"完善"、"优化"、"提升"、"显著"、"重要"
- "不仅...而且..."、"一方面...另一方面..."
- "从...角度来看"、"在...方面"

**通过标准**：以上四项扫描零命中。
**修复方式**：逐个替换，用口语化表达替代。

### L2 风格一致性检查（模式匹配层）

这一层检查内容是否符合降低AI检测率的风格要求，类似代码的单元测试。每一项都给出"是/否"判断。

**L2-1 句式结构检查**
- 是否有长短句交替？（连续3句以上句式长度相近 = 节奏呆板）
- 是否有一句话独立成段的"断裂"效果？（全文至少出现3次）
- 是否有短句（1-3个字）？
- 是否避免了平行结构？（"既...又..."、"不仅...而且..."）

**L2-2 口语化检查**
- 是否使用了口语化词汇？（"搞""跑""装""挺""有点"）
- 是否有第一人称表达？（"我觉得""说实话""其实"）
- 是否有口语化短语？（"这事挺...""有点...""差不多"）
- 是否有反问或疑问？（"你的电脑能跑吗？"）

**L2-3 自然感检查**
- 段落长度是否不均匀？（有的1行，有的5行）
- 是否有自然的离题？（"话说回来""不过"）
- 是否有重复用词？（真人会重复，AI倾向于变化）
- 是否避免了逻辑连接词？（"因此""所以""与此同时"）

**L2-4 命令式表达检查**
- 是否有命令/祈使句？（"Mac 用户""Windows 跑"）
- 是否避免了描述性语言？（不是"用户可以使用"，而是直接说命令）

**通过标准**：L2-1全部通过，L2-2至少3/4通过，L2-3至少3/4通过，L2-4通过。
**修复方式**：逐段检查，对不符合的段落进行改写。重点关注那些"读起来像说明书"的段落。

### L3 内容质量检查（深度审查层）

这一层检查内容本身的自然度和说服力，类似代码的集成测试。

**L3-1 真实感检查**
- 是否有具体的细节？（不是"性能很好"，而是"6GB内存"）
- 是否有个人体验？（"我用着挺舒服"）
- 是否有不完美之处？（"有点卡""不太稳定"）

**L3-2 口语逻辑检查**
- 逻辑是否跳跃？（真人说话不会步步为营）
- 是否有"聊着聊着突然想起"的感觉？
- 是否有自然的离题和回归？

**L3-3 主观色彩检查**
- 是否有主观评价？（"我觉得""说实话""挺"）
- 是否有情绪表达？（"性能怪兽""太香了"）
- 是否避免了客观中立的描述？

**L3-4 实用价值检查**
- 内容是否有实际帮助？
- 是否有可操作的步骤？
- 是否有真实的案例？

**通过标准**：L3-1和L3-2必须全部通过，L3-3和L3-4至少通过一项。
**修复方式**：需要重新审视不通过的段落，补充具体细节、增加主观色彩、或调整逻辑结构。

### L4 活人感终审（最终人格层）

这是最重要也是最主观的一层。这一层不是逐项检查，而是以读者的视角通读全文，回答一个核心问题：

**"读完这段内容，我感觉是一个真人在跟我聊天，还是一个AI在输出信息？"**

具体的感知维度：

**L4-1 温度感**
- 文中的表达是真实的体感（"我当时就愣住了"）还是知识性描述（"我感到非常震撼"）？
- 作者的形象是否让你"能感觉到他的存在"？

**L4-2 独特性**
- 这段内容是否有"只有这个作者才会写出来的角度"？
- 还是换一个人也能写出差不多的东西？

**L4-3 姿态检查**
- 内容的语气是不是"一个朋友在跟你分享经验"？
- 有没有不自觉地滑入了"专家在讲课"或"客服在回复"的姿态？

**L4-4 心流检查**
- 从头到尾读，有没有哪个地方你的注意力断掉了？需要回头理解逻辑？
- 如果有，那个地方就是需要修复的节奏问题。

**通过标准**：L4-1到L4-4整体感觉"这像是真人写的"。如果任何一项让你觉得"这段AI味太重了"，就需要返工。
**修复方式**：这一层没有机械的修复方法。核心操作是：把"AI味重"的段落找出来，想象一个真实的人会怎么表达，然后用更口语、更私人、更不完美的方式重写。

### 自检输出格式

完成四层自检后，输出一份简洁的质检报告：

```
## 质检报告

**L1 硬性规则** ✅/❌
- 禁用词：X处命中（已修复/待修复）
- 禁用标点：X处命中（已修复/待修复）
- 结构套话：X处命中（已修复/待修复）
- AI特征词：X处命中（已修复/待修复）

**L2 风格一致性** ✅/❌
- 句式结构：✅/❌
- 口语化：✅/❌（使用了X个口语词）
- 自然感：✅/❌
- 命令式：✅/❌

**L3 内容质量** ✅/❌
- 真实感：✅/❌
- 口语逻辑：✅/❌
- 主观色彩：✅/❌
- 实用价值：✅/❌

**L4 活人感** ✅/❌
- 温度感：✅/❌（具体段落：...）
- 独特性：✅/❌
- 姿态：✅/❌
- 心流：✅/❌（断点位置：...）

**总评**：4层全部通过 / X层需要返工
**修复优先级**：[列出最需要修复的1-3个具体问题]
```

## 参考资料

更详细的风格示例和修改对比，参考 `references/style_examples.md`。
