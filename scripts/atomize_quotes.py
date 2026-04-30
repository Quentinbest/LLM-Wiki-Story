#!/usr/bin/env python3
"""Atomize Notable Quotes from chapter pages into wiki/{en,zh}/quotes/.

For each EN chapter page, extract bullets under "## Notable Quotes" and create
one atom per quote. For each ZH chapter page, extract bullets under "## 重要引文",
collapsing "原文/译文" pairs and naked-English+译文 pairs. Match by index.
Missing ZH translations get a TODO marker with the English original.
"""
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "wiki"
EN_QUOTES = ROOT / "en" / "quotes"
ZH_QUOTES = ROOT / "zh" / "quotes"

TODAY = date.today().isoformat()

EN_QUOTES.mkdir(parents=True, exist_ok=True)
ZH_QUOTES.mkdir(parents=True, exist_ok=True)


def extract_section(text, header):
    """Extract bullet lines under a section header."""
    pattern = rf"^{re.escape(header)}\s*\n(.*?)(?=^## |\Z)"
    m = re.search(pattern, text, re.DOTALL | re.MULTILINE)
    if not m:
        return []
    bullets = [line.strip() for line in m.group(1).splitlines() if line.strip().startswith("- ")]
    return bullets


def clean_bullet(bullet):
    """Strip leading '- ' and surrounding whitespace."""
    return re.sub(r"^-\s+", "", bullet).strip()


def extract_en_quote(bullet):
    """From an English chapter quote bullet, return (quote_text, attribution).

    Patterns:
      - "Quote text." (Ch. 4)
      - "Quote text." — Author
      - "Quote text." (Author, via McKee)
      - "Quote text."
    """
    text = clean_bullet(bullet)
    # Strip trailing chapter-citation parens like "(Ch. 4)"
    text = re.sub(r"\s*\(Ch\.?\s*\d+\)\s*$", "", text)

    # Look for trailing attribution: "..." — Author or "..." (Author...)
    # Find the closing quote of the main quote
    m = re.match(r'^"(.*?)"\s*(.*)$', text)
    if m:
        quote = m.group(1)
        rest = m.group(2).strip()
        attribution = ""
        if rest.startswith("—") or rest.startswith("--"):
            attribution = rest.lstrip("—-").strip()
        elif rest.startswith("("):
            inner = re.match(r"^\((.*)\)$", rest)
            if inner:
                attribution = inner.group(1).strip()
        return quote, attribution

    # Bullet without leading quote — treat the whole thing as quote
    return text, ""


def parse_zh_quotes(zh_bullets):
    """Walk ZH bullets, collapse 原文/译文 pairs and English-source pairs.

    Returns a list of Chinese quote strings (or empty string if missing).
    """
    quotes = []
    i = 0
    while i < len(zh_bullets):
        text = clean_bullet(zh_bullets[i])
        # Pattern: 原文："..." → followed by 译文："..."
        if text.startswith("原文"):
            # Look for the next 译文 line
            j = i + 1
            while j < len(zh_bullets):
                next_text = clean_bullet(zh_bullets[j])
                if next_text.startswith("译文"):
                    quotes.append(extract_zh_translation(next_text))
                    i = j + 1
                    break
                j += 1
            else:
                # No 译文 found — store empty
                quotes.append("")
                i += 1
            continue
        # Pattern: pure English in quotes → followed by 译文 line
        if re.match(r'^"[A-Za-z]', text):
            j = i + 1
            if j < len(zh_bullets):
                next_text = clean_bullet(zh_bullets[j])
                if next_text.startswith("译文"):
                    quotes.append(extract_zh_translation(next_text))
                    i = j + 1
                    continue
            # No paired translation — store empty
            quotes.append("")
            i += 1
            continue
        # Pattern: 译文 line standing alone (rare) → use directly
        if text.startswith("译文"):
            quotes.append(extract_zh_translation(text))
            i += 1
            continue
        # Pattern: pure Chinese line (most common) → use as-is
        # Strip a leading "X语（麦基转引）" or attribution prefix into the quote
        quotes.append(strip_zh_attribution_prefix(text))
        i += 1
    return quotes


def extract_zh_translation(text):
    """From '译文："..."' or '译文：...' return the inner text."""
    text = re.sub(r"^译文[:：]?\s*", "", text)
    m = re.match(r'^"(.*)"$', text)
    if m:
        return m.group(1)
    return text.strip()


def strip_zh_attribution_prefix(text):
    """For 'X语（麦基转引）："..."' patterns, return the quote part."""
    m = re.match(r'^.+?[:：]\s*"(.*?)"\s*(.*)$', text)
    if m:
        return m.group(1) + (f" — {m.group(2)}" if m.group(2) else "")
    m2 = re.match(r'^"(.*?)"\s*(.*)$', text)
    if m2:
        quote = m2.group(1)
        rest = m2.group(2).strip()
        if rest.startswith("——"):
            return f"{quote} —— {rest.lstrip('—').strip()}"
        return quote
    return text


