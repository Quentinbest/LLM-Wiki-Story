---
title: "LLM Wiki Story Web App Design"
created: 2026-04-30
status: design-spec
based_on: "plan.md"
design_skill: "ui-ux-pro-max"
---

# LLM Wiki Story Web App Design

## 1. Design Brief

Design a local-first web application that helps humans manage the bilingual LLM Wiki for Robert McKee's *Story*. The app is an operational knowledge workbench over Markdown files. It should make structure, validation, search, bilingual parity, and safe editing visible.

This is not a landing page. The first screen is the working dashboard.

Primary product category:

- Knowledge management application.
- Documentation and wiki browser.
- Data-dense operational dashboard.
- Local-first authoring and validation tool.

Primary design goal:

- Help a human understand and maintain a structured bilingual knowledge base with less risk and less friction.

Secondary design goal:

- Preserve the Markdown/Obsidian workflow while adding validation, search, graph navigation, and guided operations that Obsidian does not provide by default.

## 2. Design Inputs

The design is based on `plan.md` and the `ui-ux-pro-max` recommendations:

- Pattern: documentation/knowledge base with prominent search and related articles.
- Style: Minimalism and Swiss Style.
- Supplemental style: Data-Dense Dashboard and Drill-Down Analytics.
- Color base: neutral grey plus link blue for documentation.
- Typography candidates: Plus Jakarta Sans, Inter, Fira Sans/Fira Code.
- Chart guidance: network graph for relationship data, with adjacency list fallback for accessibility.
- UX guidance: strong keyboard navigation, visible focus states, semantic error messaging, no color-only status.
- Stack guidance: Next.js server components for initial data, shadcn semantic tables/forms, sanitize rendered Markdown.

Selected direction:

- Dense but calm operational interface.
- Mostly neutral surfaces with blue for navigation and actions.
- Semantic colors only for health and validation.
- Tables, split panes, tabs, command palette, graph inspector, and validation rails.
- No decorative hero, no gradient-orb background, no marketing composition.

## 3. Product Personality

The interface should feel like:

- A professional knowledge operations console.
- A serious editor for a bilingual corpus.
- A clean dashboard for structured Markdown.
- A tool for repeated daily use.

The interface should not feel like:

- A marketing SaaS landing page.
- A generic blog theme.
- A playful note-taking toy.
- A dashboard overloaded with decorative cards.
- A dark cyberpunk knowledge graph demo.

## 4. Design Principles

### 4.1 Operational First

Every screen should answer a work question:

- What is the health of the wiki?
- Which page needs attention?
- What does this page connect to?
- Is EN/ZH parity intact?
- Can this edit be saved safely?

### 4.2 Preserve Context

Knowledge work is navigation-heavy. The UI should keep the user oriented.

Rules:

- Keep a persistent left navigation rail on desktop.
- Keep page title, path, language, type, and health visible in the reader.
- Keep filters visible when browsing large lists.
- Use breadcrumbs for drill-down.
- When opening graph nodes, show details in an inspector instead of navigating immediately.

### 4.3 Show Rules as UI

The wiki's policies should appear as interface affordances.

Examples:

- `author: user` note pages show a protected badge.
- Missing mirror pages show a pair-status issue.
- Structural edits show a "requires MAP regeneration" notice.
- `canonical_chapter` has a tooltip explaining ownership.
- Source freshness appears as a dated verification state.

### 4.4 Use Tables for Tables

This product is metadata-heavy. Use real tables for page registries, issue lists, logs, terminology, and source references.

Avoid:

- Card grids for page lists.
- Div-based fake tables.
- Oversized row padding.

### 4.5 Search Is a Primary Navigation Mode

The corpus has hundreds of pages and many aliases. Search should be reachable from anywhere.

Rules:

- Global command/search input in the top bar.
- Keyboard shortcut target: `Cmd+K` / `Ctrl+K`.
- Search results show title, path, type, chapter, importance, language, and snippets.
- Exact slug/title matches outrank body matches.

### 4.6 Graph Needs an Accessible Twin

The graph is useful but not sufficient.

Rules:

- Every graph view must have an adjacency list/table alternative.
- Node and edge information must be available in the right inspector.
- Filters must reduce visual density before the graph becomes unreadable.

## 5. Visual System

### 5.1 Color Palette

Use a neutral documentation base with controlled semantic accents.

