#!/usr/bin/env python3
"""One-off patch: add canonical_chapter to a small list of comparison pages
that lack chapter_refs and were missed by the bulk update."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "wiki"

PATCHES = {
    "archplot-vs-miniplot-vs-antiplot": 2,
    "complication-vs-complexity": 9,
    "convention-vs-cliche": 3,
    "idealist-vs-pessimist-vs-ironist": 6,
    "literary-talent-vs-story-talent": 1,
}


def patch(path, ch):
    text = path.read_text(encoding="utf-8")
    if "\ncanonical_chapter:" in text or text.startswith("canonical_chapter:"):
        return False
    m = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not m:
        return False
    fm = m.group(1)
    new_fm = fm + f"canonical_chapter: {ch}\n"
    new_text = text[: m.start(1)] + new_fm + text[m.end(1):]
    path.write_text(new_text, encoding="utf-8")
    return True


def main():
    patched = 0
    for slug, ch in PATCHES.items():
        for lang in ("en", "zh"):
            p = ROOT / lang / "comparisons" / f"{slug}.md"
            if p.exists() and patch(p, ch):
                patched += 1
                print(f"Patched: {p.relative_to(ROOT)}")
    print(f"Total patched: {patched}")


if __name__ == "__main__":
    main()