def chapter_slug_from_path(chapter_file):
    """chapter-07-the-substance-of-story.md → 07"""
    m = re.match(r"chapter-(\d+)-", chapter_file.name)
    return m.group(1) if m else None


def chapter_link_target(chapter_file):
    """chapter-07-the-substance-of-story.md → chapter-07-the-substance-of-story"""
    return chapter_file.stem


def write_en_quote(num_str, ch_num, chapter_link, quote, attribution):
    """Write an EN quote atom file."""
    importance = 4 if "characteriz" in quote.lower() or "story is born" in quote.lower() else 3
    fname = f"q-ch{int(ch_num):02d}-{num_str}.md"
    path = EN_QUOTES / fname
    title_excerpt = quote[:60].rstrip()
    if len(quote) > 60:
        title_excerpt += "..."
    body = f'''---
title: "Q ch.{int(ch_num)}-{int(num_str)}: {title_excerpt}"
type: quote
lang: en
chapter: {int(ch_num)}
canonical_chapter: {int(ch_num)}
attribution: "{attribution}"
last_updated: {TODAY}
last_verified: {TODAY}
author: claude
importance: {importance}
tags:
  - quote
  - chapter-{int(ch_num)}
---

# Q ch.{int(ch_num)}-{int(num_str)}

> 中文版：[[wiki/zh/quotes/q-ch{int(ch_num):02d}-{num_str}|中文]]

> "{quote}"
'''
    if attribution:
        body += f"> — {attribution}\n"
    else:
        body += f"> — Robert McKee, *Story*, Chapter {int(ch_num)}\n"
    body += f"\n**Anchored in:** [[{chapter_link}]]\n"
    path.write_text(body, encoding="utf-8")
    return fname


def write_zh_quote(num_str, ch_num, chapter_link, quote_zh, fallback_en):
    """Write a ZH quote atom file. If quote_zh is empty, fall back to English with TODO."""
    fname = f"q-ch{int(ch_num):02d}-{num_str}.md"
    path = ZH_QUOTES / fname
    if quote_zh:
        title_excerpt = quote_zh[:30].rstrip()
        if len(quote_zh) > 30:
            title_excerpt += "..."
        body_quote = f'> "{quote_zh}"\n> ——罗伯特·麦基《故事》第{int(ch_num)}章\n'
    else:
        title_excerpt = fallback_en[:30].rstrip()
        if len(fallback_en) > 30:
            title_excerpt += "..."
        body_quote = f'> "{fallback_en}"\n> ——罗伯特·麦基《故事》第{int(ch_num)}章\n\n<!-- TODO: 添加中文译文 -->\n'

    importance = 3
    body = f'''---
title: "引文 ch.{int(ch_num)}-{int(num_str)}: {title_excerpt}"
type: quote
lang: zh
chapter: {int(ch_num)}
canonical_chapter: {int(ch_num)}
last_updated: {TODAY}
last_verified: {TODAY}
author: claude
importance: {importance}
tags:
  - quote
  - chapter-{int(ch_num)}
---

# 引文 ch.{int(ch_num)}-{int(num_str)}

> English: [[wiki/en/quotes/q-ch{int(ch_num):02d}-{num_str}|English]]

{body_quote}
**锚定章节：** [[{chapter_link}]]
'''
    path.write_text(body, encoding="utf-8")
    return fname


def main():
    en_chapters_dir = ROOT / "en" / "chapters"
    zh_chapters_dir = ROOT / "zh" / "chapters"
    total_en = 0
    total_zh = 0

    for en_chapter_file in sorted(en_chapters_dir.glob("chapter-*.md")):
        ch_num = chapter_slug_from_path(en_chapter_file)
        if ch_num is None:
            continue
        zh_chapter_file = zh_chapters_dir / en_chapter_file.name
        en_text = en_chapter_file.read_text(encoding="utf-8")
        zh_text = zh_chapter_file.read_text(encoding="utf-8") if zh_chapter_file.exists() else ""

        en_bullets = extract_section(en_text, "## Notable Quotes")
        zh_bullets = extract_section(zh_text, "## 重要引文")

        zh_quotes = parse_zh_quotes(zh_bullets)
        chapter_link = chapter_link_target(en_chapter_file)

        for idx, en_bullet in enumerate(en_bullets, start=1):
            en_quote, attribution = extract_en_quote(en_bullet)
            num_str = f"{idx:02d}"
            zh_q = zh_quotes[idx - 1] if idx - 1 < len(zh_quotes) else ""
            write_en_quote(num_str, ch_num, chapter_link, en_quote, attribution)
            write_zh_quote(num_str, ch_num, chapter_link, zh_q, en_quote)
            total_en += 1
            total_zh += 1

    print(f"EN quote atoms written: {total_en}")
    print(f"ZH quote atoms written: {total_zh}")


if __name__ == "__main__":
    main()
