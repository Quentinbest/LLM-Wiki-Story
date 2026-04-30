#!/usr/bin/env python3
"""Bulk-update wiki page frontmatter to add the four new fields:
   importance, canonical_chapter, last_verified, author.

Idempotent: only adds fields that are missing. Preserves existing formatting.
"""
import re
import sys
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent / "wiki"

# Foundational concepts McKee returns to repeatedly — bumped to importance 5.
IMPORTANCE_5 = {
    # Core spine of the book
    "the-gap", "structure", "story-event", "controlling-idea", "turning-point",
    # Story hierarchy
    "scene", "beat", "act", "story-climax",
    # Antagonism (Ch.14 hinge)
    "principle-of-antagonism", "forces-of-antagonism", "value-progression",
    # Character (Ch.5/17 spine)
    "character-arc", "characterization-vs-true-character", "protagonist",
    # Launch + pursuit
    "inciting-incident", "spine", "progressive-complications", "crisis",
    # Master rules
    "no-scene-that-doesnt-turn", "meaning-produces-emotion", "aesthetic-emotion",
}

# Major secondary concepts — bumped to 4.
IMPORTANCE_4_OVERRIDES = {
    "text-and-subtext", "scene-objective", "dilemma", "resolution", "key-image",
    "idea-vs-counter-idea", "premise", "exposition", "exposition-as-ammunition",
    "mind-worm", "image-systems", "dialogue", "subplot", "sequence",
    "archplot", "miniplot", "antiplot", "the-story-triangle", "setting",
    "genre", "character-dimension", "character-revelation",
    "the-quest", "major-dramatic-question", "obligatory-scene",
    "foreshadowing", "backstory", "levels-of-conflict",
    "negation-of-the-negation", "story-form", "story-as-metaphor",
    "law-of-diminishing-returns",
}

# Defaults by type when no override applies.
DEFAULT_BY_TYPE = {
    "chapter-summary": 3,
    "principle": 4,
    "structure": 4,
    "comparison": 4,
    "application": 4,
    "character": 3,
    "entity": 3,
    "concept": 3,
    "genre": 3,
    "note": 2,
    "quote": 2,
    "overview": 5,
}

SKIP_FILES = {"index.md", "log.md", "MAP.md"}


def parse_frontmatter(text):
    """Return (fm_dict, fm_text_start, fm_text_end) or (None, None, None)."""
    m = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not m:
        return None, None, None
    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as e:
        print(f"  YAML error: {e}", file=sys.stderr)
        return None, None, None
    return fm, m.start(1), m.end(1)


def importance_for(slug, type_):
    if slug in IMPORTANCE_5:
        return 5
    if slug in IMPORTANCE_4_OVERRIDES:
        return 4
    return DEFAULT_BY_TYPE.get(type_)


def canonical_chapter_for(fm):
    if "canonical_chapter" in fm:
        return None  # already set
    if fm.get("chapter") is not None:
        return fm["chapter"]
    refs = fm.get("chapter_refs") or []
    if refs:
        return refs[0]
    refs2 = fm.get("chapters_referenced_in") or []
    if refs2:
        return refs2[0]
    return None  # leave unset


def author_for(file_path):
    return "user" if "/notes/" in str(file_path).replace("\\", "/") else "claude"


def fmt_date(value):
    if isinstance(value, date):
        return value.isoformat()
    return str(value)


def update_file(path):
    text = path.read_text(encoding="utf-8")
    fm, fm_start, fm_end = parse_frontmatter(text)
    if fm is None:
        return None  # no frontmatter; skip silently

    if fm.get("type") in {"index", "log"}:
        return None

    fm_text = text[fm_start:fm_end]
    additions = []

    if "importance" not in fm:
        imp = importance_for(path.stem, fm.get("type", ""))
        if imp is not None:
            additions.append(f"importance: {imp}")

    if "canonical_chapter" not in fm:
        ch = canonical_chapter_for(fm)
        if ch is not None:
            additions.append(f"canonical_chapter: {ch}")

    if "last_verified" not in fm:
        lu = fm.get("last_updated")
        if lu is not None:
            additions.append(f"last_verified: {fmt_date(lu)}")

    if "author" not in fm:
        additions.append(f"author: {author_for(path)}")

    if not additions:
        return False

    new_fm_text = fm_text + "\n".join(additions) + "\n"
    new_text = text[:fm_start] + new_fm_text + text[fm_end:]
    path.write_text(new_text, encoding="utf-8")
    return True


def main():
    updated = 0
    skipped = 0
    no_change = 0
    for path in sorted(ROOT.rglob("*.md")):
        if path.name in SKIP_FILES:
            continue
        result = update_file(path)
        if result is True:
            updated += 1
        elif result is False:
            no_change += 1
        else:
            skipped += 1
    print(f"Updated: {updated}")
    print(f"No change (already had all fields): {no_change}")
    print(f"Skipped (no frontmatter or excluded): {skipped}")


if __name__ == "__main__":
    main()