| Token | Hex | Use |
|---|---|---|
| `--bg-canvas` | `#F8FAFC` | App background |
| `--bg-surface` | `#FFFFFF` | Main panels and tables |
| `--bg-subtle` | `#F1F5F9` | Secondary surfaces |
| `--bg-muted` | `#E2E8F0` | Hover and selected rows |
| `--text-primary` | `#1E293B` | Body and headings |
| `--text-secondary` | `#475569` | Metadata and labels |
| `--text-muted` | `#64748B` | Secondary hints |
| `--border` | `#CBD5E1` | Strong borders |
| `--border-subtle` | `#E2E8F0` | Standard separators |
| `--action` | `#2563EB` | Primary actions and links |
| `--action-hover` | `#1D4ED8` | Primary hover |
| `--success` | `#059669` | Healthy validation |
| `--warning` | `#D97706` | Warning validation |
| `--danger` | `#DC2626` | Error validation |
| `--info` | `#0891B2` | Informational state |
| `--concept` | `#2563EB` | Concept graph nodes |
| `--structure` | `#7C3AED` | Structure graph nodes |
| `--principle` | `#059669` | Principle graph nodes |
| `--quote` | `#D97706` | Quote graph nodes |
| `--note` | `#BE185D` | User note graph nodes |

Color rules:

- Do not use color alone to communicate status; pair with text and icon.
- Keep blue as the only high-frequency action color.
- Use semantic colors sparingly in validation and graph legends.
- Avoid gradients for app backgrounds.
- Avoid a UI that reads as all blue/slate; semantic and graph colors should create functional variety.

### 5.2 Typography

Recommended:

- UI font: `Inter`.
- Mono font: `JetBrains Mono` or system monospace.
- Optional softer SaaS alternative: `Plus Jakarta Sans`.

Use `Inter` for MVP because it is excellent for dense tables, metadata, and dashboards.

Type scale:

| Token | Size | Line Height | Weight | Use |
|---|---:|---:|---:|---|
| `text-xs` | 12px | 16px | 400-600 | Badges, metadata, table hints |
| `text-sm` | 14px | 20px | 400-600 | Tables, sidebar, form labels |
| `text-base` | 16px | 24px | 400 | Markdown body |
| `text-lg` | 18px | 28px | 600 | Panel headings |
| `text-xl` | 20px | 30px | 650 | Page title compact |
| `text-2xl` | 24px | 32px | 650 | Dashboard heading |
| `text-mono-xs` | 12px | 16px | 400 | Slugs, file paths |

Rules:

- Do not scale font size with viewport width.
- Letter spacing stays at `0`.
- Use mono only for slugs, file paths, code, script names, and hashes.
- Markdown prose can use `16px`; operational surfaces should mostly use `12px-14px`.

### 5.3 Spacing

Use an 8px base grid.

| Token | Value | Use |
|---|---:|---|
| `--space-1` | 4px | Tight icon/text gaps |
| `--space-2` | 8px | Table cell inner gaps |
| `--space-3` | 12px | Compact panel padding |
| `--space-4` | 16px | Standard panel padding |
| `--space-5` | 20px | Section spacing |
| `--space-6` | 24px | Page gutters |
| `--space-8` | 32px | Major vertical rhythm |

Density:

- Tables: 36px row height default.
- Compact tables: 32px row height.
- Top bar: 56px.
- Sidebar: 260px desktop, collapsible to 64px icon rail.
- Right inspector: 360px desktop.
- Validation rail: 320px desktop.

### 5.4 Radius, Borders, Shadows

| Token | Value | Use |
|---|---:|---|
| `--radius-sm` | 4px | Badges, inputs |
| `--radius-md` | 6px | Buttons, panels |
| `--radius-lg` | 8px | Modals and repeated page summary items |
| `--shadow-sm` | `0 1px 2px rgba(15, 23, 42, 0.06)` | Floating popovers |
| `--shadow-md` | `0 8px 24px rgba(15, 23, 42, 0.10)` | Modals only |

Rules:

- Do not nest cards inside cards.
- Page sections are full-width working areas, not floating decorative cards.
- Use borders and separators before shadows.
- Keep card radius at 8px or less.

### 5.5 Iconography

Use Lucide icons consistently.

Recommended mappings:

| Concept | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Library | `Library` |
| Reader/Page | `FileText` |
| Search | `Search` |
| Graph | `Network` |
| Validation | `ShieldCheck` |
| Error | `CircleX` |
| Warning | `TriangleAlert` |
| Info | `Info` |
| Success | `CircleCheck` |
| Sources | `FolderOpen` |
| Canonical | `BookOpenText` |
| Operations | `TerminalSquare` |
| Edit | `Pencil` |
| Preview | `Eye` |
| Diff | `GitCompare` |
| Regenerate | `RefreshCw` |
| Lock/Protected | `Lock` |
| Language | `Languages` |

Rules:

- No emoji icons.
- Icon-only buttons need visible tooltips and `aria-label`.
- Icon size: 16px in dense tables, 18px in toolbar buttons, 20px in primary navigation.

## 6. Application Shell

### 6.1 Desktop Layout

```text
+----------------------------------------------------------------------------------+
| Top bar: project switch/search/actions/language/cache status                       |
+----------------------+-----------------------------------------------------------+
| Sidebar              | Main content                                              |
| - Dashboard          |                                                           |
| - Library            | Optional right inspector on reader/graph/editor           |
| - Search             |                                                           |
| - Graph              |                                                           |
| - Sources            |                                                           |
| - Canonical          |                                                           |
| - Operations         |                                                           |
+----------------------+-----------------------------------------------------------+
```

Desktop dimensions:

- Sidebar width: 260px.
- Top bar height: 56px.
- Main content max width: none for tables/graphs; 920px prose width in reader body.
- Right inspector width: 360px.

### 6.2 Tablet Layout

- Sidebar collapses to icon rail at 768px-1024px.
- Right inspector becomes a drawer.
- Tables keep important columns and move secondary metadata into row expansion.

### 6.3 Mobile Layout

- Bottom navigation with five items: Dashboard, Library, Search, Graph, Operations.
- Reader uses single language at a time with sticky language switch.
- Graph defaults to adjacency list.
- Editor is limited to one side at a time; paired comparison appears as tabs.

Mobile breakpoint requirements:

- No horizontal scroll at 375px.
- Toolbar actions collapse into menus.
- Long slugs wrap or truncate with tooltip/copy action.

## 7. Navigation Model

### 7.1 Sidebar

Sidebar groups:

```text
Workspace
  Dashboard
  Library
  Search
  Graph

Corpus
  Sources
  Canonical

Maintenance
  Validation
  Operations
  Drafts
```

Library can expand:

```text
Library
  All Pages
  Chapters
  Concepts
  Structures
  Principles
  Characters
  Entities
  Comparisons
  Applications
  Quotes
  Notes
```

### 7.2 Top Bar

Left:

- Current page title or section label.
- Breadcrumb when in deep pages.

Center:

- Global command/search input.

Right:

- Cache status.
- Validation status summary.
- Language default toggle.
- Theme toggle.
- Settings.

### 7.3 Command Palette

Command palette actions:

- Open page by title, slug, or alias.
- Search content.
- Go to Dashboard, Library, Graph, Operations.
- Run validation.
- Regenerate MAP dry-run.
- Create page pair.
- Open canonical terminology.

## 8. Dashboard Design

### 8.1 Dashboard Purpose

The dashboard answers:

- Is the wiki healthy?
- What changed recently?
- What needs human attention?
- Where are the most important knowledge hubs?

### 8.2 Dashboard Layout

```text
+----------------------------------------------------------------------------------+
| H1: Wiki Health                                      Last cache: 10:42:18         |
| Subtitle: 224 EN pages, 224 ZH pages, mirror complete                             |
+----------------------------------------------------------------------------------+
| Health strip: Mirror | Frontmatter | Links | Mermaid | Sources | MAP | Quotes     |
+----------------------------------------------------------------------------------+
| Left: Attention Queue                         Right: Corpus Shape                 |
| - stale verification                          - page type counts                  |
| - quote translation TODOs                     - importance distribution           |
| - map/index drift                             - top hubs                          |
| - protected note warnings                     - recent operations                 |
+----------------------------------------------------------------------------------+
| Bottom: High-importance pages and recent logs                                      |
+----------------------------------------------------------------------------------+
```

### 8.3 Dashboard Components

Health strip:

- Small status cells, not oversized KPI cards.
- Each status has icon, label, count, and state.
- Example: `Mirror: Healthy`, `Quote TODO: 6`, `Stale: 12`.

Attention Queue:

- Table with columns: Severity, Issue, Page Pair, Owner, Action.
- Sort by severity and importance.
- Action buttons: View, Validate, Fix, Dismiss if appropriate.

Corpus Shape:

- Stacked bar for page types.
- Importance distribution bars.
- Pair status summary.
- Top inbound-link hubs.

Recent Logs:

- Unified timeline from EN/ZH logs.
- Show operation type, date, source, page counts.

### 8.4 Dashboard Empty and Error States

If cache missing:

- Show "Index not built yet".
- Primary action: "Build local index".
- Secondary: "Open troubleshooting".

If parser error:

- Show file path, line if available, and error.
- Do not block rendering the rest of the dashboard.

## 9. Library Design

### 9.1 Library Purpose

The Library is a registry of page pairs, optimized for filtering and maintenance.

### 9.2 Layout

```text
+----------------------------------------------------------------------------------+
| Toolbar: Type tabs | Search within library | Filters | View options              |
+----------------------------------------------------------------------------------+
| Filter rail       | Page pair table                                             |
| - type            | Title | Type | Ch | Imp | EN | ZH | Author | Verified | Issues |
| - chapter         | ...                                                            |
| - importance      |                                                                |
| - author          |                                                                |
| - issues          |                                                                |
+----------------------------------------------------------------------------------+
```

### 9.3 Table Columns

Required columns:

- Title.
- Relative path.
- Type.
- Canonical chapter.
- Importance.
- Pair status.
- Author.
- Last verified.
- Issue count.
- Outbound links.
- Inbound links.

Column behavior:

- Title opens pair reader.
- EN/ZH status buttons open specific language page.
- Issue count opens validation filtered to that page pair.
- Path has copy action.

### 9.4 Filters

Filters:

- Type.
- Canonical chapter.
- Importance.
- Author.
- Has issues.
- Stale verification.
- Missing quote translation.
- Has source.
- Has TODO.
- Has Mermaid.

Filter design:

- Use checkboxes for multi-select.
- Use segmented control for language/pair mode.
- Persist filter state in URL.

## 10. Reader Design

### 10.1 Reader Purpose

Reader is the main knowledge consumption view.

It should show:

- Rendered content.
- Page metadata.
- EN/ZH counterpart.
- Links and graph context.
- Validation issues.
- Quotes and examples.

### 10.2 Single-Language Reader

```text
+----------------------------------------------------------------------------------+
| Breadcrumb | Type badge | Canonical chapter | Importance | Issues | Edit          |
+----------------------------------------------------------------------------------+
| Main prose column                                      | Right inspector          |
| - H1                                                   | Tabs:                    |
| - language toggle                                      | - Metadata               |
| - rendered Markdown                                    | - Links                  |
| - Mermaid diagrams                                     | - Quotes                 |
| - source references                                    | - Issues                 |
|                                                       | - Source                 |
+----------------------------------------------------------------------------------+
```

### 10.3 Paired Reader

```text
+---------------------------------------+------------------------------------------+
| English                               | Chinese                                  |
| title, status, sections               | title, status, sections                  |
| rendered content                      | rendered content                         |
+---------------------------------------+------------------------------------------+
| Shared inspector: pair health, topology, diffs, links                            |
+----------------------------------------------------------------------------------+
```

Paired reader controls:

- Sync scroll on/off.
- Section alignment on/off.
- Show raw Markdown.
- Show rendered.
- Show translation gaps.

### 10.4 Reader Inspector Tabs

Metadata:

- Title.
- Type.
- Path.
- Language.
- Canonical chapter.
- Chapter refs.
- Importance.
- Author.
- Last updated.
- Last verified.
- Source.

Links:

- Outbound links grouped by source: body, frontmatter, quote anchor.
- Inbound links.
- Related frontmatter.
- Film examples.

Quotes:

- Quote atoms anchored to this chapter/concept.
- EN/ZH status.
- Missing translations.

Issues:

- Validation issues for this page and pair.
- Action buttons when autofix exists.

Source:

- Source path.
- Mtime.
- Stale status.
- Open source read-only.

## 11. Search Design

### 11.1 Search Purpose

Search should replace manual file hunting.

### 11.2 Search Layout

```text
+----------------------------------------------------------------------------------+
| Large search input: title, slug, alias, quote, concept                            |
+----------------------------------------------------------------------------------+
| Filters                         | Results                                         |
| - language                      | result title, type, chapter, importance          |
| - type                          | snippets with highlighted matches                |
| - chapter                       | matched fields                                   |
| - importance                    | quick actions                                    |
| - author                        |                                                  |
+----------------------------------------------------------------------------------+
```

