---
title: Wiki Log
type: log
lang: en
---

## [2026-05-06] migrate | The Third Day — Controlling Idea + Crisis-Climax case studies
- Source: project artifacts under `drafts/the-third-day/` (controlling-idea.md, crisis-climax-audit.md, spine.md, key-image.md, antagonism-test.md, plus supporting cast-design.md and act-design.md)
- Pages created: `wiki/en/application/controlling-idea-the-third-day.md`, `wiki/zh/application/controlling-idea-the-third-day.md`, `wiki/en/application/crisis-climax-the-third-day.md`, `wiki/zh/application/crisis-climax-the-third-day.md`
- Pages updated: `wiki/en/index.md`, `wiki/zh/index.md` (Application section: two new entries each)
- Contradictions flagged: none
- Notes: First end-to-end migration produced by the project's bespoke agent fleet under `.claude/agents/`. The drafts directory holds the full project context (premise slate, contracts, character files, arc map, scene cards, beat-level analyses, exposition ledger, subtext audit) — these wiki pages are the *teaching artifacts* distilled from the drafts. Migration honored: bilingual mirroring with natural Chinese (not literal translation); identical EN/ZH Mermaid topology (verified per `CLAUDE.md` policy); language toggles top of every page; `[[wikilink]]` discipline restoring connections to existing concept pages (controlling-idea, crisis, story-climax, dilemma, idea-vs-counter-idea, negation-of-the-negation, key-image, image-systems, principle-of-antagonism, false-ending, inevitable-and-unexpected, mixing-genres, melodrama, coincidence); `author: claude`; `importance: 3` (case studies — usable but project-specific, below `a-writers-method` at 4); `canonical_chapter: 6` for the Idea page and `13` for the Crisis-Climax page. Both pages cross-link to each other and to `chapter-06-structure-and-meaning` / `chapter-13-crisis-climax-resolution` / `chapter-14-the-principle-of-antagonism`. MAP regeneration pending.


# Wiki Log

## [2026-04-05] setup | Project initialized
- Scaffolded directory structure
- Created CLAUDE.md schema
- Created index.md and log.md
- Wiki is ready for first source ingest

## [2026-04-05] restructure | Added bilingual support
- Restructured wiki/ into wiki/en/ and wiki/zh/ parallel directories
- All page templates now support bilingual generation
- Cross-language links added between index pages

## [2026-04-07] ingest | Chapter 1: The Story Problem
- Source: `sources/book/1THE_STORY_PROBLEM.md`, `sources/book/ch1-note.md`
- Pages created:
  - `chapters/chapter-01-the-story-problem.md` (en + zh)
  - `concepts/story-as-metaphor.md` (en + zh)
  - `concepts/story-values.md` (en + zh)
  - `concepts/story-form.md` (en + zh)
  - `principles/no-scene-that-doesnt-turn.md` (en + zh)
  - `principles/tell-story.md` (en + zh)
  - `principles/craft-maximizes-talent.md` (en + zh)
  - `comparisons/literary-talent-vs-story-talent.md` (en + zh)
- Contradictions flagged: none
- Notes: Initial ingest. Established core concepts of story imperative, the decline of craft, and the relationship between talent and technique.

## [2026-04-07] ingest | Chapter 2: The Structure Spectrum
- Source: `sources/book/2THE_STRUCTURE_SPECTRUM.md`, `sources/book/ch2-note.md`
- Pages created:
  - `chapters/chapter-02-the-structure-spectrum.md` (en + zh)
  - `concepts/structure.md` (en + zh)
  - `concepts/story-event.md` (en + zh)
  - `concepts/the-story-triangle.md` (en + zh)
  - `structures/beat.md` (en + zh)
  - `structures/scene.md` (en + zh)
  - `structures/sequence.md` (en + zh)
  - `structures/act.md` (en + zh)
  - `structures/story-climax.md` (en + zh)
  - `structures/archplot.md` (en + zh)
  - `structures/miniplot.md` (en + zh)
  - `structures/antiplot.md` (en + zh)
  - `principles/master-classical-form.md` (en + zh)
  - `entities/tender-mercies.md` (en + zh)
  - `comparisons/archplot-vs-miniplot-vs-antiplot.md` (en + zh)
