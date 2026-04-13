# Anti-Patterns Checklist

Use this checklist when rewriting content to lower AI detection rates.

## 句式对称性 (Kill It)

### Pattern: 并列结构

**❌ AI-like:**
```
Gemma 4 既采用密集型架构，又采用混合专家架构。不仅支持文本，而且支持图片。
```

**✅ Natural:**
```
Gemma 4 有两种架构。一种是密集型，一种是混合专家。
支持文本、图片。还能听音频。
```

### Pattern: 总分总结构

**❌ AI-like:**
```
Gemma 4 有三个优势。首先，参数效率高。其次，性能强。最后，成本低。
```

**✅ Natural:**
```
Gemma 4 参数效率很高。性能也不差。成本还便宜。
```

### Pattern: 整齐的列表

**❌ AI-like:**
```
E2B：4GB、128K 上下文、支持图片和音频
E4B：6GB、128K 上下文、支持图片和音频
31B：20GB、256K 上下文、不支持音频
```

**✅ Natural:**
```
E2B 只要 4GB。128K 上下文。能看图片、听音频。
E4B 升级到 6GB。上下文还是 128K。图片、音频都支持。
31B 吃显存最多，20GB。上下文到 256K。但不支持音频。
```

## 正式词汇 (Replace)

### Replace These:

| ❌ AI | ✅ Natural |
|-------|-----------|
| 此外 | 还有、另外、然后 |
| 值得注意的是 | 注意到、看到、发现 |
| 需要指出的是 | 说白了、就是 |
| 综上所述 | 总之、反正 |
| 显著改进 | 好多了、强多了、快多了 |
| 完美平衡 | 差不多、挺舒服、就很划算 |
| 至关重要 | 很关键、很重要、挺关键 |
| 有效降低 | 少了、省了 |
| 提升、提高 | 升、涨、上升、快了 |
| 实现、提供 | 搞定、做出、整出来 |

### Pattern: Hedging Language

**❌ AI-like:**
```
在某种程度上，这个模型相对来说比较适合...
```

**✅ Natural:**
```
这个模型适合...
```

(Just state it. Real people don't hedge this much.)

## 段落结构 (Vary It)

### Pattern: Uniform Length

**❌ AI-like:**
```
E2B 是最小的版本，有 23 亿参数，占用 4GB 内存。
E4B 是升级版本，有 45 亿参数，占用 5.5GB 内存。
31B 是最强版本，有 307 亿参数，占用 17-20GB 内存。
```

(Every line same structure: "X 是...，有...，占用...")

**✅ Natural:**
```
最小的叫 E2B。23 亿参数。4GB 内存。

升级版 E4B。45 亿参数，5.5 GB。

31B 最强。307 亿参数全跑。占 17-20GB。
```

(Mix: 3 words, 1 word, 1 word | 2 words, 2 phrases | 3 words, 3 words, 1 phrase)

## 连接词 (Break the Flow)

### Pattern: Overuse of "，"

**❌ AI-like:**
```
Google 开源了 Gemma 4，这是一个新的大模型，具有多模态功能，支持 140 多种语言，可以本地部署。
```

(One sentence, connected by commas. Very AI.)

**✅ Natural:**
```
Google 开源了 Gemma 4。

多模态功能。支持 140 多种语言。能本地跑。
```

(Short sentences. Thoughts separated. Human rhythm.)

### Pattern: Formal Transitions

**❌ AI-like:**
```
Gemma 4 有多个版本。各个版本的配置不同。因此，用户需要根据自己的硬件选择。
```

**✅ Natural:**
```
Gemma 4 分四个版本。

你得看看自己的电脑。4GB 跑 E2B，18GB 跑 26B。
```

## 形容词堆砌 (Use Sparingly)

### Pattern: Modifier Overload

**❌ AI-like:**
```
这个混合专家架构非常高效，可以有效降低内存占用，同时提升推理速度。
```

**✅ Natural:**
```
混合专家架构很聪明。少占内存，推理也快。
```

Or even shorter:
```
混合专家架构，省内存，推理快。
```

## 主观表达 (Add More)

### Missing Personal Voice?

Add these liberally:

- "我觉得"、"说实话"、"其实"、"说白了"、"听起来"
- "挺..."、"有点..."、"非常..."（口语 very）
- "就"、"也"、"还"、"竟然"、"怎么说呢"
- Questions: "你的电脑能跑吗？"、"哪个版本适合你？"
- Exaggeration: "性能怪兽"、"快一大截"、"费劲"
- Tangents: "但其实"、"话说回来"、"除非"

**Example:**
```
31B 是性能怪兽。数学 89%，写代码 80%。但吃显存最多，你没有 20GB 以上别考虑。
```

## 代码和命令 (Keep Raw)

**❌ AI-like:**
```
用户可以通过运行以下命令来启动模型：
ollama run gemma4:26b
```

**✅ Natural:**
```
然后拉 26B 试试。
ollama run gemma4:26b
```

Or even:
```
拉个 26B。

ollama run gemma4:26b

等一会儿就能用。
```

(No formality. Code is code. Context around it is casual.)

## 数字表述 (Vary Formats)

**❌ AI-like:**
```
Gemma 4 支持 25.6 万个 token 的上下文长度，即 256,000 个词元。
```

**✅ Natural:**
```
上下文能到 25.6 万。
```

或

```
256K token。就是说，一整本书都能装进去。
```

Different each time. Real people don't always say numbers the same way.

## 技术名词 (Use Sparingly, Explain Casually)

**❌ AI-like:**
```
Gemma 4 引入了混合注意力机制，采用局部滑动窗口和全局注意力交织的方式。
```

**✅ Natural:**
```
Google 改了架构。不是所有 token 都平等对待。有的快速处理，有的深度分析。
```

(Explain what it does, not how it works. Real people care about the impact.)

## Checklist: Before Submitting

- [ ] No 2+ consecutive sentences with same structure?
- [ ] At least 3 different sentence lengths?
- [ ] No "此外""值得注意的是""综上所述"?
- [ ] Paragraph lengths vary (some 1 line, some 5)?
- [ ] Personal voice present (我觉得、说实话 etc)?
- [ ] Any repeated words used intentionally for casual feel?
- [ ] No long sentences held together by commas?
- [ ] Commands/code not wrapped in explanation text?
- [ ] Numbers expressed in different ways?

If you hit 7+ checkmarks, you're good. Under 5? Needs more work.
