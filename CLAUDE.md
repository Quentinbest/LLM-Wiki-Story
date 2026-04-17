# LLM Wiki — Robert McKee's *Story*

You maintain a bilingual (EN/ZH) living wiki for **Robert McKee's *Story***. You own `wiki/` entirely — create pages, update them, maintain cross-references. The human curates sources and directs analysis.

## Project Structure

```
LLM-Wiki-Story/
├── CLAUDE.md                  ← This file
├── sources/                   ← IMMUTABLE. Never modify.
│   ├── book/                  ← Chapter notes
│   ├── supplementary/         ← Essays, lectures, related books
│   ├── films/                 ← Screenplay excerpts
│   └── assets/
└── wiki/                      ← LLM-GENERATED. You own this.
    ├── en/  ←→  zh/           ← Mirrored structure (zh/ uses same filenames)
        ├── index.md / log.md / overview.md
        ├── chapters/ concepts/ structures/ principles/
        ├── entities/ characters/ genres/ comparisons/
        ├── application/ notes/
```

## Critical Rules

1. **NEVER modify `sources/`.** Immutable source-of-truth.
2. **ALWAYS use `[[wikilinks]]`** — filename without extension (e.g. `[[the-gap]]`).
3. **ALWAYS update BOTH indexes** (`wiki/en/index.md` + `wiki/zh/index.md`) after creating/modifying pages.
4. **ALWAYS append to BOTH logs** after every operation.
5. **Kebab-case filenames** in both trees. Same filename in `en/` and `zh/`.
6. **ALWAYS create pages in both languages** — never leave trees out of sync.
7. **ALWAYS include a Mermaid diagram** on every `concept`, `structure`, `principle`, `chapter-summary`, `comparison`, and `overview` page.

## Bilingual Rules

1. Every page exists in both languages. ZH version reads naturally in Chinese — not a literal translation.
2. Language toggle at top of every page:
   - EN: `> 中文版：[[wiki/zh/{path}|中文]]`
   - ZH: `> English: [[wiki/en/{path}|English]]`
3. Wikilinks stay within the same language tree; only the toggle crosses trees.
4. Both indexes and both logs updated together on every operation.
5. Every page frontmatter includes `lang: en` or `lang: zh`.
6. ZH: first mention of a McKee term → 中文名（English Name）; after that, Chinese only.
7. ZH: simplified Chinese (简体中文). Film titles: 中文片名（*English Title*, Year）.

## Terminology Reference

| English | 中文 |
|---|---|
| Story / Structure | 故事 / 结构 |
| The Gap | 鸿沟（期望与结果之间的裂缝） |
| Controlling Idea | 主控思想 |
| Inciting Incident | 激励事件 |
| Progressive Complications | 递进复杂化 |
| Crisis / Climax / Resolution | 危机 / 高潮 / 结局 |
| Turning Point | 转折点 |
| Beat / Scene / Sequence / Act | 节拍 / 场景 / 序列 / 幕 |
| Archplot / Miniplot / Antiplot | 大情节 / 小情节 / 反情节 |
| Protagonist / Antagonist | 主人公 / 对抗力量 |
| Principle of Antagonism | 对抗原则 |
| Characterization | 人物塑造（外在特征） |
| True Character | 真实性格（压力下的选择） |
| Character Arc / Dimension | 人物弧光 / 人物维度 |
| Spine / Subtext | 故事脊椎 / 潜文本 |
| Exposition | 铺陈 / 解说 |
| Setup and Payoff | 铺垫与回报 |
| Negation of the Negation | 否定之否定 |
| Genre / Obligatory Scene | 类型 / 必备场景 |
| Backstory | 前史 |

*(Extend as new terms are encountered.)*

## Concept Relationship Diagrams

Required on: `concept`, `structure`, `principle`, `chapter-summary`, `comparison`, `overview`. Optional on `entity` (if ≥3 interacting concepts). Not needed on `note`, `index`, `log`.

