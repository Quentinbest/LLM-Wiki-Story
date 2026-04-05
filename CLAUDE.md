# LLM Wiki — Robert McKee's *Story*

You are maintaining a bilingual (English/Chinese) living wiki knowledge base for the book **"Story: Substance, Structure, Style and the Principles of Screenwriting"** by **Robert McKee**. The wiki incrementally compiles, cross-references, and synthesizes the book's ideas into searchable, interconnected markdown pages — in both languages simultaneously.

You **own** the `wiki/` directory entirely. You create pages, update them, maintain cross-references, and keep everything consistent. The human curates sources, directs analysis, and asks questions. You do all the bookkeeping.

---

## Project Structure

```
LLM-Wiki-Story/
├── CLAUDE.md                  ← This file. The schema.
├── implementation-plan.md     ← Project plan and rationale
├── sources/                   ← IMMUTABLE. Human-curated. Never modify.
│   ├── book/                  ← Chapter-by-chapter notes from Story
│   ├── supplementary/         ← Interviews, essays, lectures, related books
│   ├── films/                 ← Screenplay excerpts, scene breakdowns
│   └── assets/                ← Images, diagrams
└── wiki/                      ← LLM-GENERATED. You own this entirely.
    ├── en/                    ← English wiki
    │   ├── index.md           ← English content catalog
    │   ├── log.md             ← English activity log
    │   ├── overview.md        ← High-level synthesis (after ~5 chapters)
    │   ├── chapters/          ← Chapter summaries
    │   ├── concepts/          ← One page per core concept
    │   ├── structures/        ← Story hierarchy (beat, scene, sequence, act)
    │   ├── principles/        ← Prescriptive rules and guidelines
    │   ├── entities/          ← Films, plays, novels McKee references
    │   ├── characters/        ← Character design principles
    │   ├── genres/            ← Genre analysis
    │   ├── comparisons/       ← Cross-cutting synthesis pages
    │   ├── application/       ← Practical how-to guides
    │   └── notes/             ← User's personal reflections
    └── zh/                    ← 中文维基（Chinese wiki — mirrors en/ structure）
        ├── index.md           ← 中文内容索引
        ├── log.md             ← 中文活动日志
        ├── overview.md        ← 全书框架综述
        ├── chapters/          ← 章节摘要
        ├── concepts/          ← 核心概念
        ├── structures/        ← 故事层级结构
        ├── principles/        ← 创作原则
        ├── entities/          ← 电影、戏剧、小说
        ├── characters/        ← 角色设计
        ├── genres/            ← 类型分析
        ├── comparisons/       ← 对比分析
        ├── application/       ← 实践应用指南
        └── notes/             ← 个人思考笔记
```

---

## Bilingual Rules

### Core Bilingual Principles

1. **Every page exists in both languages.** When you create a page in `wiki/en/`, you MUST create the corresponding page in `wiki/zh/` (and vice versa). The Chinese version is NOT a literal translation — it should read naturally in Chinese, adapting phrasing and structure as needed.
2. **Same filenames in both trees.** `wiki/en/concepts/the-gap.md` ↔ `wiki/zh/concepts/the-gap.md`. Filenames are always in English kebab-case, even in the Chinese tree.
3. **Cross-language links.** Every page includes a language toggle link at the top:
   - English pages: `> 中文版：[[wiki/zh/{path}|中文]]`
   - Chinese pages: `> English: [[wiki/en/{path}|English]]`
4. **Wikilinks stay within the same language tree.** English pages link to other English pages; Chinese pages link to other Chinese pages. The only cross-tree links are the language toggle.
5. **Both indexes updated together.** When you update `wiki/en/index.md`, also update `wiki/zh/index.md`.
6. **Both logs updated together.** Append to both `wiki/en/log.md` and `wiki/zh/log.md` on every operation. The English log is in English; the Chinese log is in Chinese.
7. **Frontmatter includes `lang` field.** Every page has `lang: en` or `lang: zh`.

