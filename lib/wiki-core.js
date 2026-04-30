import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const WIKI_ROOT = path.join(ROOT, "wiki");
const SOURCES_ROOT = path.join(ROOT, "sources");
const LANGS = ["en", "zh"];
const REQUIRED_MERMAID_TYPES = new Set([
  "concept",
  "structure",
  "principle",
  "chapter-summary",
  "comparison",
  "overview"
]);
const SPECIAL_FILES = new Set(["index.md", "log.md", "MAP.md"]);

export function workspacePaths() {
  return {
    root: ROOT,
    wiki: WIKI_ROOT,
    sources: SOURCES_ROOT
  };
}

export async function scanWiki() {
  const pages = [];
  const errors = [];

  for (const lang of LANGS) {
    const langRoot = path.join(WIKI_ROOT, lang);
    const files = await listMarkdown(langRoot);
    for (const file of files) {
      try {
        const absolutePath = path.join(langRoot, file);
        const raw = await fs.readFile(absolutePath, "utf8");
        const stat = await fs.stat(absolutePath);
        const parsed = parseMarkdown(raw);
        pages.push(normalizePage({
          lang,
          relativePath: file,
          absolutePath,
          raw,
          stat,
          ...parsed
        }));
      } catch (error) {
        errors.push({
          lang,
          relativePath: file,
          severity: "error",
          message: error.message
        });
      }
    }
  }

  const summary = summarizePages(pages);
  const validation = validatePages(pages);
  const graph = buildGraph(pages);
  const sources = await scanSources();
  const logs = await readLogs();

  return {
    generatedAt: new Date().toISOString(),
    paths: workspacePaths(),
    summary,
    pages,
    validation: {
      issues: [...errors, ...validation.issues],
      counts: validation.counts
    },
    graph,
    sources,
    logs
  };
}

export async function getPage(lang, relativePath) {
  assertLang(lang);
  const safePath = safeWikiPath(lang, relativePath);
  const raw = await fs.readFile(safePath, "utf8");
  const stat = await fs.stat(safePath);
  const parsed = parseMarkdown(raw);
  return normalizePage({
    lang,
    relativePath: normalizeRelative(relativePath),
    absolutePath: safePath,
    raw,
    stat,
    ...parsed
  });
}

export async function savePage({ lang, relativePath, frontmatter, body, allowUserNoteEdit = false }) {
  assertLang(lang);
  const current = await getPage(lang, relativePath);
  if (current.author?.toLowerCase() === "user" && !allowUserNoteEdit) {
    const err = new Error("Protected user-authored notes require explicit confirmation.");
    err.status = 403;
    throw err;
  }

  const nextFrontmatter = {
    ...current.frontmatter,
    ...frontmatter,
    lang,
    last_updated: today()
  };
  const text = stringifyMarkdown(nextFrontmatter, body ?? current.body);
  await fs.writeFile(current.absolutePath, text, "utf8");
  return getPage(lang, relativePath);
}