### 11.3 Result Ranking Display

Show why a result ranked:

- Exact title.
- Alias.
- Slug.
- Quote text.
- Body snippet.
- Importance boost.

Example result metadata:

```text
The Gap
concept | Ch. 7 | importance 5 | en/concepts/the-gap.md
Matched: title, body, related concepts
```

### 11.4 Search States

Empty query:

- Show recently opened pages.
- Show high-importance hubs.
- Show common searches: gap, controlling idea, antagonism, exposition.

No results:

- Suggest fuzzy matches.
- Offer search across both languages.
- Offer source search.

## 12. Graph Design

### 12.1 Graph Purpose

Graph reveals the structure of the knowledge base, but it must remain controlled.

Primary graph tasks:

- Find hubs.
- Explore one concept's neighborhood.
- See chapter-owned clusters.
- Identify orphans.
- Compare link types.

### 12.2 Layout

```text
+----------------------------------------------------------------------------------+
| Graph toolbar: scope, language, type filters, edge filters, layout, search node    |
+--------------------+--------------------------------------+----------------------+
| Filter rail        | Graph canvas                         | Node inspector       |
| - type             | nodes and edges                       | selected page        |
| - chapter          |                                      | metadata             |
| - importance       |                                      | links                |
| - edge kind        |                                      | actions              |
+--------------------+--------------------------------------+----------------------+
| Accessibility panel: adjacency list/table                                         |
+----------------------------------------------------------------------------------+
```

### 12.3 Node Design

Node encodings:

- Shape or border style for page type.
- Color for broad category.
- Size for importance or inbound link count.
- Ring for validation issues.
- Lock indicator for user notes.

Do not rely on color alone:

- Add type initials or icons in node.
- Inspector must name type and status.

### 12.4 Edge Design

Edge types:

| Edge | Style |
|---|---|
| Body wikilink | Solid grey |
| Frontmatter related | Solid blue |
| Film example | Dashed amber |
| Quote anchor | Dotted amber |
| Canonical chapter | Solid green |
| Concept illustrated | Solid violet |

Edge opacity:

- Default: 60%.
- Highlight neighborhood: 100%.
- Non-selected edges: 15%-25%.

### 12.5 Accessibility Alternative

Every graph filter state has an adjacency table:

| Source | Relationship | Target | Type | Chapter |
|---|---|---|---|---|

Keyboard users can navigate graph relationships through this table.

## 13. Editor Design

### 13.1 Editor Purpose

The editor must make safe changes easier than unsafe changes.

### 13.2 Editor Layout

```text
+----------------------------------------------------------------------------------+
| File header: path, pair status, author, save state, validation summary             |
+----------------------------------------------------------------------------------+
| Left editor pane                    | Right preview/validation pane               |
| - tabs: Markdown / Frontmatter      | - tabs: Preview / Diff / Issues / Pair       |
| - code editor                       | - rendered Markdown                          |
| - section outline                   | - validation rail                            |
+----------------------------------------------------------------------------------+
| Footer: Save draft | Validate | Save | Save + regenerate MAP | Cancel             |
+----------------------------------------------------------------------------------+
```

### 13.3 Paired Editor

Desktop:

- EN editor left.
- ZH editor right.
- Shared validation rail.
- Sync section navigation.

Tablet/mobile:

- Tabs: English, Chinese, Pair Issues.

### 13.4 Frontmatter Form

Field groups:

Core:

- Title.
- Type.
- Language.
- Tags.
- Author.

Retrieval:

- Importance.
- Canonical chapter.
- Chapter refs.

Relationships:

- Related.
- Film examples.
- Key concepts.
- Source.

Dates:

- Last updated.
- Last verified.

Rules:

- Use real labels, not placeholder-only fields.
- Validate on blur.
- Errors use `role="alert"` in UI implementation.
- Slug selectors use autocomplete.

### 13.5 Save States

Save button states:

- Disabled: no changes.
- Validate first: content changed but not checked.
- Save allowed: no blocking errors.
- Save blocked: validation errors.
- Save with warning: warnings require acknowledgement.
- Confirm note edit: user note body changed.

### 13.6 Diff View

Diff view should show:

- EN changes.
- ZH changes.
- Frontmatter changes.
- Generated follow-up changes required.
- Affected links.

Use color plus text labels:

- Added.
- Removed.
- Changed.

## 14. Operations Design

### 14.1 Operations Purpose