### Chinese Content Guidelines

- **Use standard simplified Chinese (简体中文).**
- **McKee's terminology:** Provide the Chinese translation with the original English term in parentheses on first use, then use the Chinese term consistently. Example: "鸿沟（The Gap）" on first mention, then "鸿沟" thereafter.
- **Film titles:** Use the official Chinese release title if well-known, with the English title in parentheses. Example: "唐人街（*Chinatown*, 1974）".
- **Frontmatter `aliases`:** Include both Chinese and English alternate names for Obsidian search.
- **Writing style:** Clear, concise modern Chinese. Avoid overly academic or stiff phrasing. Match the approachable analytical tone of the English version.

### Terminology Reference (Key Terms)

| English | 中文 | Notes |
|---|---|---|
| Story | 故事 | |
| Structure | 结构 | |
| The Gap | 鸿沟 | 期望与结果之间的裂缝 |
| Controlling Idea | 主控思想 | |
| Inciting Incident | 激励事件 | |
| Progressive Complications | 递进复杂化 | |
| Crisis | 危机 | |
| Climax | 高潮 | |
| Resolution | 结局 | |
| Turning Point | 转折点 | |
| Beat | 节拍 | 故事的最小单元 |
| Scene | 场景 | |
| Sequence | 序列 | |
| Act | 幕 | |
| Archplot | 大情节 | 经典设计 |
| Miniplot | 小情节 | 极简主义 |
| Antiplot | 反情节 | 反结构 |
| Protagonist | 主人公 | |
| Antagonist | 对抗力量 | |
| Principle of Antagonism | 对抗原则 | |
| Characterization | 人物塑造 | 外在特征 |
| True Character | 真实性格 | 压力下的选择 |
| Character Arc | 人物弧光 | |
| Character Dimension | 人物维度 | |
| Spine | 故事脊椎 | |
| Subtext | 潜文本 | |
| Exposition | 铺陈 / 解说 | |
| Setup and Payoff | 铺垫与回报 | |
| Negation of the Negation | 否定之否定 | |
| Genre | 类型 | |
| Obligatory Scene | 必备场景 | |
| Backstory | 前史 | |

*(This table will be extended as new terms are encountered during ingest.)*

---

## Critical Rules

1. **NEVER modify anything in `sources/`.** These are immutable source-of-truth files.
2. **ALWAYS use `[[wikilinks]]`** for cross-references between wiki pages. Use the filename without extension (e.g., `[[the-gap]]`, `[[chinatown]]`).
3. **ALWAYS update BOTH `wiki/en/index.md` AND `wiki/zh/index.md`** after creating or significantly modifying pages.
4. **ALWAYS append to BOTH `wiki/en/log.md` AND `wiki/zh/log.md`** after ingest, query, or lint operations.
5. **Use kebab-case filenames** — e.g., `the-gap.md`, `inciting-incident.md`, `kramer-vs-kramer.md`. Same filename in both `en/` and `zh/`.
6. **ALWAYS create pages in both languages** during ingest. Never leave one language tree out of sync.

---

## Page Templates

### Chapter Summary (`wiki/{lang}/chapters/`)

**English version:**

```markdown
---
title: "Chapter N: [Chapter Title]"
type: chapter-summary
lang: en
chapter: N
key_concepts:
  - "[[concept-1]]"
  - "[[concept-2]]"
key_entities:
  - "[[film-1]]"
source: "sources/book/chapter-NN.md"
last_updated: YYYY-MM-DD
tags:
  - chapter
---

# Chapter N: [Chapter Title]

> 中文版：[[wiki/zh/chapters/chapter-NN-title|中文]]

## Summary
[2–4 paragraph summary of the chapter's main argument]

## Key Concepts Introduced
- **[[concept-1]]** — [one-line description in this chapter's context]
- **[[concept-2]]** — [one-line description]

## Key Examples
- **[[film-1]]** — [how McKee uses this film in this chapter]

## McKee's Core Argument
[The central thesis of this chapter, distilled]

## Connections to Other Chapters
- Builds on [[chapter-NN-previous]] by...
- Sets up [[chapter-NN-next]] by...

## Notable Quotes
- "[quote]" (p. XX)
```

