---
title: Wiki Log
type: log
lang: en
---

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
