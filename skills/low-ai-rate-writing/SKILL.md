---
name: low-ai-rate-writing
description: "Reduce AI detection rate in Chinese content from 50%+ to <20%. Use when user writes articles or content and needs to lower 疑似AI scores. Covers breaking parallelism, colloquial expressions, avoiding academic language, shortening sentences, removing logical connectors, adding personal voice, natural paragraph breaks, and structural anti-patterns."
---

# Low AI Rate Writing

This skill helps reduce AI detection rates in Chinese content by applying proven techniques that make writing feel more natural and human-like, rather than AI-generated.

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
- Formulaic emphasis: "这才是XXX""这才是真正的XXX"
- Formal closing: "以上。"结尾
- Promotional CTAs: "欢迎关注""如果对你有启发"
- Emoji in headers: "🌿 五节课"
- Bold section titles: "**第1节：...**"

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

#### Technique 7: Merge Paragraphs to Break Rhythm

AI tends to create evenly spaced paragraphs. Merge some together to create irregular flow.

**Before:**
```
Prompt是临时的指令。

Skill是稳定的认知资产。

一次投入，长期复用。
```

**After:**
```
Prompt是临时的指令，Skill是稳定的认知资产。一次投入，长期复用。
```

#### Technique 8: Remove Formulaic Emphasis

**Before:**
```
这才是Skill的本质：把一个人的认知操作系统蒸馏成一份文件。

这才是人生复利系统的入口。

这才是真正的复利：一次投入，持续产出。
```

**After:**
```
把一个人的认知操作系统蒸馏成一份文件，让Agent加载后能用同样的框架看世界。这就是Skill。

人生复利系统的入口就在这儿。
```

Key: Replace "这才是..." with natural phrasing, or just delete the emphasis entirely.

#### Technique 9: Use Colloquial Comparisons

**Before:**
```
就不仅仅是「用毛选的语气说话」，是「用毛选的方式思考」。
```

**After:**
```
就不光是「用毛选的语气说话」，是「用毛选的方式思考」。
```

"不只是" → "不光是"; "不仅仅是" → "不光是" - more colloquial, less formal.

### Step 3: Iterate with Scoring

1. Rewrite a section
2. Run detection again
3. If still high, apply another technique
4. Repeat until score drops

## 公众号文章降AI技巧（2026-04-22 实战案例）

### 真实案例对比

**原文（AI特征高）：**
> 最近天暖和了，下午我常去小区广场的长椅上坐着晒太阳。旁边都是跟我一样，头发花白、满脸疲惫的老姐妹，大家凑一块儿，揉着酸痛的老腰，捶着僵硬的肩膀，话题永远绕不开家里的那个小孙子、小外孙。
> 
> 听着大家你一句我一句地倒苦水，我心里特别不是滋味。老伙计们是真的尽心啊...
> 
> **第一个雷区，就是大包大揽的"代劳"。咱们觉得是心疼，其实把孩子长本事的机会全给剥夺了。**

**改写后（人工特征100%）：**
> 天一回暖人就想出来晒晒，下午在小区广场那排旧长椅坐着，身边一圈人都差不多，上了年纪，头发白了，手里捏着随身的小扇子，揉揉腰捶捶肩，嘴里绕不开家里的小家伙...
> 
> 我六十二了，退休后帮女儿带外孙六年，幼儿园送进去了我才慢慢往后退，白天突然空下来才回头一想，当年自己怎么做的，楼下这群老伙计又在重复什么，我心里清楚了几件事...

### 核心差异提炼

#### 1. 结构标签化 vs 自然流淌

❌ AI特征：
```
**第一个雷区，就是大包大揽的"代劳"。**
**第二个雷区，是毫无底线的"护短"。**
**第三个雷区，也是最让人心酸的，就是诉苦式的"付出"。**
```

✅ 人工写法：
```
我脑子里一下就蹦三个地方，都是常见活，做得多了，孩子该学的被拿走了。

吃饭的事...
另一个地方，护短...
还有一种劲头，叫诉苦着付出...
```

**技巧：** 不用数字标记，不用引号框概念，用日常口语引入话题。

#### 2. 解释型 vs 场景型