export async function searchWiki(query, limit = 80) {
  const trimmed = String(query || "").trim().toLowerCase();
  const data = await scanWiki();
  if (!trimmed) return { query, results: data.pages.slice(0, limit), summary: data.summary };

  const results = data.pages
    .map((page) => ({ page, score: scorePage(page, trimmed), snippet: makeSnippet(page, trimmed) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || (b.page.importance || 0) - (a.page.importance || 0))
    .slice(0, limit)
    .map(({ page, score, snippet }) => ({ ...page, score, snippet }));

  return { query, results, summary: data.summary };
}

export async function runOperation(operation) {
  if (operation === "scan") {
    return scanWiki();
  }
  if (operation === "regen-map") {
    return runScript("scripts/regen_map.py", []);
  }
  if (operation === "atomize-quotes") {
    return runScript("scripts/atomize_quotes.py", []);
  }
  if (operation === "lint") {
    const data = await scanWiki();
    return {
      ok: data.validation.counts.error === 0,
      operation,
      output: `Validation completed with ${data.validation.counts.error} errors, ${data.validation.counts.warning} warnings, and ${data.validation.counts.info} info items.`,
      issues: data.validation.issues
    };
  }
  const err = new Error(`Unsupported operation: ${operation}`);
  err.status = 400;
  throw err;
}

async function listMarkdown(root, prefix = "") {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(path.join(root, prefix), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      out.push(...await listMarkdown(root, rel));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(rel.split(path.sep).join("/"));
    }
  }
  return out.sort();
}

async function scanSources() {
  const files = await listAllFiles(SOURCES_ROOT);
  const byDir = {};
  for (const file of files) {
    const dir = file.includes("/") ? file.split("/")[0] : "root";
    byDir[dir] = (byDir[dir] || 0) + 1;
  }
  return { total: files.length, byDir, files: files.slice(0, 300) };
}

async function listAllFiles(root, prefix = "") {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(path.join(root, prefix), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const rel = path.join(prefix, entry.name);
    if (entry.isDirectory()) out.push(...await listAllFiles(root, rel));
    if (entry.isFile()) out.push(rel.split(path.sep).join("/"));
  }
  return out.sort();
}

async function readLogs() {
  const logs = [];
  for (const lang of LANGS) {
    try {
      const text = await fs.readFile(path.join(WIKI_ROOT, lang, "log.md"), "utf8");
      const entries = text
        .split(/\n(?=##\s+\[)/g)
        .filter((entry) => entry.trim().startsWith("## ["))
        .slice(-10)
        .reverse()
        .map((entry) => ({ lang, text: entry.trim() }));
      logs.push(...entries);
    } catch {
      logs.push({ lang, text: "Log unavailable." });
    }
  }
  return logs;
}

function parseMarkdown(raw) {
  if (!raw.startsWith("---\n")) return { frontmatter: {}, body: raw, frontmatterText: "" };
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: {}, body: raw, frontmatterText: "" };
  const frontmatterText = raw.slice(4, end);
  const body = raw.slice(end + 4).replace(/^\n/, "");
  return { frontmatter: parseYamlLite(frontmatterText), body, frontmatterText };
}

function parseYamlLite(text) {
  const data = {};
  const lines = text.split(/\r?\n/);
  let activeKey = null;
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch && activeKey) {
      if (!Array.isArray(data[activeKey])) data[activeKey] = [];
      data[activeKey].push(parseScalar(listMatch[1]));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    activeKey = key;
    if (value === "") {
      data[key] = [];
    } else {
      data[key] = parseScalar(value);
    }
  }
  return data;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "null") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return splitYamlArray(inner).map(parseScalar);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function splitYamlArray(inner) {
  const values = [];
  let current = "";
  let quote = null;
  for (const char of inner) {
    if ((char === "\"" || char === "'") && !quote) quote = char;
    else if (char === quote) quote = null;
    if (char === "," && !quote) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) values.push(current.trim());
  return values;
}

function stringifyMarkdown(frontmatter, body) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map(formatYamlValue).join(", ")}]`);
    } else {
      lines.push(`${key}: ${formatYamlValue(value)}`);
    }
  }
  lines.push("---", "", body.replace(/^\n+/, ""));
  return lines.join("\n");
}

function formatYamlValue(value) {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const text = String(value);
  if (!text || /[:#,[\]{}]/.test(text)) return JSON.stringify(text);
  return text;
}

function normalizePage(input) {
  const fm = input.frontmatter || {};
  const slug = path.basename(input.relativePath, ".md");
  const directory = path.dirname(input.relativePath) === "." ? "" : path.dirname(input.relativePath);
  const title = fm.title || firstHeading(input.body) || slug;
  const wikilinks = extractWikilinks(input.body);
  const mermaid = extractMermaid(input.body);
  const type = fm.type || inferType(input.relativePath);
  const author = fm.author || "";
  const bodyText = stripMarkdown(input.body);

  return {
    id: `${input.lang}:${input.relativePath}`,
    lang: input.lang,
    relativePath: input.relativePath,
    absolutePath: input.absolutePath,
    directory,
    slug,
    title,
    type,
    author,
    importance: Number(fm.importance || 0),
    canonical_chapter: fm.canonical_chapter ?? null,
    chapter: fm.chapter ?? null,
    chapter_refs: arrayify(fm.chapter_refs),
    related: arrayify(fm.related),
    tags: arrayify(fm.tags),
    aliases: arrayify(fm.aliases),
    last_updated: fm.last_updated || "",
    last_verified: fm.last_verified || "",
    source: fm.source || "",
    frontmatter: fm,
    frontmatterText: input.frontmatterText || "",
    body: input.body,
    bodyText,
    raw: input.raw,
    size: input.stat?.size || 0,
    mtimeMs: input.stat?.mtimeMs || 0,
    modifiedAt: input.stat?.mtime?.toISOString?.() || "",
    wikilinks,
    mermaid,
    hasLanguageToggle: hasLanguageToggle(input.body, input.lang),
    isSpecial: SPECIAL_FILES.has(path.basename(input.relativePath))
  };
}

function summarizePages(pages) {
  const contentPages = pages.filter((page) => !page.isSpecial);
  const byLang = {};
  const byType = {};
  const byImportance = {};
  const byAuthor = {};
  for (const page of contentPages) {
    byLang[page.lang] = (byLang[page.lang] || 0) + 1;
    byType[page.type] = (byType[page.type] || 0) + 1;
    byImportance[page.importance] = (byImportance[page.importance] || 0) + 1;
    const author = page.author || "unknown";
    byAuthor[author] = (byAuthor[author] || 0) + 1;
  }
  return {
    totalPages: contentPages.length,
    totalFiles: pages.length,
    byLang,
    byType,
    byImportance,
    byAuthor,
    protectedNotes: contentPages.filter((page) => page.author?.toLowerCase() === "user").length,
    highImportance: contentPages.filter((page) => page.importance >= 5).length,
    requiredMermaidPages: contentPages.filter((page) => REQUIRED_MERMAID_TYPES.has(page.type)).length
  };
}

function validatePages(pages) {
  const issues = [];
  const pageByLangPath = new Map(pages.map((page) => [`${page.lang}:${page.relativePath}`, page]));
  const linkIndexesByLang = new Map();
  for (const lang of LANGS) {
    linkIndexesByLang.set(lang, buildLinkIndex(pages.filter((page) => page.lang === lang)));
  }

  for (const page of pages) {
    if (page.isSpecial) continue;
    const mirrorLang = page.lang === "en" ? "zh" : "en";
    const mirror = pageByLangPath.get(`${mirrorLang}:${page.relativePath}`);
    if (!mirror) addIssue("error", "missing-mirror", page, `Missing ${mirrorLang.toUpperCase()} mirror page.`);

    for (const field of ["title", "type", "lang", "last_updated", "last_verified", "author", "importance", "canonical_chapter", "tags"]) {
      if (!(field in page.frontmatter)) addIssue("warning", "frontmatter", page, `Missing frontmatter field: ${field}.`);
    }
    if (page.frontmatter.lang && page.frontmatter.lang !== page.lang) {
      addIssue("error", "frontmatter", page, `Frontmatter lang is ${page.frontmatter.lang}, expected ${page.lang}.`);
    }
    if (!page.hasLanguageToggle) addIssue("warning", "language-toggle", page, "Missing visible language toggle.");
    if (REQUIRED_MERMAID_TYPES.has(page.type) && page.mermaid.length === 0) {
      addIssue("error", "mermaid", page, `Page type ${page.type} requires a Mermaid diagram.`);
    }
    if (page.author?.toLowerCase() === "user") {
      addIssue("info", "protected-note", page, "User-authored note is protected from silent substantive edits.");
    }
    for (const link of page.wikilinks) {
      if (!resolveWikiTarget(link.target, linkIndexesByLang.get(page.lang))) {
        addIssue("warning", "dead-wikilink", page, `Potential dead wikilink: [[${link.raw}]].`);
      }
    }
    if (mirror && REQUIRED_MERMAID_TYPES.has(page.type) && page.lang === "en") {
      const left = normalizeMermaidTopology(page.mermaid[0] || "");
      const right = normalizeMermaidTopology(mirror.mermaid[0] || "");
      if (left && right && left !== right) {
        addIssue("warning", "mermaid-topology", page, "EN/ZH Mermaid topology may differ.");
      }
    }
  }

  const counts = { error: 0, warning: 0, info: 0 };
  for (const issue of issues) counts[issue.severity] += 1;
  return { issues, counts };

  function addIssue(severity, code, page, message) {
    issues.push({
      id: `${severity}:${code}:${page.id}:${issues.length}`,
      severity,
      code,
      message,
      lang: page.lang,
      relativePath: page.relativePath,
      title: page.title,
      type: page.type,
      importance: page.importance
    });
  }
}

function buildGraph(pages) {
  const contentPages = pages.filter((page) => !page.isSpecial);
  const nodes = contentPages.map((page) => ({
    id: page.id,
    lang: page.lang,
    slug: page.slug,
    title: page.title,
    type: page.type,
    importance: page.importance,
    relativePath: page.relativePath
  }));
  const linkIndexesByLang = new Map();
  for (const lang of LANGS) {
    linkIndexesByLang.set(lang, buildLinkIndex(contentPages.filter((page) => page.lang === lang)));
  }
  const edges = [];
  for (const page of contentPages) {
    for (const link of page.wikilinks) {
      const target = resolveWikiTarget(link.target, linkIndexesByLang.get(page.lang));
      if (target && target.id !== page.id) {
        edges.push({ source: page.id, target: target.id, label: "links to" });
      }
    }
    for (const related of page.related) {
      const target = resolveWikiTarget(String(related).replace(/^\[\[|\]\]$/g, ""), linkIndexesByLang.get(page.lang));
      if (target && target.id !== page.id) {
        edges.push({ source: page.id, target: target.id, label: "related" });
      }
    }
  }
  const inbound = {};
  for (const edge of edges) inbound[edge.target] = (inbound[edge.target] || 0) + 1;
  const topHubs = nodes
    .map((node) => ({ ...node, inbound: inbound[node.id] || 0 }))
    .sort((a, b) => b.inbound - a.inbound || b.importance - a.importance)
    .slice(0, 20);
  return { nodes, edges: dedupeEdges(edges), topHubs };
}

function dedupeEdges(edges) {
  const seen = new Set();
  return edges.filter((edge) => {
    const key = `${edge.source}|${edge.target}|${edge.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractWikilinks(body) {
  const out = [];
  const searchableBody = body.replace(/```[\s\S]*?```/g, "");
  const regex = /\[\[([^\]]+)\]\]/g;
  let match;
  while ((match = regex.exec(searchableBody))) {
    const raw = match[1];
    const [target, label] = raw.split("|");
    out.push({ raw, target: target.trim(), label: (label || target).trim() });
  }
  return out;
}