**Chinese version:**

```markdown
---
title: "第N章：[章节标题]"
type: chapter-summary
lang: zh
chapter: N
key_concepts:
  - "[[concept-1]]"
  - "[[concept-2]]"
key_entities:
  - "[[film-1]]"
source: "sources/book/chapter-NN.md"
last_updated: YYYY-MM-DD
tags:
  - chapter
---

# 第N章：[章节标题]

> English: [[wiki/en/chapters/chapter-NN-title|English]]

## 摘要
[2-4段，概述本章核心论点]

## 引入的核心概念
- **[[concept-1]]**（[英文原名]）— [一句话描述该概念在本章语境中的含义]
- **[[concept-2]]**（[英文原名]）— [一句话描述]

## 关键案例
- **[[film-1]]**（[中文片名]）— [麦基如何在本章中使用此电影]

## 麦基的核心论点
[本章中心论题的提炼]

## 与其他章节的联系
- 承接 [[chapter-NN-previous]]：……
- 引出 [[chapter-NN-next]]：……

## 重要引文
- "[原文引用]"（第XX页）
- 译文："[中文翻译]"
```

### Concept Page (`wiki/{lang}/concepts/`)

**English version:**

```markdown
---
title: "[Concept Name]"
type: concept
lang: en
chapter_refs:
  - N
related:
  - "[[related-concept-1]]"
  - "[[related-concept-2]]"
film_examples:
  - "[[film-1]]"
  - "[[film-2]]"
last_updated: YYYY-MM-DD
tags:
  - concept
  - [relevant-subtopic]
---

# [Concept Name]

> 中文版：[[wiki/zh/concepts/concept-name|中文]]

## Definition
[McKee's definition, clearly stated]

## McKee's Argument
[Why this concept matters, his reasoning, 2–3 paragraphs]

## How It Works
[Mechanical explanation — how to recognize and apply this concept]

## Film Examples
- **[[film-1]]** — [specific example of this concept in action]
- **[[film-2]]** — [another example]

## Relationship to Other Concepts
- [[related-concept-1]] — [how they connect]
- [[related-concept-2]] — [how they connect]

## Common Mistakes
[What McKee warns against regarding this concept]

## Sources
- *Story* Chapter N, pp. XX–XX
```

**Chinese version:**

```markdown
---
title: "[中文概念名]"
type: concept
lang: zh
aliases:
  - "[English concept name]"
  - "[中文别名]"
chapter_refs:
  - N
related:
  - "[[related-concept-1]]"
  - "[[related-concept-2]]"
film_examples:
  - "[[film-1]]"
  - "[[film-2]]"
last_updated: YYYY-MM-DD
tags:
  - concept
  - [relevant-subtopic]
---

# [中文概念名]（[English Name]）

> English: [[wiki/en/concepts/concept-name|English]]

## 定义
[麦基对该概念的定义，清晰表述]

## 麦基的论述
[该概念为何重要，他的推理逻辑，2-3段]

## 运作机制
[机制解释——如何识别和应用该概念]

## 电影案例
- **[[film-1]]**（[中文片名]）— [该概念在具体场景中的体现]
- **[[film-2]]**（[中文片名]）— [另一个案例]

## 与其他概念的关系
- [[related-concept-1]]（[中文名]）— [关联方式]
- [[related-concept-2]]（[中文名]）— [关联方式]

## 常见错误
[麦基关于该概念的警告]

## 来源
- 《故事》第N章，第XX-XX页
```

### Structure Page (`wiki/{lang}/structures/`)

Same as concept page template, with additional section:

**English:**
```markdown
## Position in the Story Hierarchy
- **Above:** [[parent-level]] — [relationship]
- **Below:** [[child-level]] — [relationship]
- **This level:** [What happens at this structural level]
```

**Chinese:**
```markdown
## 在故事层级中的位置
- **上一层级：** [[parent-level]]（[中文名]）— [关系]
- **下一层级：** [[child-level]]（[中文名]）— [关系]
- **本层级：** [在此结构层级发生的事]
```

### Principle Page (`wiki/{lang}/principles/`)

**English version:**

```markdown
---
title: "[Principle Name]"
type: principle
lang: en
chapter_refs:
  - N
related:
  - "[[related-concept]]"
film_examples:
  - "[[film-1]]"
last_updated: YYYY-MM-DD
tags:
  - principle
---

# [Principle Name]

> 中文版：[[wiki/zh/principles/principle-name|中文]]

## The Principle
[Clear statement of the rule/guideline]

## McKee's Reasoning
[Why this principle holds, his argument]

## In Practice
[How to apply this principle when writing]

## Film Examples
- **[[film-1]]** — [how this film demonstrates or violates the principle]

## Violations and Consequences
[What happens when writers ignore this principle, with examples]

## Sources
- *Story* Chapter N, pp. XX–XX
```

**Chinese version:**

```markdown
---
title: "[中文原则名]"
type: principle
lang: zh
aliases:
  - "[English principle name]"
chapter_refs:
  - N
related:
  - "[[related-concept]]"
film_examples:
  - "[[film-1]]"
last_updated: YYYY-MM-DD
tags:
  - principle
---

# [中文原则名]（[English Name]）

> English: [[wiki/en/principles/principle-name|English]]

## 原则
[规则/指导方针的清晰表述]

## 麦基的论证
[为何该原则成立，他的论证]

## 实践应用
[写作中如何应用该原则]

## 电影案例
- **[[film-1]]**（[中文片名]）— [该电影如何体现或违反该原则]

## 违反的后果
[当编剧忽视该原则时会发生什么，附案例]

## 来源
- 《故事》第N章，第XX-XX页
```

### Entity Page (`wiki/{lang}/entities/`)

**English version:**

```markdown
---
title: "[Film/Work Title] (Year)"
type: entity
lang: en
entity_type: film | play | novel
director: [Name]
writer: [Name]
concepts_illustrated:
  - "[[concept-1]]"
  - "[[concept-2]]"
chapters_referenced_in:
  - N
last_updated: YYYY-MM-DD
tags:
  - entity
  - [genre]
---

# [Film/Work Title] (Year)

> 中文版：[[wiki/zh/entities/entity-name|中文]]

## Overview
[Brief synopsis relevant to McKee's analysis]

## McKee's Usage
[How and why McKee references this work, in which chapters]

## Concepts Illustrated
- **[[concept-1]]** — [specific scene/moment demonstrating this concept]
- **[[concept-2]]** — [specific example]

## Key Scenes Analyzed
[Specific scenes McKee breaks down, if any]
```

**Chinese version:**

```markdown
---
title: "[中文片名]（[English Title], Year）"
type: entity
lang: zh
entity_type: film | play | novel
director: [Name]
writer: [Name]
aliases:
  - "[English title]"
  - "[中文别名]"
concepts_illustrated:
  - "[[concept-1]]"
  - "[[concept-2]]"
chapters_referenced_in:
  - N
last_updated: YYYY-MM-DD
tags:
  - entity
  - [genre]
---

# [中文片名]（*[English Title]*, Year）

> English: [[wiki/en/entities/entity-name|English]]

## 概述
[与麦基分析相关的简要剧情]

## 麦基的引用
[麦基如何以及为何引用该作品，出现在哪些章节]

## 所阐释的概念
- **[[concept-1]]**（[中文名]）— [展示该概念的具体场景/时刻]
- **[[concept-2]]**（[中文名]）— [具体案例]

## 关键场景分析
[麦基具体分析的场景，如有]
```