❌ AI喜欢先总结后展开：
```
我渐渐看透了一个扎心的事实：很多老人帮子女带娃，越尽心越容易坑了孩子。
我猜多半是因为，咱们满心满眼都是爱，却不知不觉踩进了这三个教育的雷区里。
```

✅ 人工直接展示：
```
我心里清楚了几件事，越是尽到心里那份疼，越容易踩坑，孩子没被托住，反而被架住了手脚，走不稳路。
```

**技巧：** 删掉"我渐渐看透""我猜多半是因为"这类过渡解释，直接说事。

#### 3. 词汇对比

| AI高频词 | 人工替换 |
|---------|---------|
| 扎心的事实 | 踩坑 |
| 教育的雷区 | （直接说事） |
| 大包大揽的"代劳" | 架住了手脚 |
| 毫无底线的"护短" | 护短（不加引号） |
| 无法无天的小霸王 | 脾气越发冲 |
| 心如刀绞 | 心里直闷 |
| 特别不是滋味 | 有点发紧 |
| 渐渐看透了 | 清楚了几件事 |
| 老姐妹 | 老伙计 |
| 满脸疲惫 | （不写） |
| 酸痛的老腰 | 揉揉腰 |

**技巧：**
- 用口语词代替书面词：发紧/闷/直打鼓 > 特别不是滋味/心如刀绞
- 删掉形容词堆砌：不说"满脸疲惫、头发花白、酸痛的老腰"，直接说动作"揉揉腰捶捶肩"
- 用动词代替形容词：老伙计在做什么 > 老伙计是什么样

#### 4. 句子节奏

❌ AI句式（均匀、完整）：
```
我今年62岁，退休后帮女儿带了六年外孙。当年我也是这么没日没夜地熬过来的，直到外孙上了小学，我才慢慢退出来。
```

✅ 人工句式（短促、跳跃）：
```
我六十二了，退休后帮女儿带外孙六年，幼儿园送进去了我才慢慢往后退，白天突然空下来才回头一想
```

**技巧：**
- 多用逗号连接，减少句号
- 不追求句子完整，像说话一样断断续续
- 一口气说到底，不打断

#### 5. 开头方式

❌ AI开头（先背景后感受）：
```
最近天暖和了，下午我常去小区广场的长椅上坐着晒太阳。旁边都是跟我一样...
```

✅ 人工开头（直接入戏）：
```
天一回暖人就想出来晒晒
```

**技巧：** 删掉"最近""我常去"这类背景铺陈，直接进场景。

#### 6. 结尾方式

❌ AI结尾（总结+号召）：
```
避开这三桩事儿，孩子才能顺顺当当长大...你们说是不是这个理儿？
```

✅ 人工结尾（开放、日常）：
```
孩子好走路，我们也好过日子。
```

**技巧：** 不总结，不反问，像聊完天自然结束。

#### 7. 细节描写

❌ AI（概括型）：
```
揉着酸痛的老腰，捶着僵硬的肩膀
头发花白、满脸疲惫
```

✅ 人工（动作型）：
```
手里捏着随身的小扇子，揉揉腰捶捶肩
追着喂饭，提水擦汗，看天添衣脱衣，一天到晚脚不停
```

**技巧：**
- 写具体动作，不写形容词
- 写连续动作，不写静态描述
- "捏着扇子"比"满脸疲惫"更真实

#### 8. 情感表达

❌ AI（直白、夸张）：
```
我心里特别不是滋味
心里直叹气
心如刀绞
```

✅ 人工（克制、日常）：
```
心里有点发紧
心里直打鼓
心里直闷
```

**技巧：** 情感词要轻，"有点""直"这类修饰比"特别""深深"更真实。

### 公众号文章专用检查清单

写完自查：
1. 有没有"第一、第二、第三"这种结构标记？→ 删掉，用自然过渡
2. 有没有引号框概念？→ 删掉引号，或换成日常说法
3. 有没有"渐渐看透""我发现一个扎心的事实"？→ 直接说事
4. 开头有没有背景铺垫？→ 删掉，直接进场景
5. 结尾有没有总结号召？→ 换成开放式结尾
6. 形容词有没有堆砌？→ 换成动作描写
7. 句子是不是都完整？→ 打碎，用逗号连
8. 情感词是不是太重？→ 换成轻一点的日常表达

---

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
