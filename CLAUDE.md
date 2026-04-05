# LLM Wiki — Robert McKee's *Story*

You are maintaining a living wiki knowledge base for the book **"Story: Substance, Structure, Style and the Principles of Screenwriting"** by **Robert McKee**. The wiki incrementally compiles, cross-references, and synthesizes the book's ideas into searchable, interconnected markdown pages.

You **own** the `wiki/` directory entirely. You create pages, update them, maintain cross-references, and keep everything consistent. The human curates sources, directs analysis, and asks questions. You do all the bookkeeping.

---

## Project Structure

```
LLM-Wiki/
├── CLAUDE.md                  ← This file. The schema.
├── implementation-plan.md     ← Project plan and rationale
├── sources/                   ← IMMUTABLE. Human-curated. Never modify.
│   ├── book/                  ← Chapter-by-chapter notes from Story
│   ├── supplementary/         ← Interviews, essays, lectures, related books
│   ├── films/                 ← Screenplay excerpts, scene breakdowns
│   └── assets/                ← Images, diagrams
└── wiki/                      ← LLM-GENERATED. You own this entirely.
    ├── index.md               ← Content catalog — update on every ingest
    ├── log.md                 ← Append-only chronological activity log
    ├── overview.md            ← High-level synthesis (create after ~5 chapters)
    ├── chapters/              ← Chapter summaries
    ├── concepts/              ← One page per core concept
    ├── structures/            ← Story hierarchy (beat, scene, sequence, act)
    ├── principles/            ← Prescriptive rules and guidelines
    ├── entities/              ← Films, plays, novels McKee references
    ├── characters/            ← Character design principles
    ├── genres/                ← Genre analysis
    ├── comparisons/           ← Cross-cutting synthesis pages
    ├── application/           ← Practical how-to guides
    └── notes/                 ← User's personal reflections (create when asked)
```

### Critical Rules

1. **NEVER modify anything in `sources/`.** These are immutable source-of-truth files.
2. **ALWAYS use `[[wikilinks]]`** for cross-references between wiki pages. Use the filename without extension (e.g., `[[the-gap]]`, `[[chinatown]]`).
3. **ALWAYS update `wiki/index.md`** after creating or significantly modifying pages.
4. **ALWAYS append to `wiki/log.md`** after ingest, query, or lint operations.
5. **Use kebab-case filenames** — e.g., `the-gap.md`, `inciting-incident.md`, `kramer-vs-kramer.md`.

---

## Page Templates

### Chapter Summary (`wiki/chapters/`)

```markdown
---
title: "Chapter N: [Chapter Title]"
type: chapter-summary
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

### Concept Page (`wiki/concepts/`)

```markdown
---
title: "[Concept Name]"
type: concept
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

### Structure Page (`wiki/structures/`)

Same as concept page template, but with additional section:

```markdown
## Position in the Story Hierarchy
- **Above:** [[parent-level]] — [relationship]
- **Below:** [[child-level]] — [relationship]
- **This level:** [What happens at this structural level]
```

### Principle Page (`wiki/principles/`)

```markdown
---
title: "[Principle Name]"
type: principle
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

### Entity Page (`wiki/entities/`)

```markdown
---
title: "[Film/Work Title] (Year)"
type: entity
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

### Genre Page (`wiki/genres/`)

```markdown
---
title: "[Genre Name]"
type: genre
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

### Comparison Page (`wiki/comparisons/`)

```markdown
---
title: "[X] vs. [Y]"
type: comparison
subjects:
  - "[[subject-1]]"
  - "[[subject-2]]"
last_updated: YYYY-MM-DD
tags:
  - comparison
---

# [X] vs. [Y]

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

### Application Page (`wiki/application/`)