- Contradictions flagged: none
- Notes: Established the full story hierarchy (beat → scene → sequence → act → story climax) and the Story Triangle framework (archplot/miniplot/antiplot). Heavy structural chapter with many interconnected pages.

## [2026-04-09] ingest | Chapter 3: Structure and Setting
- Source: `sources/book/3STRUCTURE_AND_SETTING.md`, `sources/book/ch3-note.md`
- Pages created:
  - `chapters/chapter-03-structure-and-setting.md` (en + zh)
  - `concepts/setting.md` (en + zh)
  - `concepts/creative-limitation.md` (en + zh)
  - `concepts/research.md` (en + zh)
  - `concepts/creative-choices.md` (en + zh)
  - `principles/war-on-cliche.md` (en + zh)
  - `principles/story-obeys-its-world.md` (en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: Core chapter on the relationship between structure and setting. Introduces the war on cliché, the four dimensions of setting, the Principle of Creative Limitation, three modes of research, and the discipline of creative choices (overproduction + selection). Creative Limitation bridges into Chapter 4.

## [2026-04-09] ingest | Chapter 4: Structure and Genre
- Source: `sources/book/4STRUCTURE_AND_GENRE.md`, `sources/book/ch4-note.md`
- Pages created:
  - `chapters/chapter-04-structure-and-genre.md` (en + zh)
  - `concepts/genre.md` (en + zh)
  - `concepts/genre-conventions.md` (en + zh)
  - `concepts/mixing-genres.md` (en + zh)
  - `principles/master-your-genre.md` (en + zh)
  - `entities/chinatown.md` (en + zh)
  - `comparisons/convention-vs-cliche.md` (en + zh)
- Pages updated:
  - `concepts/creative-limitation.md` (en + zh) — extended with Chapter 4 genre context
- Contradictions flagged: none
- Notes: Comprehensive genre chapter.

## [2026-04-09] ingest | Personal Notes (Chapters 1–4)
- Source: `sources/book/ch1-note.md`, `sources/book/ch2-note.md`, `sources/book/ch3-note.md`, `sources/book/ch4-note.md`
- Pages created:
  - `notes/chapter-01-notes.md` (en + zh)
  - `notes/chapter-02-notes.md` (en + zh)
  - `notes/chapter-03-notes.md` (en + zh)
  - `notes/chapter-04-notes.md` (en + zh)
- Notes: Converted all four ch*-note.md source files into bilingual wiki note pages. Chinese originals preserved with English translations. Key reflections include the computational analogy for story events (Ch.2), the RAM/hard-drive metaphor for writing things down (Ch.3), and the insight that knowing ≠ doing (Ch.4). Catalogs 25 film genres, defines genre conventions as creative limitations, traces genre evolution (Western, Psycho-Drama, Love Story), and establishes Chinatown as the central example of genre mastery and reinvention. Key distinction: convention ≠ cliché.

## [2026-04-10] ingest | Chapter 5: Structure and Character
- Source: `sources/book/5STRUCTURE_AND_CHARACTER.md`
- Pages created:
  - `chapters/chapter-05-structure-and-character.md` (en + zh)
  - `characters/characterization-vs-true-character.md` (en + zh)
  - `characters/character-arc.md` (en + zh)
  - `characters/character-revelation.md` (en + zh)
  - `principles/structure-is-character.md` (en + zh)
  - `entities/the-verdict.md` (en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: Resolves the plot-vs-character debate. Introduces the characterization/true-character distinction, character arc (five-step pattern), and character revelation. The Verdict serves as the primary example of a full character arc from self-destruction to redemption.

## [2026-04-10] ingest | Chapter 6: Structure and Meaning
- Source: `sources/book/6STRUCTURE_AND_MEANING.md`
- Pages created:
  - `chapters/chapter-06-structure-and-meaning.md` (en + zh)
  - `concepts/aesthetic-emotion.md` (en + zh)
  - `concepts/premise.md` (en + zh)
  - `concepts/controlling-idea.md` (en + zh)
  - `concepts/idea-vs-counter-idea.md` (en + zh)
  - `principles/dramatize-dont-explain.md` (en + zh)
  - `principles/tell-the-truth.md` (en + zh)
  - `comparisons/idealist-vs-pessimist-vs-ironist.md` (en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: Completes Part One of the book. Introduces aesthetic emotion as the fusion of thought and feeling, the premise/controlling-idea distinction, and the dialectical engine of idea vs. counter-idea. Three authorial visions (idealist/pessimist/ironist) mapped to ending types.

## [2026-04-10] ingest | Personal Notes (Chapters 5–6)
- Source: `sources/book/ch5-note.md`, `sources/book/ch6-note.md`
- Pages created:
  - `notes/chapter-05-notes.md` (en + zh)
  - `notes/chapter-06-notes.md` (en + zh)
- Notes: Ch.5 reflections on choices under pressure and film as temporal art. Ch.6 reflections on aesthetic emotion, story as proof/argument, show-don't-tell as meaning principle, controlling idea components, and self-recognition through writing.

## [2026-04-10] synthesis | Overview Page Generated
- Pages created:
  - `overview.md` (en + zh)
- Notes: High-level synthesis of McKee's framework across Chapters 1–6. Maps the arc from diagnosis (Ch.1) through toolkit (Ch.2), world (Ch.3), contract (Ch.4), engine (Ch.5), to destination (Ch.6). Identifies the emerging layered model and five key tensions in the framework.

## [2026-04-11] schema | Concept Relationship Diagrams Required
- Files updated: `CLAUDE.md`
- Notes: Added Critical Rule #7 and a new "Concept Relationship Diagrams" section that requires every concept, structure, principle, chapter-summary, comparison, and overview page to include a Mermaid diagram. Documented node-shape conventions, edge labeling, bilingual topology rule, and lint checks for missing/drifted/mismatched diagrams.

## [2026-04-11] enrich | Diagrams Added Across All Existing Pages
- Pages updated:
  - All 17 EN concept pages and their 17 ZH counterparts (`concepts/*.md`)
  - All 8 EN structure pages and their 8 ZH counterparts (`structures/*.md`)
  - All 10 EN principle pages and their 10 ZH counterparts (`principles/*.md`)
  - All 6 EN chapter summary pages and their 6 ZH counterparts (`chapters/chapter-0[1-6]-*.md`)
  - `overview.md` (en + zh) — added master concept map bridging Chapters 1–6
- Pages created: none
- Contradictions flagged: none
- Notes: Backfilled Mermaid concept-relationship diagrams across the entire wiki to comply with the new CLAUDE.md requirement. Each diagram uses the prescribed node shapes (rectangle=concept, double-rectangle=structure, hexagon=taxonomy, stadium=principle, circle=value/abstract). EN/ZH versions share identical graph topology with translated labels. Total: 122 page edits (61 in each language tree).

## [2026-04-15] ingest | Chapter 7 — The Substance of Story
- Source: `sources/book/7THE_SUBSTANCE_OF_STORY.md`
- Pages created: `chapters/chapter-07-the-substance-of-story.md`, `concepts/the-gap.md`, `concepts/risk.md`, `concepts/action-vs-activity.md`, `concepts/levels-of-conflict.md`, `concepts/minimum-conservative-action.md`, `characters/protagonist.md`, `principles/writing-from-the-inside-out.md`
- Pages updated: `entities/chinatown.md` (Act Two climax added as the anchoring example of The Gap and backstory weight)
- Contradictions flagged: none
- Notes: The Gap is established as the generative unit of story — every action opens it, every complication widens it. Protagonist promoted to its own page; the four tests (willpower, conscious/unconscious desire, capacity, empathy) are now a dedicated reference.

## [2026-04-15] ingest | Chapter 8 — The Inciting Incident
- Source: `sources/book/8THE_INCITING_INCIDENT.md`
- Pages created: `chapters/chapter-08-the-inciting-incident.md`, `concepts/inciting-incident.md`, `concepts/spine.md`, `concepts/object-of-desire.md`, `concepts/the-quest.md`, `concepts/major-dramatic-question.md`, `concepts/obligatory-scene.md`, `concepts/foreshadowing.md`, `concepts/authenticity.md`, `concepts/cast-design.md`, `concepts/backstory.md`, `entities/kramer-vs-kramer.md`, `entities/jaws.md`, `entities/rocky.md`, `entities/ordinary-people.md`
- Pages updated: none beyond Ch.7 entity updates
- Contradictions flagged: none
- Notes: Ch.8 installs the machinery that converts a premise into an engine: inciting incident → object of desire → spine → MDQ → obligatory scene. Cast Design and Authenticity are the habitat. Foreshadowing emerges as the setup/payoff infrastructure.

## [2026-04-15] ingest | Chapter 9 — Act Design
- Source: `sources/book/9ACT_DESIGN.md`
- Pages created: `chapters/chapter-09-act-design.md`, `concepts/progressive-complications.md`, `concepts/points-of-no-return.md`, `concepts/false-ending.md`, `concepts/act-rhythm.md`, `structures/subplot.md`, `principles/law-of-conflict.md`, `comparisons/complication-vs-complexity.md`, `entities/casablanca.md`
- Pages updated: `wiki/en/index.md`, `wiki/zh/index.md` (Ch.7–9 chapters and all new pages linked)
- Contradictions flagged: none
- Notes: Ch.9 formalizes the macro shape — rhythm of act climaxes, the four legitimate subplot uses, complication vs. complexity, and the Law of Conflict as the animating physics. The false-ending device closes the discussion.

## [2026-04-17] ingest | Chapters 10–13
- Source: `sources/book/10SCENE_DESIGN.md`, `sources/book/11SCENE_ANALYSIS.md`, `sources/book/12COMPOSITION.md`, `sources/book/13CRISIS_CLIMAX_RESOLUTION.md`
- Pages created: `chapters/chapter-10-scene-design.md`, `chapters/chapter-11-scene-analysis.md`, `chapters/chapter-12-composition.md`, `chapters/chapter-13-crisis-climax-resolution.md`, `concepts/turning-point.md`, `concepts/scene-objective.md`, `concepts/setup-and-payoff.md`, `concepts/text-and-subtext.md`, `concepts/crisis.md`, `concepts/dilemma.md`, `concepts/key-image.md`, `concepts/resolution.md`, `concepts/unity-and-variety.md`, `concepts/pacing.md`, `concepts/symbolic-ascension.md`, `concepts/principle-of-transition.md`, `principles/meaning-produces-emotion.md`, `principles/inevitable-and-unexpected.md`, `entities/trading-places.md`, `entities/wall-street.md`, `entities/star-wars.md`, `entities/the-empire-strikes-back.md`, `entities/thelma-louise.md`, `entities/the-deer-hunter.md`, `entities/sullivan-travels.md`, `entities/the-terminator.md` (all en + zh)
- Pages updated: `overview.md`, `index.md`, `log.md`, `structures/scene.md`, `structures/beat.md`, `structures/story-climax.md`, `concepts/obligatory-scene.md`, `concepts/foreshadowing.md`, `principles/no-scene-that-doesnt-turn.md`, `characters/protagonist.md`, `characters/character-arc.md` (all en + zh)
- Contradictions flagged: none
- Notes: Chapters 10–13 complete the movement from macro-structure to scene craft and endings. The wiki now covers scene objectives, turning points, subtext, composition, crisis design, and the principle that meaning — not spectacle — generates emotion.

## [2026-04-22] ingest | Chapter 14 — The Principle of Antagonism
- Source: `sources/book/14THE_PRINCIPLE_OF_ANTAGONISM.md`
- Pages created: `chapters/chapter-14-the-principle-of-antagonism.md`, `principles/principle-of-antagonism.md`, `concepts/forces-of-antagonism.md`, `concepts/value-progression.md`, `concepts/negation-of-the-negation.md` (all en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: Installs the four-stage value progression (Positive → Contrary → Contradictory → Negation of the Negation) as the diagnostic of negative-side power. Chapter 14 is the book's hinge — every prior craft element has its ceiling set by antagonism.

## [2026-04-22] ingest | Chapter 15 — Exposition
- Source: `sources/book/15EXPOSITION.md`
- Pages created: `chapters/chapter-15-exposition.md`, `concepts/exposition.md`, `concepts/exposition-as-ammunition.md`, `concepts/flashback.md` (all en + zh)
- Pages updated: `concepts/backstory.md`, `concepts/foreshadowing.md` (cross-linked to exposition machinery)
- Contradictions flagged: none
- Notes: Reframes information as ammunition — rationed and detonated, not dumped. Flashback is admitted only when the present scene cannot carry the load.

## [2026-04-22] ingest | Chapter 16 — Problems and Solutions
- Source: `sources/book/16PROBLEMS_AND_SOLUTIONS.md`
- Pages created: `chapters/chapter-16-problems-and-solutions.md`, `concepts/center-of-good.md`, `concepts/surprise.md`, `concepts/coincidence.md`, `concepts/hole.md`, `concepts/point-of-view.md`, `concepts/adaptation.md`, `concepts/melodrama.md`, `concepts/comic-design.md`, `comparisons/mystery-suspense-dramatic-irony.md` (all en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: Catalogs the recurring craft failures and their corrections. The mystery/suspense/dramatic-irony comparison page makes the audience-knowledge axis explicit.

## [2026-04-22] ingest | Chapter 17 — Character
- Source: `sources/book/17CHARACTER.md`
- Pages created: `chapters/chapter-17-character.md`, `concepts/mind-worm.md`, `characters/character-dimension.md`, `concepts/comic-character.md` (all en + zh)
- Pages updated: `characters/characterization-vs-true-character.md`, `concepts/cast-design.md` (deepened with dimension and polarized-cast logic)
- Contradictions flagged: none
- Notes: Character built as a system: empathy seed (mind-worm) + consistent contradiction (dimension) + polarized cast.

## [2026-04-22] ingest | Chapter 18 — The Text
- Source: `sources/book/18THE_TEXT.md`
- Pages created: `chapters/chapter-18-the-text.md`, `concepts/dialogue.md`, `concepts/description.md`, `concepts/image-systems.md`, `concepts/suspense-sentence.md`, `principles/silent-screenplay.md` (all en + zh)
- Pages updated: none
- Contradictions flagged: none
- Notes: The text is the *last* layer. Image systems, suspense sentences, and the silent-screenplay test are now first-class wiki citizens.

## [2026-04-22] ingest | Chapter 19 — A Writer's Method
- Source: `sources/book/19A_WRITER_S_METHOD.md`
- Pages created: `chapters/chapter-19-a-writers-method.md`, `application/a-writers-method.md`, `application/step-outline.md`, `application/treatment.md` (all en + zh)
- Pages updated: `principles/writing-from-the-inside-out.md` (extended with Chapter 19 project-scale operationalization, both en + zh)
- Contradictions flagged: none
- Notes: First entries in the `application/` directory. The inside-out workflow (idea → step-outline → pitch → treatment → screenplay) is now a navigable how-to.

## [2026-04-29] ingest | Personal Notes (Chapters 7, 10, 11, 15, 18)
- Source: `sources/book/ch7-note.md`, `sources/book/ch10-note.md`, `sources/book/ch11-note.md`, `sources/book/ch15-note.md`, `sources/book/ch18-note.md`
- Pages created: `notes/chapter-15-notes.md`, `notes/chapter-18-notes.md` (en + zh)
- Pages updated: previously created `notes/chapter-07-notes.md`, `notes/chapter-10-notes.md`, `notes/chapter-11-notes.md` retained
- Notes: Ch.14 and Ch.16 source notes are empty and were skipped. Ch.15 note distills McKee's *JFK* exercise; Ch.18 note distills the "specific = vivid" verb principle.

## [2026-04-29] ingest | Supplementary — Emotion, Feeling, and Mood
- Source: `sources/supplementary/Emotion, feeling, and mood in screenwriting.html`
- Pages created: `comparisons/emotion-feeling-mood.md`, `concepts/law-of-diminishing-returns.md` (en + zh)
- Pages updated: `index.md` (en + zh)
- Contradictions flagged: none
- Notes: Synthesizes McKee's three-layer framework (emotion = transition; feeling = inner climate; mood = cinematic incarnation) and formalizes the Law of Diminishing Returns as a first-class concept. Cross-linked with `aesthetic-emotion`, `meaning-produces-emotion`, `image-systems`, `melodrama`, `act-rhythm`.

## [2026-04-29] sync | Indexes + Overview Updated to Chapters 1–19
- Pages updated: `index.md`, `overview.md` (en + zh)
- Notes: Added chapters 14–19, all newly created concepts (forces-of-antagonism, value-progression, negation-of-the-negation, exposition, exposition-as-ammunition, flashback, center-of-good, surprise, coincidence, hole, mind-worm, point-of-view, adaptation, melodrama, comic-design, comic-character, image-systems, suspense-sentence, dialogue, description, law-of-diminishing-returns), principles (principle-of-antagonism, silent-screenplay), characters (character-dimension), comparisons (mystery-suspense-dramatic-irony, emotion-feeling-mood), and application pages (a-writers-method, step-outline, treatment) to both indexes. Overview rewritten to cover the full Ch.1–19 arc with an updated master concept map showing all four parts of the book.

## [2026-04-29] schema | Agent-Memory Upgrade (Karpathy → hybrid)
- Files created: `wiki/CANONICAL.md` (bilingual policy: terminology, canonical-chapter rules, conflict resolution, authorship boundary, field glossary), `scripts/update_frontmatter.py`, `scripts/atomize_quotes.py`, `scripts/regen_map.py`, `wiki/en/MAP.md`, `wiki/zh/MAP.md`
- Pages updated: `CLAUDE.md` (added rules 8–10, MAP/quotes structure, new schema fields, INGEST/QUERY/LINT updates), 313 wiki pages (frontmatter: importance, canonical_chapter, last_verified, author), `wiki/en/index.md` + `wiki/zh/index.md` (linked MAP and CANONICAL)
- Pages created (atomized): 68 EN quote atoms in `wiki/en/quotes/q-chNN-NN.md` and 68 ZH counterparts (some carry `<!-- TODO: 添加中文译文 -->` where the chapter page lacked a Chinese translation)
- Contradictions flagged: none
- Notes: Translates the optimizations from the Mercury / second-brain critique into this project. Markdown remains the substrate (humans read it); MAP.md + structured frontmatter become the agent accelerant. Importance scoring (5 = foundational, 1 = minor; 23 pages at 5, 56 at 4, 134 at 3, 11 at 2) lets QUERY weight retrieval. `canonical_chapter` resolves where each concept's authoritative definition lives. `last_verified` separates "edited" from "cross-checked against source." `author: user` on all `notes/` pages encodes the rule that Claude never silently rewrites the user's reflections. Quote atomization (68 atoms × 2 languages) makes McKee's claims individually retrievable. Generation scripts under `scripts/` are deterministic; rerun on every INGEST that changes structure.

## [2026-04-30] lint | Resolve Web App Validation Warnings
- Source: `wiki/` validator in `lib/wiki-core.js`
- Pages created: none
- Pages updated: `chapters/chapter-08-the-inciting-incident.md`, `chapters/chapter-11-scene-analysis.md`, `comparisons/idealist-vs-pessimist-vs-ironist.md`, `structures/beat.md`, `structures/scene.md`, `structures/story-climax.md`, `overview.md`, `index.md`, `MAP.md` (en + zh where applicable)
- Contradictions flagged: none
- Notes: Resolved the remaining 14 web app warnings: one dead wikilink, two missing `canonical_chapter` fields, and EN/ZH Mermaid topology drift. Regenerated both MAP files after the schema-affecting overview update.