- Use Mermaid fenced blocks (` ```mermaid `); place under the first narrative section.
- EN page uses EN labels; ZH page uses ZH labels. **Graph topology must be identical.**
- Node shapes: `[Concept]` · `[[Structure]]` · `{{Taxonomy}}` · `([Principle])` · `((Value))`
- Label edges with verbs: `governs`, `builds on`, `contrasts with`, `climaxes in`.
- ~3–8 nodes per diagram. Update diagram whenever `related:` frontmatter changes.
- LINT must verify every required page has ≥1 mermaid block and EN/ZH topology matches.

## Page Templates

All pages share this frontmatter pattern:

```yaml
---
title: "..."          # EN display name for en/; ZH display name for zh/
type: chapter-summary | concept | structure | principle | entity | genre | comparison | application | note
lang: en | zh
last_updated: YYYY-MM-DD
tags: [type, ...]
# type-specific fields (see Frontmatter Reference)
---
```

Required sections per page type (EN heading → ZH heading):

| Type | Required sections |
|---|---|
| **chapter-summary** | Summary · Key Concepts Introduced · Key Examples · McKee's Core Argument · Connections to Other Chapters · Notable Quotes<br/>摘要 · 引入的核心概念 · 关键案例 · 麦基的核心论点 · 与其他章节的联系 · 重要引文 |
| **concept** | Definition · McKee's Argument · How It Works · Film Examples · Relationship to Other Concepts · Common Mistakes · Sources<br/>定义 · 麦基的论述 · 运作机制 · 电影案例 · 与其他概念的关系 · 常见错误 · 来源 |
| **structure** | (same as concept) + Position in the Story Hierarchy<br/>+ 在故事层级中的位置 |
| **principle** | The Principle · McKee's Reasoning · In Practice · Film Examples · Violations and Consequences · Sources<br/>原则 · 麦基的论证 · 实践应用 · 电影案例 · 违反的后果 · 来源 |
| **entity** | Overview · McKee's Usage · Concepts Illustrated · Key Scenes Analyzed<br/>概述 · 麦基的引用 · 所阐释的概念 · 关键场景分析 |
| **genre** | McKee's Definition · Genre Conventions · Obligatory Scenes · Exemplar Films · Subgenres · Sources<br/>麦基的定义 · 类型惯例 · 必备场景 · 代表作品 · 子类型 · 来源 |
| **comparison** | Overview · Key Differences (table) · McKee's Position · Film Examples · Synthesis<br/>概述 · 核心差异 · 麦基的立场 · 电影案例 · 综合分析 |
| **application** | Overview · Steps · Checklist · Based On<br/>概述 · 步骤 · 检查清单 · 基于 |

## Operations

### INGEST
1. Read source completely.
2. For each page type in **both** `wiki/en/` and `wiki/zh/`: create/update chapter summary, concepts, structures, principles, entities, genres, and character pages.
3. Add/update Mermaid diagrams with **identical topology** in both trees.
4. Check for contradictions with existing wiki content; flag to user.
5. Update both indexes and append to both logs.

Log format:
```
## [YYYY-MM-DD] ingest | [Source Title]
- Source: `path`
- Pages created: [list]
- Pages updated: [list]
- Contradictions flagged: [if any]
```
ZH log uses: `## [YYYY-MM-DD] 收录 | [标题]` with fields `来源 / 新建页面 / 更新页面 / 标记矛盾`.

### QUERY
1. Read the relevant index, then the relevant pages.
2. Synthesize answer with `[[wikilinks]]`; respond in the user's language.
3. For analysis/comparisons, offer to create a wiki page in both languages.
4. Append query to both logs.

### LINT
Check for: contradictions · stale claims · orphan pages · missing pages · zero film examples · missing cross-refs · frontmatter gaps · EN/ZH sync gaps · index gaps · missing language toggles · missing Mermaid blocks · diagram drift (`related:` entry absent from diagram) · bilingual topology mismatch.

Auto-fix safe issues. Present remaining issues to user. Append to both logs.

## Style Guide

1. Cite McKee's chapter number (+ page if available) for every claim.
2. At least one film example per concept page; use `<!-- TODO: add film example -->` if unavailable.
3. Present tense: "McKee argues…" / "麦基认为……"
4. Chapter summaries ≤500 words per language; concept definitions ≤200 words.
5. `[[wikilink]]` every mention of a concept, entity, or chapter that has its own page.
6. Mandatory frontmatter: `title`, `type`, `lang`, `last_updated`, `tags`.
7. Chinese pages: include English name as alias in frontmatter.
8. Filenames always English kebab-case; Chinese titles in `title:` and `# H1`.
9. When in doubt, create the stub in both languages.

## Frontmatter Reference

### Required (all pages)

| Field | Type | Description |
|---|---|---|
| `title` | string | Display name (EN for en/, ZH for zh/) |
| `type` | string | chapter-summary · concept · structure · principle · entity · genre · comparison · application · note · index · log |
| `lang` | string | `en` or `zh` |
| `last_updated` | date | YYYY-MM-DD |
| `tags` | list | Type tag + subtopic tags |

### Type-Specific

| Field | Used by | Description |
|---|---|---|
| `chapter` | chapter-summary | Chapter number |
| `chapter_refs` | concept, structure, principle | Chapters where concept appears |
| `related` | concept, structure | Related pages (wikilinks) |
| `film_examples` | concept, structure, principle | Illustrating films |
| `entity_type` | entity | film · play · novel |
| `director` / `writer` | entity | Names |
| `concepts_illustrated` | entity | Concepts the work demonstrates |
| `chapters_referenced_in` | entity | Chapters citing this entity |
| `conventions` | genre | Genre conventions (string list) |
| `exemplar_films` | genre | Best examples |
| `subjects` | comparison | What's being compared |
| `based_on` | application | Source concepts/principles |
| `key_concepts` / `key_entities` | chapter-summary | Main concepts/entities |
| `source` | chapter-summary | Path to source file |
| `aliases` | any | Alternate names (include cross-language) |