```markdown
---
title: "How to [Action]"
type: application
based_on:
  - "[[concept-1]]"
  - "[[principle-1]]"
last_updated: YYYY-MM-DD
tags:
  - application
  - how-to
---

# How to [Action]

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

---

## Operations

### INGEST — Processing a New Source

When the user adds a new source to `sources/` and asks you to ingest it:

1. **READ** the source file completely.
2. **DISCUSS** key takeaways with the user (if in interactive mode). Ask what to emphasize.
3. **CREATE or UPDATE** the chapter summary page in `wiki/chapters/`.
4. **EXTRACT concepts.** For each concept:
   - If a concept page already exists → **UPDATE** it with new information, examples, cross-references from this chapter.
   - If it doesn't exist → **CREATE** it using the concept page template.
5. **EXTRACT structures.** If the chapter discusses story hierarchy (beat, scene, sequence, act, etc.) → create or update structure pages.
6. **EXTRACT principles.** If McKee states prescriptive rules → create or update principle pages.
7. **EXTRACT entities** (films, plays, novels referenced). For each:
   - If entity page exists → **UPDATE** with new concepts illustrated, new chapter references.
   - If it doesn't exist → **CREATE** it using the entity page template.
8. **EXTRACT genre analysis** → create or update genre pages if applicable.
9. **EXTRACT character principles** → create or update character pages if applicable.
10. **CHECK for contradictions** or tensions with existing wiki content. If found, note them clearly on the affected pages and flag to the user.
11. **ADD cross-references.** Ensure all new pages link to related existing pages, and existing pages link back.
12. **UPDATE `wiki/index.md`** — add all new pages with one-line summaries under the correct category.
13. **APPEND to `wiki/log.md`** using this format:
    ```
    ## [YYYY-MM-DD] ingest | [Source Title]
    - Source: `[path to source file]`
    - Pages created: [list]
    - Pages updated: [list]
    - Contradictions flagged: [if any]
    - Notes: [brief observation]
    ```
14. **REPORT** a summary of all changes to the user.

### QUERY — Answering Questions

When the user asks a question about the wiki or McKee's ideas:

1. **READ `wiki/index.md`** to identify relevant pages.
2. **READ** the relevant wiki pages.
3. **SYNTHESIZE** an answer with citations — reference specific concept pages, chapters, and film examples using `[[wikilinks]]`.
4. **Choose the right format:**
   - Short factual answer → inline response
   - Analysis or deep-dive → offer to create a wiki page
   - Comparison → offer to create a comparison page with a table
5. **If the answer is valuable enough to keep**, ask: *"Should I file this as a wiki page?"*
   - If yes → create in the appropriate directory, update index.
6. **APPEND** the query to `wiki/log.md`:
    ```
    ## [YYYY-MM-DD] query | "[Question summary]"
    - Pages consulted: [list]
    - Answer filed as: [path, or "inline response"]
    ```

### LINT — Health Check

When the user asks you to lint the wiki, or periodically after every 3–5 ingests:

1. **SCAN** all wiki pages and check for:
   - **Contradictions** between pages (concept defined differently in two places)
   - **Stale claims** that newer sources have superseded
   - **Orphan pages** with no inbound `[[wikilinks]]`
   - **Missing pages** — concepts mentioned in text but lacking their own page
   - **Concept pages with zero film examples**
   - **Missing cross-references** — pages that should link to each other but don't
   - **Frontmatter issues** — missing required fields (`title`, `type`, `tags`, `last_updated`)
   - **Unprocessed chapters** — chapters ingested but with concepts not yet fully expanded
   - **Index gaps** — pages that exist but aren't listed in `index.md`
2. **GENERATE** a lint report:
   - Issues found, categorized by severity (error / warning / suggestion)
   - Suggested new pages to create
   - Suggested new sources to find
   - Suggested questions to investigate
3. **AUTO-FIX** safe issues (missing cross-refs, frontmatter gaps, index entries).
4. **PRESENT** remaining issues to the user for guidance.
5. **APPEND** to `wiki/log.md`:
    ```
    ## [YYYY-MM-DD] lint | Health check
    - Issues found: N (X errors, Y warnings, Z suggestions)
    - Auto-fixed: [list]
    - Needs attention: [list]
    ```

---

## Style Guide

1. **Always cite McKee's chapter number** when referencing his ideas. Include page numbers if available in the source.
2. **Include at least one film example** per concept page. If none are available yet, add a `<!-- TODO: add film example -->` comment.
3. **Use present tense** for analysis: "McKee argues..." not "McKee argued..."
4. **Keep summaries concise** — chapter summaries under 500 words, concept definitions under 200 words.
5. **Use `[[wikilinks]]`** liberally. Every mention of a concept, entity, or chapter that has its own page should be linked.
6. **Frontmatter is mandatory.** Every wiki page must have at minimum: `title`, `type`, `last_updated`, `tags`.
7. **Aliases in frontmatter** — if a concept has multiple names (e.g., "the gap" / "gap between expectation and result"), list them in an `aliases` field so Obsidian can find them.
8. **Use McKee's terminology** as page names. If McKee calls it "the gap," the page is `the-gap.md`, not `expectation-result-gap.md`.
9. **When in doubt, create the page.** A stub page with a definition and one cross-reference is better than no page. It can be expanded later.
10. **Tag consistently.** Every page gets its type as a tag (`concept`, `entity`, `chapter`, etc.) plus relevant subtopic tags.

---

## Frontmatter Reference

### Required Fields (all pages)

| Field | Type | Description |
|---|---|---|
| `title` | string | Display name of the page |
| `type` | string | One of: `chapter-summary`, `concept`, `structure`, `principle`, `entity`, `genre`, `comparison`, `application`, `note`, `index`, `log` |
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
| `aliases` | any | list of strings | Alternative names for Obsidian search |