### Genre Page (`wiki/{lang}/genres/`)

**English version:**

```markdown
---
title: "[Genre Name]"
type: genre
lang: en
chapter_refs:
  - N
conventions:
  - "[convention 1]"
  - "[convention 2]"
exemplar_films:
  - "[[film-1]]"
last_updated: YYYY-MM-DD
tags:
  - genre
---

# [Genre Name]

> 中文版：[[wiki/zh/genres/genre-name|中文]]

## McKee's Definition
[How McKee defines this genre]

## Genre Conventions
[The audience expectations and structural patterns specific to this genre]

## Obligatory Scenes
[Scenes the audience expects in this genre]

## Exemplar Films
- **[[film-1]]** — [why this is a strong example]

## Subgenres
[If McKee distinguishes subgenres]

## Sources
- *Story* Chapter N
```

**Chinese version:**

```markdown
---
title: "[中文类型名]"
type: genre
lang: zh
aliases:
  - "[English genre name]"
chapter_refs:
  - N
conventions:
  - "[类型惯例1]"
  - "[类型惯例2]"
exemplar_films:
  - "[[film-1]]"
last_updated: YYYY-MM-DD
tags:
  - genre
---

# [中文类型名]（[English Name]）

> English: [[wiki/en/genres/genre-name|English]]

## 麦基的定义
[麦基如何定义该类型]

## 类型惯例
[该类型特有的观众期待和结构模式]

## 必备场景
[该类型中观众所期待的场景]

## 代表作品
- **[[film-1]]**（[中文片名]）— [为何这是一个典型案例]

## 子类型
[如果麦基区分了子类型]

## 来源
- 《故事》第N章
```

### Comparison Page (`wiki/{lang}/comparisons/`)

**English version:**

```markdown
---
title: "[X] vs. [Y]"
type: comparison
lang: en
subjects:
  - "[[subject-1]]"
  - "[[subject-2]]"
last_updated: YYYY-MM-DD
tags:
  - comparison
---

# [X] vs. [Y]

> 中文版：[[wiki/zh/comparisons/comparison-name|中文]]

## Overview
[What is being compared and why it matters]

## Key Differences

| Dimension | [X] | [Y] |
|---|---|---|
| [Dimension 1] | ... | ... |
| [Dimension 2] | ... | ... |

## McKee's Position
[Does McKee favor one? What nuance does he add?]

## Film Examples
- **[X] exemplified by:** [[film-1]]
- **[Y] exemplified by:** [[film-2]]

## Synthesis
[What the comparison reveals about McKee's broader framework]
```

**Chinese version:**

```markdown
---
title: "[X中文] vs. [Y中文]"
type: comparison
lang: zh
subjects:
  - "[[subject-1]]"
  - "[[subject-2]]"
last_updated: YYYY-MM-DD
tags:
  - comparison
---

# [X中文] vs. [Y中文]

> English: [[wiki/en/comparisons/comparison-name|English]]

## 概述
[比较的内容及其重要性]

## 核心差异

| 维度 | [X中文] | [Y中文] |
|---|---|---|
| [维度1] | ... | ... |
| [维度2] | ... | ... |

## 麦基的立场
[麦基是否偏向某一方？他增添了哪些细微之处？]

## 电影案例
- **[X中文] 代表作品：** [[film-1]]（[中文片名]）
- **[Y中文] 代表作品：** [[film-2]]（[中文片名]）

## 综合分析
[该比较揭示了麦基框架中的什么深层逻辑]
```

### Application Page (`wiki/{lang}/application/`)

**English version:**

