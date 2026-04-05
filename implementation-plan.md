---
title: "LLM Wiki Implementation Plan — Robert McKee's *Story*"
created: 2026-04-05
status: plan
tags:
  - llm-wiki
  - mckee
  - screenwriting
  - knowledge-base
---

# LLM Wiki Implementation Plan

## Building a Living Knowledge Base for Robert McKee's *Story: Substance, Structure, Style and the Principles of Screenwriting*

Based on [Andrej Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

---

## 1. Vision & Rationale

### 1.1 What Is an LLM Wiki?

Most people's experience with LLMs and documents is RAG: upload files, the LLM retrieves relevant chunks at query time, generates an answer. Knowledge is re-derived from scratch on every question. Nothing accumulates.

The LLM Wiki is different. Instead of retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM reads it, extracts key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting contradictions, strengthening the evolving synthesis.

**The wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read.

### 1.2 Why McKee's *Story*?

McKee's *Story* is an ideal candidate for the LLM Wiki pattern:

- **Conceptually dense** — The book introduces dozens of interlocking concepts (the gap, spine, controlling idea, turning points, crisis/climax/resolution, exposition, etc.) that are hard to hold in memory simultaneously.
- **Extensively cross-referenced** — McKee constantly references films, plays, and novels to illustrate principles. These references form a rich entity network.
- **Hierarchical and structural** — The book presents a clear hierarchy (beat → scene → sequence → act → story) that maps naturally to wiki architecture.
- **Practically applicable** — The principles are designed to be applied. A wiki lets you tag concepts with "how to apply" notes and connect them to your own writing projects.
- **Rich with examples** — McKee draws on hundreds of films. Tracking which films illustrate which principles creates a powerful cross-reference system.

### 1.3 Division of Labor

| You (the human) | The LLM |
|---|---|
| Curate sources (chapter notes, highlights, supplementary material) | Summarize, extract, and structure |
| Direct analysis ("emphasize this," "compare these two ideas") | Maintain cross-references and consistency |
| Ask probing questions | Synthesize answers, file them as pages |
| Think about what it all means | All the bookkeeping and grunt work |
| Browse the wiki in Obsidian, follow links, check the graph | Update 10–15 pages per ingest pass |

### 1.4 The Obsidian Workflow

Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

- **LLM agent on one side, Obsidian on the other.** The LLM makes edits; you browse results in real time.
- **Graph view** shows the shape of the wiki — hubs, clusters, orphans.
- **Wikilinks (`[[concept]]`)** create the web of connections.
- **Dataview** queries let you build dynamic tables from page frontmatter.
- **The wiki is a git repo of markdown files.** Version history, branching, and collaboration come for free.

---

## 2. Architecture: Three Layers

```
┌─────────────────────────────────────────────────────────┐
│                    LAYER 3: SCHEMA                       │
│            CLAUDE.md — rules, workflows,                 │
│            conventions, page templates                   │
├─────────────────────────────────────────────────────────┤
│                    LAYER 2: THE WIKI                     │
│         wiki/ — LLM-generated & maintained               │
│    summaries, concepts, entities, comparisons,           │
│    synthesis, index, log                                 │
├─────────────────────────────────────────────────────────┤
│                  LAYER 1: RAW SOURCES                    │
│        sources/ — immutable, human-curated               │
│    chapter notes, highlights, supplementary              │
│    articles, film analyses, images                       │
└─────────────────────────────────────────────────────────┘
```

### Layer 1: Raw Sources (`sources/`)

Immutable input material. The LLM reads from here but **never modifies** these files. This is your source of truth.

- **`sources/book/`** — Chapter-by-chapter notes, highlights, or transcriptions from *Story*. Added incrementally as you read.
- **`sources/supplementary/`** — McKee interviews, lectures, reviews, related essays (e.g., David Mamet's notes on drama, William Goldman on screenwriting), comparisons with other screenwriting frameworks (Truby, Snyder, Vogler, Field).
- **`sources/films/`** — Screenplay excerpts, scene breakdowns, or analytical notes on films McKee references (e.g., *Chinatown*, *Casablanca*, *Kramer vs. Kramer*, *The Fugitive*).
- **`sources/assets/`** — Downloaded images, diagrams, charts. (Obsidian Settings → Files and links → set "Attachment folder path" to `sources/assets/`.)

**Source file format:**

```markdown
---
title: "Chapter 3: The Structure Spectrum"
type: book-chapter
source: "Story — Robert McKee"
chapter: 3
date_added: 2026-04-05
tags:
  - structure
  - archplot
  - miniplot
  - antiplot
---

[Your reading notes, highlights, and annotations here]
```

### Layer 2: The Wiki (`wiki/`)

LLM-generated and LLM-maintained. You read it; the LLM writes it.

Organized into subdirectories by page type:

| Directory | Purpose | Examples |
|---|---|---|
| `wiki/chapters/` | Chapter-by-chapter summaries and analysis | `chapter-01-the-story-problem.md`, `chapter-03-structure-spectrum.md` |
| `wiki/concepts/` | One page per core McKee concept | `the-gap.md`, `controlling-idea.md`, `inciting-incident.md`, `turning-point.md`, `crisis.md`, `climax.md`, `exposition.md`, `story-spine.md` |
| `wiki/structures/` | Story architecture and hierarchies | `beat.md`, `scene.md`, `sequence.md`, `act-design.md`, `story-climax.md`, `archplot.md`, `miniplot.md`, `antiplot.md` |
| `wiki/principles/` | McKee's prescriptive rules and guidelines | `principle-of-antagonism.md`, `unity-and-variety.md`, `pacing-and-rhythm.md`, `the-negation-of-the-negation.md` |
| `wiki/entities/` | Films, plays, novels McKee references | `chinatown.md`, `casablanca.md`, `hamlet.md`, `kramer-vs-kramer.md` |
| `wiki/characters/` | Character archetypes and analysis | `protagonist-design.md`, `antagonist-forces.md`, `character-dimension.md`, `character-arc.md` |
| `wiki/genres/` | Genre analysis per McKee's taxonomy | `love-story.md`, `thriller.md`, `social-drama.md`, `comedy.md`, `crime.md` |
| `wiki/comparisons/` | Cross-cutting synthesis pages | `mckee-vs-truby.md`, `archplot-vs-miniplot.md`, `plot-driven-vs-character-driven.md`, `showing-vs-telling.md` |
| `wiki/application/` | Practical how-to and writing exercises | `how-to-design-a-scene.md`, `how-to-build-a-climactic-sequence.md`, `self-revision-checklist.md` |
| `wiki/notes/` | Your personal reflections and questions | `my-questions.md`, `connections-to-my-project.md`, `ideas-for-further-study.md` |

**Wiki page format (concept example):**

```markdown
---
title: "The Gap"
type: concept
aliases:
  - gap
  - the gap between expectation and result
chapter_refs:
  - 8
related:
  - "[[turning-point]]"
  - "[[scene]]"
  - "[[principle-of-antagonism]]"
film_examples:
  - "[[chinatown]]"
  - "[[kramer-vs-kramer]]"
source_count: 3
last_updated: 2026-04-05
tags:
  - concept
  - scene-design
  - conflict
---

# The Gap

## Definition

[McKee's definition of the gap — the crack that opens between expectation and result when a character takes action]

## McKee's Argument

[Summary of McKee's reasoning, with chapter references]

## How It Works

[Mechanical explanation: character acts → expects result → gap opens → unexpected result forces new action]

## Film Examples

- **[[chinatown]]** — [How the gap operates in a specific scene]
- **[[kramer-vs-kramer]]** — [Another example]

## Relationship to Other Concepts

- [[turning-point]] — Every turning point is a gap.
- [[scene]] — The gap is the engine that drives scenes.
- [[principle-of-antagonism]] — The gap opens because antagonistic forces resist the character's desire.

## Application Notes

[How to use this concept in your own writing]

## Sources

- *Story* Chapter 8, pp. XX–XX
```

**Wiki page format (entity/film example):**

```markdown
---
title: "Chinatown (1974)"
type: entity
entity_type: film
director: Roman Polanski
writer: Robert Towne
aliases:
  - Chinatown
concepts_illustrated:
  - "[[the-gap]]"
  - "[[irony]]"
  - "[[controlling-idea]]"
  - "[[crisis]]"
chapters_referenced_in:
  - 8
  - 11
  - 14
last_updated: 2026-04-05
tags:
  - film
  - neo-noir
  - archplot
---

# Chinatown (1974)

## Overview

[Brief film synopsis relevant to McKee's analysis]

## McKee's Usage

[How and why McKee references this film, in which chapters, to illustrate which principles]

## Concepts Illustrated

- **[[the-gap]]** — [Specific scene analysis]
- **[[controlling-idea]]** — [How the film's controlling idea works]
- **[[irony]]** — [How the ending embodies irony]

## Key Scenes Analyzed

[Specific scenes McKee breaks down]
```

### Layer 3: The Schema (`CLAUDE.md`)

The configuration document that makes the LLM a disciplined wiki maintainer. Lives at the project root.

It defines:

1. **Project overview** — What this wiki is, what book it covers, what the goal is.
2. **Directory structure** — Where sources go, where wiki pages go, naming conventions.
3. **Page templates** — Frontmatter schema and content structure for each page type (concept, entity, chapter summary, comparison, etc.).
4. **Wikilink conventions** — Always use `[[page-name]]` wikilinks. Use aliases in frontmatter for alternate names.
5. **Ingest workflow** — Step-by-step instructions (see Section 3.1).
6. **Query workflow** — How to answer questions and when to file answers as wiki pages (see Section 3.2).
7. **Lint workflow** — Health check procedure (see Section 3.3).
8. **Style guide** — Always cite McKee's chapter, include at least one film example per concept, use present tense for analysis, keep summaries under 500 words.
9. **Frontmatter requirements** — Every page must have `title`, `type`, `tags`, `last_updated`. Concept pages must also have `chapter_refs`, `related`, `film_examples`.

---

## 3. Core Operations

### 3.1 Ingest Workflow

Triggered when you add a new source (e.g., notes from a chapter you just read).

```
INGEST WORKFLOW
───────────────
1. READ the new source file in sources/
2. DISCUSS key takeaways with the user (if interactive)
3. CREATE or UPDATE the chapter summary page in wiki/chapters/
4. EXTRACT new concepts → for each:
   a. If concept page exists → UPDATE with new information, examples, cross-refs
   b. If concept page doesn't exist → CREATE it from template
5. EXTRACT entity references (films, plays, novels) → for each:
   a. If entity page exists → UPDATE
   b. If entity page doesn't exist → CREATE it from template
6. EXTRACT any genre-specific analysis → UPDATE genre pages
7. EXTRACT any character/protagonist principles → UPDATE character pages
8. CHECK for contradictions or tensions with existing wiki content → FLAG
9. UPDATE wiki/index.md with new/modified pages
10. APPEND entry to wiki/log.md with timestamp, source, pages touched
11. REPORT summary of changes to user
```

**Expected scope:** A single chapter ingest might touch 10–20 wiki pages.

**Ingest style:** Recommended to ingest one chapter at a time and stay involved — read the summaries, check the updates, guide the LLM on what to emphasize. But batch-ingest is also possible for less supervision.

### 3.2 Query Workflow

Triggered when you ask a question against the wiki.

```
QUERY WORKFLOW
──────────────
1. READ wiki/index.md to identify relevant pages
2. READ the relevant wiki pages
3. SYNTHESIZE an answer with citations (chapter refs, page links)
4. Present the answer in the appropriate format:
   - Short answer → inline response
   - Analysis → markdown page
   - Comparison → table or comparison page
   - Visual → diagram or chart (Marp/matplotlib)
5. ASK: "Should I file this as a wiki page?"
   - If yes → CREATE page in appropriate directory, update index
6. APPEND query to wiki/log.md
```

**Key insight:** Good answers should be filed back into the wiki as new pages. A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. Your explorations compound in the knowledge base just like ingested sources do.

### 3.3 Lint Workflow

Periodic health check. Run after every few chapters or when the wiki feels stale.

```
LINT WORKFLOW
─────────────
1. SCAN all wiki pages for:
   a. Contradictions between pages
   b. Stale claims that newer sources have superseded
   c. Orphan pages with no inbound [[wikilinks]]
   d. Important concepts mentioned in text but lacking their own page
   e. Concept pages with zero film examples
   f. Missing cross-references (pages that should link to each other but don't)
   g. Frontmatter inconsistencies (missing required fields)
   h. Chapters that have been ingested but whose concepts lack full pages
2. GENERATE a lint report with:
   - Issues found, categorized by severity
   - Suggested new pages to create
   - Suggested new sources to find (web search for missing film analyses, etc.)
   - Suggested questions to investigate
3. FIX automatically fixable issues (missing cross-refs, frontmatter gaps)
4. PRESENT remaining issues to user for guidance
5. APPEND lint pass to wiki/log.md
```

---

## 4. Indexing & Logging

### 4.1 `wiki/index.md` — Content Catalog

Content-oriented. A catalog of everything in the wiki — each page listed with a link, a one-line summary, and metadata. Organized by category.

When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids embedding-based RAG.

**Format:**

```markdown
# Wiki Index

## Chapters
- [[chapter-01-the-story-problem]] — Why story matters; the decline of story in modern film
- [[chapter-02-the-structure-spectrum]] — Archplot, miniplot, antiplot; the triangle of design
- ...

## Concepts
- [[the-gap]] — The crack between expectation and result; engine of scene design
- [[controlling-idea]] — The story's ultimate meaning expressed as a sentence
- [[inciting-incident]] — The event that radically upsets the balance of the protagonist's life
- ...

## Structures
- [[beat]] — The smallest unit of story; an exchange of action/reaction
- [[scene]] — A beat-level event that turns value through conflict
- ...

## Principles
- [[principle-of-antagonism]] — A story can only be as intellectually fascinating and emotionally compelling as its antagonistic forces
- ...

## Entities (Films & Works)
- [[chinatown]] — Neo-noir; McKee's primary example for irony, the gap, controlling idea
- [[casablanca]] — Classic archplot; love story structure, character arc
- ...

## Genres
- [[love-story]] — McKee's analysis of the love story genre conventions
- ...

## Comparisons
- [[archplot-vs-miniplot]] — Classical vs. minimalist story design
- ...

## Application
- [[how-to-design-a-scene]] — Practical guide using McKee's scene analysis framework
- ...

## Notes
- [[my-questions]] — Open questions and things to revisit
- ...
```

### 4.2 `wiki/log.md` — Chronological Activity Log

Append-only. Records what happened and when — ingests, queries, lint passes.

**Format:**

```markdown
# Wiki Log

## [2026-04-05] ingest | Chapter 1: The Story Problem
- Source: `sources/book/chapter-01.md`
- Pages created: chapter-01-the-story-problem, the-story-problem, archplot (stub)
- Pages updated: index.md
- Notes: First ingest. Established initial concept pages.

## [2026-04-06] ingest | Chapter 2: The Structure Spectrum
- Source: `sources/book/chapter-02.md`
- Pages created: chapter-02-structure-spectrum, archplot, miniplot, antiplot, structure-spectrum
- Pages updated: chapter-01-the-story-problem (added cross-refs), index.md
- Notes: Major structural framework established. Triangle of design is central.

## [2026-04-06] query | "How does McKee distinguish archplot from Vogler's hero's journey?"
- Pages consulted: archplot, structure-spectrum
- Answer filed as: wiki/comparisons/mckee-vs-vogler.md
- Pages updated: index.md

## [2026-04-10] lint | First health check
- Issues found: 3 orphan pages, 2 concepts mentioned without own page
- Auto-fixed: 5 missing cross-references
- Suggested: Create pages for "subplot", "scene sequence"
```

**Tip:** Each entry starts with a consistent prefix (`## [YYYY-MM-DD] type | Title`) so the log is parseable:
```bash
grep "^## \[" wiki/log.md | tail -5
```

---

## 5. McKee-Specific Content Architecture

### 5.1 Core Concept Map

The following is an anticipated (non-exhaustive) map of McKee's major concepts that will become wiki pages. This evolves as you read — the LLM will discover and add concepts during ingest.

```
STORY DESIGN
├── The Story Problem (why story matters)
├── Structure Spectrum
│   ├── Archplot (classical design)
│   ├── Miniplot (minimalism)
│   └── Antiplot (anti-structure)
├── Story Structure
│   ├── Beat
│   ├── Scene
│   ├── Sequence
│   ├── Act
│   └── Story
├── Story Elements
│   ├── Inciting Incident
│   ├── Progressive Complications
│   ├── Crisis
│   ├── Climax
│   └── Resolution
├── Scene Design
│   ├── The Gap (expectation vs. result)
│   ├── Turning Points
│   ├── Setups and Payoffs
│   └── Emotional Dynamics
├── Story Substance
│   ├── Setting (period, duration, location, level of conflict)
│   ├── Character (characterization vs. true character)
│   ├── Character Dimension
│   ├── Character Arc
│   ├── The Protagonist (conscious/unconscious desire)
│   └── The Principle of Antagonism
├── Story Design Principles
│   ├── Controlling Idea
│   ├── Story Spine
│   ├── Unity and Variety
│   ├── Pacing and Rhythm
│   ├── The Negation of the Negation
│   ├── Irony
│   └── Subtext
├── Genre
│   ├── Love Story
│   ├── Thriller / Horror
│   ├── Crime
│   ├── Social Drama
│   ├── Comedy
│   ├── Political Drama
│   ├── Fantasy / Sci-Fi
│   └── Multi-plot
├── Exposition
│   ├── Show Don't Tell
│   ├── Backstory
│   ├── Dream Sequences
│   ├── Montage
│   ├── Voice-Over Narration
│   └── Flashback
├── Dialogue
│   ├── Subtext in Dialogue
│   └── Dialogue Design
└── The Writer's Method
    ├── From the Inside Out
    ├── The Treatment
    └── The Step-Outline
```

### 5.2 Entity Tracking: Films McKee References

McKee references hundreds of films. Each significant film gets its own entity page. Expected high-frequency references include:

| Film | Key Concepts Illustrated |
|---|---|
| *Chinatown* (1974) | The gap, irony, controlling idea, crisis design |
| *Casablanca* (1942) | Archplot, character arc, love story genre |
| *Kramer vs. Kramer* (1979) | Turning points, scene analysis |
| *The Fugitive* (1993) | Progressive complications, pacing |
| *Hamlet* (Shakespeare) | Dimension, crisis, negation of the negation |
| *Tender Mercies* (1983) | Miniplot, minimalist design |
| *8½* (Fellini, 1963) | Antiplot, anti-structure |
| *Star Wars* (1977) | Archplot, hero's journey intersection |
| *Jaws* (1975) | Inciting incident, genre conventions |
| *Sunset Boulevard* (1950) | Irony, controlling idea, voice-over |

(This list will grow substantially as chapters are ingested.)

### 5.3 McKee's Hierarchy as Wiki Architecture

McKee's story hierarchy maps directly to the wiki's structural logic:

```
BEAT (smallest)
  └── exchange of action/reaction
SCENE
  └── a beat-level event that turns value through conflict
SEQUENCE
  └── a series of scenes building to a more impactful turning point
ACT
  └── a series of sequences building to a climactic scene that causes major reversal
STORY (largest)
  └── a series of acts building to the story climax, the absolute and irreversible change
```

Each level gets its own concept page with:
- McKee's definition
- How it relates to the levels above and below
- Film examples at that level
- Common mistakes McKee warns against

---

## 6. Directory Structure

```
LLM-Wiki-Story/
├── CLAUDE.md                          ← Schema: rules, workflows, conventions
├── implementation-plan.md             ← This document
│
├── sources/                           ← LAYER 1: Raw, immutable
│   ├── book/                          ← Chapter-by-chapter notes from Story
│   │   ├── chapter-01.md
│   │   ├── chapter-02.md
│   │   └── ...
│   ├── supplementary/                 ← Interviews, related essays, lectures
│   │   ├── mckee-interview-2020.md
│   │   └── ...
│   ├── films/                         ← Screenplay excerpts, scene breakdowns
│   │   ├── chinatown-scene-analysis.md
│   │   └── ...
│   └── assets/                        ← Images, diagrams
│       └── ...
│
├── wiki/                              ← LAYER 2: LLM-generated & maintained
│   ├── en/                            ← English wiki
│   │   ├── index.md                   ← English content catalog
│   │   ├── log.md                     ← English activity log
│   │   ├── overview.md                ← High-level synthesis
│   │   ├── chapters/                  ← Chapter summaries
│   │   ├── concepts/                  ← Core concepts
│   │   ├── structures/                ← Story hierarchy
│   │   ├── principles/                ← Prescriptive rules
│   │   ├── entities/                  ← Films, plays, novels
│   │   ├── characters/                ← Character design
│   │   ├── genres/                    ← Genre analysis
│   │   ├── comparisons/               ← Cross-cutting synthesis
│   │   ├── application/               ← Practical how-to guides
│   │   └── notes/                     ← Personal reflections
│   └── zh/                            ← 中文维基 (mirrors en/ structure)
│       ├── index.md                   ← 中文内容索引
│       ├── log.md                     ← 中文活动日志
│       ├── overview.md                ← 全书框架综述
│       ├── chapters/                  ← 章节摘要
│       ├── concepts/                  ← 核心概念
│       ├── structures/                ← 故事层级结构
│       ├── principles/                ← 创作原则
│       ├── entities/                  ← 电影、戏剧、小说
│       ├── characters/                ← 角色设计
│       ├── genres/                    ← 类型分析
│       ├── comparisons/               ← 对比分析
│       ├── application/               ← 实践应用指南
│       └── notes/                     ← 个人思考笔记
│
└── .claude/                           ← Claude Code config
    └── settings.local.json
```

### Bilingual Design

The wiki maintains **parallel English and Chinese trees** (`wiki/en/` and `wiki/zh/`). Key design decisions:

- **Same filenames** in both trees (English kebab-case, e.g., `the-gap.md`). Chinese titles appear in frontmatter and headings.
- **Language toggle links** at the top of every page connect to the other-language version.
- **Wikilinks stay within the same language tree** — English pages link to English pages, Chinese to Chinese.
- **Both indexes and logs updated together** on every operation.
- **Chinese first-mention convention:** 中文名（English Name）on first use, then Chinese only.
- **Terminology table** maintained in CLAUDE.md maps McKee's English terms to standardized Chinese translations.

---

## 7. Obsidian Configuration

### 7.1 Recommended Obsidian Settings

- **Vault root:** Open `LLM-Wiki-Story/` as an Obsidian vault
- **Files and links → Attachment folder path:** `sources/assets/`
- **Files and links → New link format:** Shortest path when possible
- **Files and links → Use [[Wikilinks]]:** ON
- **Hotkeys → "Download attachments":** Bind to `Ctrl+Shift+D`

### 7.2 Recommended Plugins

| Plugin | Purpose |
|---|---|
| **Dataview** | Dynamic tables querying frontmatter (e.g., "all concepts from Chapter 8", "all films illustrating the-gap") |
| **Graph View** (core) | Visualize wiki structure — find hubs, clusters, orphans |
| **Obsidian Web Clipper** | Convert web articles to markdown for `sources/supplementary/` |
| **Marp Slides** | Generate presentations from wiki content |
| **Backlinks** (core) | See all pages linking to the current page |
| **Outline** (core) | Navigate headings within long pages |
| **Tag Wrangler** | Manage and rename tags across the wiki |

### 7.3 Useful Dataview Queries

Once pages have proper frontmatter, you can create dynamic views:

**All concepts from a specific chapter:**
```dataview
TABLE chapter_refs, related
FROM "wiki/concepts"
WHERE contains(chapter_refs, 8)
SORT title ASC
```

**All films and the concepts they illustrate:**
```dataview
TABLE concepts_illustrated AS "Concepts"
FROM "wiki/entities"
SORT title ASC
```

**Recently updated pages:**
```dataview
TABLE last_updated, type
FROM "wiki"
SORT last_updated DESC
LIMIT 20
```

**Orphan check — pages with no backlinks (supplement to lint):**
```dataview
LIST
FROM "wiki"
WHERE length(file.inlinks) = 0
```

---

## 8. Workflow: Reading *Story* with the Wiki

### Phase 1: Setup (Day 1)

- [ ] Scaffold the directory structure
- [ ] Write `CLAUDE.md` with full schema
- [ ] Create starter `wiki/index.md` and `wiki/log.md`
- [ ] Open `LLM-Wiki/` as an Obsidian vault
- [ ] Install recommended plugins (Dataview, Web Clipper, Marp)

### Phase 2: Chapter-by-Chapter Reading (Ongoing)

For each chapter:

1. **Read the chapter.** Take notes, highlights, mark key passages.
2. **Create source file.** Add your notes to `sources/book/chapter-NN.md` with proper frontmatter.
3. **Run INGEST.** Tell the LLM to process the new chapter. Stay involved — review the summaries, guide emphasis.
4. **Browse in Obsidian.** Follow new links, check graph view, read updated pages.
5. **Ask questions.** Use the Query workflow. File valuable answers as wiki pages.
6. **Repeat.**

### Phase 3: Periodic Maintenance

- **Every 3–5 chapters:** Run LINT. Fix orphans, add missing cross-references, create pages for concepts mentioned but not yet expanded.
- **When adding supplementary sources:** Follow the same ingest workflow. The LLM integrates new material into the existing wiki.
- **When you have insights:** Add them to `wiki/notes/` or direct the LLM to create new comparison/application pages.

### Phase 4: Synthesis (After Finishing the Book)

- [ ] Run a comprehensive LINT pass
- [ ] Ask the LLM to generate `wiki/overview.md` — a high-level synthesis of McKee's entire framework
- [ ] Ask for cross-cutting synthesis pages: "What are McKee's 10 most important principles?", "How do all the concepts relate to each other?", "What's McKee's theory of genre?"
- [ ] Create application pages: "How to apply McKee's framework to evaluate a screenplay", "Self-revision checklist based on McKee"
- [ ] Consider comparisons with other screenwriting books you've read

---

## 9. Growth Projections

| After... | Estimated wiki size |
|---|---|
| Part 1 (Chapters 1–5) | ~30–40 pages: 5 chapter summaries, 15–20 concept pages, 5–10 entity pages |
| Part 2 (Chapters 6–10) | ~70–90 pages: scene design and structure concepts expand significantly |
| Part 3 (Chapters 11–15) | ~100–130 pages: genre pages, principle pages, many new entities |
| Part 4 (Chapters 16–19) | ~140–170 pages: dialogue, exposition, writer's method pages |
| Full book + supplementary | ~200–250 pages per language (~400–500 total): comparisons, application guides, personal notes, supplementary material |

At this scale, `index.md` alone is sufficient for navigation. If the wiki grows beyond ~300 pages (e.g., with extensive supplementary material), consider adding [qmd](https://github.com/tobi/qmd) for hybrid BM25/vector search.

---

## 10. Optional CLI Tools

| Tool | Purpose | When to add |
|---|---|---|
| [qmd](https://github.com/tobi/qmd) | Local markdown search engine (BM25 + vector, CLI + MCP) | When wiki exceeds ~300 pages |
| [Obsidian Web Clipper](https://obsidian.md/clipper) | Browser extension to clip articles as markdown sources | Day 1 — for adding supplementary material |
| [Marp](https://marp.app/) | Markdown-based slide deck generation | When you want to present findings |
| git | Version history for the entire wiki | Day 1 — `git init` the project |

---

## 11. Success Criteria

You'll know the wiki is working when:

1. **You can ask a question spanning multiple chapters** and get a synthesized answer with citations — without the LLM re-reading raw sources.
2. **The graph view shows a connected web**, not isolated clusters — concepts link to entities, entities link to chapters, chapters link to concepts.
3. **You discover connections you didn't notice while reading** — the cross-referencing surfaces patterns McKee builds across chapters.
4. **The wiki is more useful than your raw notes** — it's organized, searchable, and cross-referenced in ways your linear reading notes never could be.
5. **Maintenance is effortless** — the LLM handles all the bookkeeping. You just read, think, and ask questions.

---

## 12. Getting Started: First Session Checklist

After approving this plan:

1. **Scaffold the directory structure** — create all folders and starter files
2. **Write `CLAUDE.md`** — the full schema with ingest/query/lint workflows, page templates, and conventions
3. **Initialize `wiki/index.md` and `wiki/log.md`** — empty but formatted
4. **`git init`** — start version tracking
5. **Add your first chapter notes** to `sources/book/chapter-01.md`
6. **Run the first INGEST** — watch the wiki come alive

---

*"The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else." — Andrej Karpathy*