Operations turns maintenance scripts and validations into reviewable workflows.

### 14.2 Operations Home

Operations list:

- Run full validation.
- Regenerate MAP.
- Check index coverage.
- Atomize quotes.
- Find quote translation TODOs.
- Append bilingual log.
- Rebuild cache.

Each operation row:

- Name.
- Risk level.
- Last run.
- Writes files: yes/no.
- Dry-run available.
- Primary action.

### 14.3 Operation Runner

```text
+----------------------------------------------------------------------------------+
| Operation: Regenerate MAP                                                         |
| Risk: writes wiki/en/MAP.md and wiki/zh/MAP.md                                    |
+----------------------------------------------------------------------------------+
| Parameters                                                                         |
| Dry run toggle                                                                     |
| Run button                                                                         |
+----------------------------------------------------------------------------------+
| Output                                                                             |
| Affected files                                                                     |
| Diff                                                                               |
| Validation after run                                                               |
+----------------------------------------------------------------------------------+
```

Rules:

- Dry-run is default for bulk operations.
- Write operations require confirmation.
- Show exact affected files before writing.
- Never expose arbitrary command input.

## 15. Canonical View Design

### 15.1 Purpose

Canonical view turns `wiki/CANONICAL.md` into a working reference.

### 15.2 Layout

```text
+----------------------------------------------------------------------------------+
| Search terminology | Filter by chapter | Show unmatched terms                     |
+----------------------------------------------------------------------------------+
| Terminology table                                                                |
| English | Chinese | Canonical chapter | Linked page | Issues                     |
+----------------------------------------------------------------------------------+
| Detail panel: policy sections, conflict rules, authorship boundary               |
+----------------------------------------------------------------------------------+
```

### 15.3 Interactions

- Search English or Chinese terms.
- Click term to open concept page if found.
- Click chapter to filter Library by canonical chapter.
- Show pages whose title/alias likely maps to a canonical term.
- Flag terms without corresponding pages when relevant.

## 16. Sources View Design

### 16.1 Purpose

Sources view gives read-only visibility into immutable source material.

### 16.2 Layout

```text
+----------------------+-----------------------------------------------------------+
| Source tree          | Source reader                                             |
| - book               | Markdown or HTML render                                   |
| - supplementary      | Metadata: mtime, size, linked wiki pages                  |
| - films              | Stale page report                                         |
| - assets             |                                                           |
+----------------------+-----------------------------------------------------------+
```

### 16.3 Source Rules

- No edit button.
- No save action.
- Copy path action is allowed.
- "Start ingest plan" may create a draft operation, not modify source.

## 17. Component Rules

### 17.1 Buttons

Button hierarchy:

- Primary: high-value action such as Save, Run validation, Open page.
- Secondary: preview, dry-run, filter.
- Ghost: table row actions.
- Destructive: delete/rename only after confirmation.

Rules:

- All clickable buttons use pointer cursor.
- Icon-only buttons have tooltip and `aria-label`.
- Hover states use color/border changes, not layout-shifting scale.

### 17.2 Badges

Badge types:

- Page type.
- Language.
- Importance.
- Canonical chapter.
- Author.
- Validation severity.
- Pair status.

Badges should be compact:

- Height: 22px.
- Radius: 4px.
- Font: 12px.

### 17.3 Tables

Tables should support:

- Sticky header.
- Sort.
- Filter.
- Column visibility.
- Row hover.
- Keyboard focus.
- Row expansion for secondary details.

Tables should not:

- Use large card rows.
- Hide critical status behind hover only.
- Depend only on color.

### 17.4 Panels

Panel types:

- Main work surface.
- Right inspector.
- Filter rail.
- Validation rail.
- Modal dialog.

Panel rules:

- Bordered surfaces on white background.
- No nested panels unless visually necessary for modal content.
- Consistent header height around 44px.

## 18. Interaction Design

### 18.1 Keyboard Shortcuts

Suggested shortcuts:

| Shortcut | Action |
|---|---|
| `Cmd+K` / `Ctrl+K` | Open command palette |
| `/` | Focus search in current view |
| `G then D` | Dashboard |
| `G then L` | Library |
| `G then S` | Search |
| `G then G` | Graph |
| `E` | Edit current page if allowed |
| `V` | Validate current page |
| `Esc` | Close drawer/modal |

Every shortcut must have a menu-accessible equivalent.

### 18.2 Loading States

Use skeleton rows and panels:

- Table skeleton rows preserve row height.
- Reader skeleton preserves prose width.
- Graph shows loading grid and "Building graph".
- Validation shows running steps.

Avoid spinner-only pages when layout is known.

### 18.3 Empty States

Empty states should be operational:

- No search results: suggest filters to relax.
- No validation issues: show healthy state and last run time.
- No graph nodes after filter: show which filters removed all nodes.
- No quote translations TODO: show completed count.

### 18.4 Error States

Error states should include:

- Human-readable message.
- Technical details expandable.
- File path if relevant.
- Suggested next action.

Examples:

- "Cannot parse frontmatter in `wiki/en/concepts/foo.md`."
- "This page changed on disk since you opened it. Review current file before saving."

## 19. Accessibility Requirements

Baseline:

- WCAG AA minimum, AAA where practical for text contrast.
- All icon buttons have accessible names.
- All form controls have labels.
- Validation errors use text and icon, not color only.
- Error summaries are announced.
- Keyboard navigation covers all core workflows.
- Focus states are visible and consistent.
- Graph has adjacency table fallback.
- `prefers-reduced-motion` disables non-essential animation.

Specific requirements:

- The Markdown reader should preserve heading hierarchy.
- Tables use semantic table elements.
- Filter groups use fieldsets or labelled regions.
- Command palette traps focus only while open and restores focus on close.
- Toasts should not be the only place critical errors appear.

## 20. Content and Microcopy

Tone:

- Direct.
- Operational.
- Specific.
- No celebratory fluff.

Good labels:

- "Mirror complete"
- "3 stale pages"
- "Regenerate MAP"
- "Protected note"
- "Dry run"
- "Show affected files"
- "Open source read-only"
- "Save pair"

Avoid labels:

- "Awesome"
- "Magic sync"
- "AI-powered everything"
- "Oops"

Validation messages:

- State the problem.
- State the file.
- State the fix or next step.

Example:

```text
Missing language toggle
wiki/en/concepts/example.md does not link to its ZH counterpart.
Add: > 中文版：[[wiki/zh/concepts/example|中文]]
```

## 21. Page-Level Wireframes

### 21.1 Dashboard Wireframe

```text
Top bar
+----------------------------------------------------------------------------------+
| LLM Wiki Story                      Search pages, quotes, sources...       Healthy |
+----------------------------------------------------------------------------------+
Sidebar        Main
+-------------+--------------------------------------------------------------------+
| Dashboard   | Wiki Health                                                        |
| Library     | 224 EN pages | 224 ZH pages | Mirror complete | Last scan 10:42 |
| Search      |--------------------------------------------------------------------|
| Graph       | Health strip: Frontmatter Links Mermaid Sources MAP Quotes         |
| Sources     |--------------------------------------------------------------------|
| Canonical   | Attention Queue                  | Corpus Shape                    |
| Operations  | Severity Issue Page Action       | Type counts                     |
|             | Warning  Stale source ...        | Importance bars                 |
|             | Info     Quote TODO ...          | Top hubs                        |
|             |--------------------------------------------------------------------|
|             | Recent Operations                                                   |
+-------------+--------------------------------------------------------------------+
```

### 21.2 Reader Wireframe

```text
+----------------------------------------------------------------------------------+
| Library / Concepts / The Gap        concept Ch.7 Imp 5 Issues 0            Edit  |
+----------------------------------------------------------------------------------+
| The Gap                                                   | Inspector             |
| 中文版 toggle                                             | Metadata              |
| Definition                                                | Type: concept         |
| rendered Markdown                                         | Canonical: 7          |
| Mermaid diagram                                           | Author: claude        |
| Film examples                                             | Last verified         |
| Sources                                                   | Tabs: Links Quotes    |
+----------------------------------------------------------------------------------+
```

### 21.3 Editor Wireframe

```text
+----------------------------------------------------------------------------------+
| Edit Pair: concepts/the-gap.md          Protected: no    Validation: 0 errors     |
+---------------------------------------+------------------------------------------+
| EN Markdown                           | ZH Markdown                              |
| editor                                | editor                                   |
+---------------------------------------+------------------------------------------+
| Preview / Diff / Issues                                                          |
| Save draft | Validate | Save pair | Save + regenerate MAP                         |
+----------------------------------------------------------------------------------+
```

### 21.4 Graph Wireframe