```markdown
---
title: "How to [Action]"
type: application
lang: en
based_on:
  - "[[concept-1]]"
  - "[[principle-1]]"
last_updated: YYYY-MM-DD
tags:
  - application
  - how-to
---

# How to [Action]

> 中文版：[[wiki/zh/application/page-name|中文]]

## Overview
[What this guide helps you do]

## Steps
1. [Step 1 — with references to concepts/principles]
2. [Step 2]
3. ...

## Checklist
- [ ] [Check 1]
- [ ] [Check 2]

## Based On
- [[concept-1]] — [how it informs this process]
- [[principle-1]] — [how it applies]
```

**Chinese version:**

```markdown
---
title: "如何[动作]"
type: application
lang: zh
based_on:
  - "[[concept-1]]"
  - "[[principle-1]]"
last_updated: YYYY-MM-DD
tags:
  - application
  - how-to
---

# 如何[动作]

> English: [[wiki/en/application/page-name|English]]

## 概述
[本指南帮助你做什么]

## 步骤
1. [步骤1——引用相关概念/原则]
2. [步骤2]
3. ……

## 检查清单
- [ ] [检查项1]
- [ ] [检查项2]

## 基于
- [[concept-1]]（[中文名]）— [如何指导此过程]
- [[principle-1]]（[中文名]）— [如何应用]
```

---

## Operations

### INGEST — Processing a New Source

When the user adds a new source to `sources/` and asks you to ingest it:

1. **READ** the source file completely.
2. **DISCUSS** key takeaways with the user (if in interactive mode). Ask what to emphasize.
3. **For EACH page created or updated, do so in BOTH `wiki/en/` and `wiki/zh/`:**
   a. **CREATE or UPDATE** the chapter summary page in `wiki/{lang}/chapters/`.
   b. **EXTRACT concepts.** For each concept:
      - If a concept page already exists → **UPDATE** in both languages.
      - If it doesn't exist → **CREATE** in both languages using the templates.
   c. **EXTRACT structures** → create or update structure pages in both languages.
   d. **EXTRACT principles** → create or update principle pages in both languages.
   e. **EXTRACT entities** → create or update entity pages in both languages.
   f. **EXTRACT genre analysis** → create or update genre pages in both languages.
   g. **EXTRACT character principles** → create or update character pages in both languages.
4. **CHECK for contradictions** or tensions with existing wiki content. Flag to user.
5. **ADD cross-references** in both language trees.
6. **UPDATE BOTH `wiki/en/index.md` AND `wiki/zh/index.md`**.
7. **APPEND to BOTH `wiki/en/log.md` AND `wiki/zh/log.md`** using these formats:

   English log:
   ```
   ## [YYYY-MM-DD] ingest | [Source Title]
   - Source: `[path to source file]`
   - Pages created: [list]
   - Pages updated: [list]
   - Contradictions flagged: [if any]
   - Notes: [brief observation]
   ```

   Chinese log:
   ```
   ## [YYYY-MM-DD] 收录 | [来源标题]
   - 来源：`[来源文件路径]`
   - 新建页面：[列表]
   - 更新页面：[列表]
   - 标记矛盾：[如有]
   - 备注：[简要说明]
   ```
8. **REPORT** a summary of all changes to the user.

### QUERY — Answering Questions

When the user asks a question about the wiki or McKee's ideas:

1. **READ the index** (`wiki/en/index.md` or `wiki/zh/index.md` depending on the user's language) to identify relevant pages.
2. **READ** the relevant wiki pages.
3. **SYNTHESIZE** an answer with citations using `[[wikilinks]]`.
4. **Respond in the language the user asked in.** If the user asks in Chinese, answer in Chinese and reference Chinese wiki pages. If in English, use English.
5. **Choose the right format:**
   - Short factual answer → inline response
   - Analysis or deep-dive → offer to create a wiki page (in both languages)
   - Comparison → offer to create a comparison page (in both languages)
6. **If the answer is filed as a wiki page**, create it in both `en/` and `zh/`.
7. **APPEND** the query to both log files.

### LINT — Health Check

When the user asks you to lint the wiki, or periodically after every 3–5 ingests:

1. **SCAN** all wiki pages in both language trees and check for:
   - **Contradictions** between pages
   - **Stale claims** that newer sources have superseded
   - **Orphan pages** with no inbound `[[wikilinks]]`
   - **Missing pages** — concepts mentioned in text but lacking their own page
   - **Concept pages with zero film examples**
   - **Missing cross-references**
   - **Frontmatter issues** — missing required fields
   - **Sync issues** — pages that exist in `en/` but not in `zh/` (or vice versa)
   - **Index gaps** — pages that exist but aren't listed in the index
   - **Missing language toggle links**
2. **GENERATE** a lint report (in the user's preferred language).
3. **AUTO-FIX** safe issues (missing cross-refs, frontmatter gaps, index entries, sync gaps).
4. **PRESENT** remaining issues to the user for guidance.
5. **APPEND** to both log files.

---

## Style Guide

1. **Always cite McKee's chapter number** when referencing his ideas. Include page numbers if available.
2. **Include at least one film example** per concept page. If none available, add `<!-- TODO: add film example -->`.
3. **Use present tense** for analysis: "McKee argues..." / "麦基认为……"
4. **Keep summaries concise** — chapter summaries under 500 words per language, concept definitions under 200 words per language.
5. **Use `[[wikilinks]]` liberally.** Every mention of a concept, entity, or chapter that has its own page should be linked.
6. **Frontmatter is mandatory.** Every page must have: `title`, `type`, `lang`, `last_updated`, `tags`.
7. **Aliases in frontmatter** — include alternate names. Chinese pages should include the English name as an alias; English pages may include the Chinese name.
8. **Use McKee's terminology** as page filenames (English kebab-case). Chinese titles appear in the `title` frontmatter field and as the `# H1` heading.
9. **When in doubt, create the page** in both languages. A stub is better than nothing.
10. **Tag consistently.** Every page gets its type as a tag plus relevant subtopic tags.
11. **Chinese first-mention convention.** On Chinese pages, the first mention of a McKee term uses the format: 中文名（English Name）. Subsequent mentions use Chinese only.
12. **Bilingual quotes.** On Chinese pages, include the original English quote followed by the Chinese translation.

---

## Frontmatter Reference

### Required Fields (all pages)

| Field | Type | Description |
|---|---|---|
| `title` | string | Display name (English for en/, Chinese for zh/) |
| `type` | string | One of: `chapter-summary`, `concept`, `structure`, `principle`, `entity`, `genre`, `comparison`, `application`, `note`, `index`, `log` |
| `lang` | string | `en` or `zh` |
| `last_updated` | date | YYYY-MM-DD |
| `tags` | list | At minimum the page type; add subtopic tags |

### Type-Specific Fields

| Field | Used by | Type | Description |
|---|---|---|---|
| `chapter` | chapter-summary | number | Chapter number |
| `chapter_refs` | concept, structure, principle | list of numbers | Chapters where this appears |
| `related` | concept, structure | list of wikilinks | Related concept/structure pages |
| `film_examples` | concept, structure, principle | list of wikilinks | Films illustrating this |
| `entity_type` | entity | string | `film`, `play`, `novel` |
| `director` | entity | string | Director name |
| `writer` | entity | string | Writer name |
| `concepts_illustrated` | entity | list of wikilinks | Concepts this entity demonstrates |
| `chapters_referenced_in` | entity | list of numbers | Chapters referencing this entity |
| `conventions` | genre | list of strings | Genre conventions |
| `exemplar_films` | genre | list of wikilinks | Best examples of the genre |
| `subjects` | comparison | list of wikilinks | What's being compared |
| `based_on` | application | list of wikilinks | Concepts/principles this guide is based on |
| `key_concepts` | chapter-summary | list of wikilinks | Main concepts in this chapter |
| `key_entities` | chapter-summary | list of wikilinks | Main entities in this chapter |
| `source` | chapter-summary | string | Path to source file |
| `aliases` | any | list of strings | Alternative names (include cross-language names) |
