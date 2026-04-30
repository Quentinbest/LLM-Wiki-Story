#!/usr/bin/env python3
"""Regenerate wiki/{en,zh}/MAP.md — the agent-facing slim manifest.

One row per page (excluding index, log, MAP itself), sorted by:
  1. importance descending
  2. canonical_chapter ascending (None last)
  3. type
  4. path

Each row: | Imp | Type | Ch | Path | Title |
"""
import re
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent / "wiki"
TODAY = date.today().isoformat()

SKIP = {"index.md", "log.md", "MAP.md"}


def parse_frontmatter(text):
    m = re.match(r"^---\n(.*?\n)---\n", text, re.DOTALL)
    if not m:
        return None
    try:
        return yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return None


def collect(lang_dir):
    rows = []
    for p in lang_dir.rglob("*.md"):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        fm = parse_frontmatter(text)
        if fm is None:
            continue
        if fm.get("type") in {"index", "log"}:
            continue
        rel = p.relative_to(lang_dir).as_posix()
        rows.append({
            "path": rel,
            "stem": p.stem,
            "type": fm.get("type", "?"),
            "importance": fm.get("importance"),
            "canonical_chapter": fm.get("canonical_chapter"),
            "last_updated": str(fm.get("last_updated", "")),
            "last_verified": str(fm.get("last_verified", "")),
            "author": fm.get("author", "?"),
            "title": fm.get("title", p.stem),
        })
    # Sort: importance desc (None last), chapter asc (None last), type, path
    rows.sort(key=lambda r: (
        -(r["importance"] or 0),
        r["canonical_chapter"] if r["canonical_chapter"] is not None else 999,
        r["type"],
        r["path"],
    ))
    return rows


def render_map(rows, lang):
    is_en = lang == "en"
    if is_en:
        header = f"""---
title: "MAP — Agent-Facing Manifest"
type: index
lang: en
last_updated: {TODAY}
tags:
  - map
  - manifest
---

# MAP — Agent-Facing Manifest

> 中文版：[[wiki/zh/MAP|中文]] · Human-facing index: [[index]]

This file lists every wiki page sorted by `importance` for fast triage. **Read MAP first** to identify high-value pages, then deep-load only what you need. The full prose index lives at [[index]].

Total pages: **{len(rows)}**.

| Imp | Type | Ch | Author | Path | Title |
|---|---|---|---|---|---|
"""
    else:
        header = f"""---
title: "MAP — 代理面向清单"
type: index
lang: zh
last_updated: {TODAY}
tags:
  - map
  - manifest
---

# MAP — 代理面向清单

> English: [[wiki/en/MAP|English]] · 人类面向索引：[[index]]

本文件按 `importance` 排序列出维基中所有页面，便于快速分诊。**先读 MAP** 锁定高价值页面，再按需深加载。完整叙述性索引见 [[index]]。

总页数：**{len(rows)}**。

| 重要度 | 类型 | 章节 | 作者 | 路径 | 标题 |
|---|---|---|---|---|---|
"""

    body_lines = []
    for r in rows:
        imp = r["importance"] if r["importance"] is not None else "-"
        ch = r["canonical_chapter"] if r["canonical_chapter"] is not None else "-"
        path = r["path"]
        # Make the path a clickable wikilink
        link = f"[[{r['stem']}|{path}]]"
        title = r["title"].replace("|", "\\|")
        author = r["author"]
        body_lines.append(f"| {imp} | {r['type']} | {ch} | {author} | {link} | {title} |")

    return header + "\n".join(body_lines) + "\n"


def main():
    for lang in ("en", "zh"):
        lang_dir = ROOT / lang
        rows = collect(lang_dir)
        out = render_map(rows, lang)
        (lang_dir / "MAP.md").write_text(out, encoding="utf-8")
        print(f"{lang}/MAP.md: {len(rows)} pages")


if __name__ == "__main__":
    main()