```text
+----------------------------------------------------------------------------------+
| Graph scope: All pages | Lang: EN | Min importance: 4 | Edges: related,wikilink   |
+-------------------+----------------------------------------+-------------------------+
| Filters           | Graph canvas                           | Inspector               |
| Type              |                                        | Selected node           |
| Chapter           |                                        | Metadata                |
| Edge kind         |                                        | Neighbors               |
| Issues            |                                        | Open page               |
+-------------------+----------------------------------------+-------------------------+
| Adjacency table fallback                                                           |
+----------------------------------------------------------------------------------+
```

## 22. Implementation Mapping

Recommended component libraries:

- `shadcn/ui` for table, button, tabs, dialog, popover, sheet, command, input, select, checkbox, badge, tooltip.
- `lucide-react` for icons.
- `react-markdown` or unified rendering pipeline for Markdown.
- `mermaid` for diagrams.
- `Cytoscape.js` for graph.
- `MiniSearch` or `FlexSearch` for search.

Component mapping:

| Need | shadcn/UI primitive |
|---|---|
| Command palette | `Command` |
| Navigation drawer mobile | `Sheet` |
| Confirmation dialogs | `AlertDialog` |
| Metadata tabs | `Tabs` |
| Filters | `Checkbox`, `Select`, `Popover` |
| Tables | `Table` |
| Toast-like non-critical notices | `Toast` or `Sonner` |
| Tooltips | `Tooltip` |
| Forms | `Input`, `Textarea`, `Label`, `Select` |

Next.js guidance:

- Fetch initial wiki cache in server components.
- Use Suspense boundaries for graph/search-heavy panels.
- Keep editor and graph as client components.
- Sanitize any rendered user-editable Markdown/HTML.
- Do not fetch initial dashboard data in `useEffect`.

## 23. Visual QA Checklist

Before shipping UI:

- Dashboard fits at 1440px without feeling sparse.
- Dashboard still works at 1024px with collapsed sidebar.
- No horizontal scroll at 375px.
- Reader prose width is comfortable and inspector does not squeeze text.
- Tables have stable row heights.
- Long file paths truncate or wrap cleanly.
- Buttons do not resize on hover.
- Focus states are visible.
- Light mode contrast passes 4.5:1.
- Graph has a non-graph table fallback.
- All icon-only buttons have tooltips and accessible labels.
- No emoji icons are used.
- No nested card-heavy layout.

## 24. First Design Sprint

Sprint goal:

- Turn the read-only MVP from `plan.md` into a concrete interface prototype.

Deliverables:

1. App shell.
2. Dashboard screen.
3. Library screen.
4. Reader screen for a concept page.
5. Search screen.
6. Graph screen with inspector and adjacency table.
7. Validation report screen.

Acceptance criteria:

- The dashboard clearly shows 224 EN pages and 224 ZH pages.
- Library can filter by type, chapter, importance, and author.
- Reader can switch between EN/ZH and render Mermaid.
- Search can find `the-gap`, `鸿沟`, quote pages, and source-backed pages.
- Graph can filter to high-importance pages.
- Validation report groups issues by severity and code.
- UI is usable at 375px, 768px, 1024px, and 1440px.

## 25. Design Decisions to Lock Before Coding

Recommended defaults:

| Decision | Default |
|---|---|
| Theme | Light-first, optional dark later |
| Font | Inter + JetBrains Mono |
| Component system | shadcn/ui + Lucide |
| App shell | Sidebar + top command bar |
| Reader default | Single-language with right inspector |
| Paired reader | Available as a toggle |
| Graph default | Filtered to importance 4-5 on first load |
| Editor default | Disabled until validation MVP is stable |
| Mobile graph | Adjacency list first |
| Cache status | Always visible in top bar |

## 26. Non-Goals

Do not design for these in MVP:

- Public marketing website.
- Multi-tenant hosted SaaS.
- Rich collaborative editing.
- WYSIWYG replacement for Markdown.
- Full Obsidian clone.
- Fully automatic LLM ingest with no review.
- Decorative data visualizations that do not aid maintenance.

## 27. Summary

The right design for this app is a dense, precise, local-first operations console for a bilingual Markdown knowledge base. The app should make the corpus legible: what exists, what connects, what is canonical, what is stale, what is safe to edit, and what needs human review.

The visual style should stay restrained: neutral surfaces, strong tables, clear metadata, compact badges, semantic validation colors, and graph views backed by accessible tabular alternatives. This creates a tool that supports repeated knowledge maintenance rather than a one-time visual demo.