function extractMermaid(body) {
  const blocks = [];
  const regex = /```mermaid\s*([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(body))) blocks.push(match[1].trim());
  return blocks;
}

function normalizeMermaidTopology(block) {
  if (!block) return "";
  return block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /[-.=xo<>]+>/.test(line) || /<[-.=xo<>]+/.test(line))
    .map(normalizeMermaidEdgeLine)
    .filter(Boolean)
    .sort()
    .join("|");
}

function normalizeMermaidEdgeLine(line) {
  return line
    .replace(/\|[^|]*\|/g, "")
    .replace(/([A-Za-z0-9_]+)(\[\[[\s\S]*?\]\]|\[[\s\S]*?\]|\(\([\s\S]*?\)\)|\(\[[\s\S]*?\]\)|\([\s\S]*?\)|\{\{[\s\S]*?\}\})/g, "$1")
    .replace(/(-\.)[^-<>]*?(\.->)/g, "$1$2")
    .replace(/--\s+[^-<>]+?\s+-->/g, "-->")
    .replace(/--\s+[^-<>]+?\s+--/g, "--")
    .replace(/\s+/g, " ")
    .trim();
}

function buildLinkIndex(pages) {
  const index = new Map();
  for (const page of pages.filter((item) => !item.isSpecial)) {
    const keys = [
      page.slug,
      page.title,
      page.relativePath.replace(/\.md$/, ""),
      ...page.aliases
    ];
    for (const key of keys.flatMap(linkKeyCandidates)) {
      if (key && !index.has(key)) index.set(key, page);
    }
  }
  return index;
}

function resolveWikiTarget(target, index) {
  if (!target || !index) return null;
  for (const key of linkKeyCandidates(target)) {
    const page = index.get(key);
    if (page) return page;
  }
  return null;
}

function linkKeyCandidates(value) {
  const raw = String(value || "")
    .split("|")[0]
    .split("#")[0]
    .replace(/\.md$/i, "")
    .split("/")
    .pop()
    .trim();
  const withoutParenthetical = raw.replace(/\s*\([^)]*\)\s*$/g, "").trim();
  const withoutPageSuffix = withoutParenthetical.replace(/\s+page$/i, "").trim();
  return [...new Set([raw, withoutParenthetical, withoutPageSuffix].map(slugifyLinkKey).filter(Boolean))];
}

function slugifyLinkKey(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[^A-Za-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function hasLanguageToggle(body, lang) {
  if (lang === "en") return /中文版：\[\[wiki\/zh\//.test(body);
  return /English:\s*\[\[wiki\/en\//.test(body);
}

function firstHeading(body) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function stripMarkdown(body) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, "$2 $1")
    .replace(/[#>*_`~|[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferType(relativePath) {
  const dir = relativePath.split("/")[0];
  if (dir === "chapters") return "chapter-summary";
  if (dir === "concepts") return "concept";
  if (dir === "structures") return "structure";
  if (dir === "principles") return "principle";
  if (dir === "entities") return "entity";
  if (dir === "comparisons") return "comparison";
  if (dir === "application") return "application";
  if (dir === "quotes") return "quote";
  if (dir === "notes") return "note";
  return path.basename(relativePath, ".md");
}

function arrayify(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function scorePage(page, query) {
  let score = 0;
  const title = page.title.toLowerCase();
  const slug = page.slug.toLowerCase();
  const pathText = page.relativePath.toLowerCase();
  const body = page.bodyText.toLowerCase();
  if (slug === query) score += 120;
  if (title === query) score += 100;
  if (slug.includes(query)) score += 45;
  if (title.includes(query)) score += 40;
  if (pathText.includes(query)) score += 20;
  if (page.aliases.join(" ").toLowerCase().includes(query)) score += 25;
  if (body.includes(query)) score += 8;
  score += Number(page.importance || 0) * 3;
  return score;
}

function makeSnippet(page, query) {
  const lower = page.bodyText.toLowerCase();
  const index = lower.indexOf(query);
  if (index < 0) return page.bodyText.slice(0, 180);
  return page.bodyText.slice(Math.max(0, index - 70), index + query.length + 110);
}

function assertLang(lang) {
  if (!LANGS.includes(lang)) {
    const err = new Error(`Invalid language: ${lang}`);
    err.status = 400;
    throw err;
  }
}

function normalizeRelative(relativePath) {
  return String(relativePath || "").replace(/^\/+/, "").replaceAll("\\", "/");
}

function safeWikiPath(lang, relativePath) {
  const normalized = normalizeRelative(relativePath);
  const resolved = path.resolve(WIKI_ROOT, lang, normalized);
  const root = path.resolve(WIKI_ROOT, lang);
  if (!resolved.startsWith(root + path.sep) || !resolved.endsWith(".md")) {
    const err = new Error("Invalid wiki path.");
    err.status = 400;
    throw err;
  }
  return resolved;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function runScript(script, args) {
  return new Promise((resolve) => {
    const child = spawn("python3", [script, ...args], { cwd: ROOT });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => { stdout += data.toString(); });
    child.stderr.on("data", (data) => { stderr += data.toString(); });
    child.on("close", (code) => {
      resolve({
        ok: code === 0,
        operation: script,
        code,
        output: [stdout.trim(), stderr.trim()].filter(Boolean).join("\n")
      });
    });
  });
}
