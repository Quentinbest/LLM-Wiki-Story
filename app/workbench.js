"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  CircleCheck,
  CircleX,
  Eye,
  FileText,
  FolderOpen,
  GitCompare,
  Languages,
  LayoutDashboard,
  Library,
  Lock,
  Network,
  Pencil,
  RefreshCw,
  Search,
  ShieldCheck,
  TerminalSquare,
  TriangleAlert
} from "lucide-react";

const NAV = [
  { id: "dashboard", label: "Dashboard", group: "Workspace", icon: LayoutDashboard },
  { id: "library", label: "Library", group: "Workspace", icon: Library },
  { id: "reader", label: "Reader", group: "Workspace", icon: FileText },
  { id: "search", label: "Search", group: "Workspace", icon: Search },
  { id: "graph", label: "Graph", group: "Workspace", icon: Network },
  { id: "sources", label: "Sources", group: "Corpus", icon: FolderOpen },
  { id: "canonical", label: "Canonical", group: "Corpus", icon: BookOpenText },
  { id: "operations", label: "Operations", group: "Maintenance", icon: TerminalSquare }
];

const TYPE_LABELS = {
  "chapter-summary": "Chapter",
  concept: "Concept",
  structure: "Structure",
  principle: "Principle",
  entity: "Entity",
  comparison: "Comparison",
  application: "Application",
  quote: "Quote",
  note: "Note",
  overview: "Overview"
};

export default function Workbench() {
  const [activeView, setActiveView] = useState("dashboard");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);
  const [operationResult, setOperationResult] = useState(null);

  async function loadWiki() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/wiki", { cache: "no-store" });
      const next = await response.json();
      if (!response.ok) throw new Error(next.error || "Failed to load wiki.");
      setData(next);
      setSelectedPage((current) => current || next.pages.find((page) => page.lang === "en" && page.relativePath === "overview.md") || next.pages[0]);
      setSelectedGraphNode((current) => current || next.graph?.topHubs?.[0] || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWiki();
  }, []);

  useEffect(() => {
    function onKey(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector("#global-search")?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pages = data?.pages?.filter((page) => !page.isSpecial) || [];
  const filteredPages = useMemo(() => filterPages(pages, query), [pages, query]);
  const issues = data?.validation?.issues || [];

  function openPage(page, view = "reader") {
    setSelectedPage(page);
    setActiveView(view);
  }

  async function runOperation(operation) {
    setOperationResult({ operation, output: "Running...", ok: null });
    const response = await fetch("/api/operation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation })
    });
    const result = await response.json();
    setOperationResult(result);
    if (operation === "regen-map" || operation === "atomize-quotes") await loadWiki();
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">LW</div>
          <span>LLM Wiki Story</span>
        </div>
        <label className="global-search" aria-label="Global search">
          <Search size={16} />
          <input
            id="global-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setActiveView("search")}
            placeholder="Search titles, slugs, aliases, concepts, quotes..."
          />
        </label>
        <div className="topbar-status">
          <StatusBadge severity={issues.some((issue) => issue.severity === "error") ? "error" : "success"}>
            {issues.filter((issue) => issue.severity === "error").length} errors
          </StatusBadge>
          <StatusBadge severity="warning">{issues.filter((issue) => issue.severity === "warning").length} warnings</StatusBadge>
          <StatusBadge severity="info"><Languages size={13} /> EN/ZH</StatusBadge>
        </div>
      </header>

      <aside className="sidebar" aria-label="Primary navigation">
        {groupNav(NAV).map(([group, items]) => (
          <div className="nav-group" key={group}>
            <div className="nav-label">{group}</div>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  className={`nav-button ${activeView === item.id ? "active" : ""}`}
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  title={item.label}
                  data-mobile-primary={["dashboard", "library", "search", "graph", "operations"].includes(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </aside>

      <main className="main">
        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} onRetry={loadWiki} /> : null}
        {!loading && !error && data ? (
          <>
            {activeView === "dashboard" ? <Dashboard data={data} issues={issues} openPage={openPage} reload={loadWiki} /> : null}
            {activeView === "library" ? <LibraryView pages={filteredPages} allPages={pages} query={query} setQuery={setQuery} openPage={openPage} /> : null}
            {activeView === "reader" ? <ReaderView page={selectedPage} issues={issues} setActiveView={setActiveView} /> : null}
            {activeView === "search" ? <SearchView pages={filteredPages} query={query} setQuery={setQuery} openPage={openPage} /> : null}
            {activeView === "graph" ? <GraphView data={data} selected={selectedGraphNode} setSelected={setSelectedGraphNode} openPage={openPage} /> : null}
            {activeView === "sources" ? <SourcesView sources={data.sources} /> : null}
            {activeView === "canonical" ? <CanonicalView pages={pages} /> : null}
            {activeView === "operations" ? <OperationsView data={data} runOperation={runOperation} operationResult={operationResult} openPage={openPage} /> : null}
          </>
        ) : null}
      </main>
    </div>
  );
}

function Dashboard({ data, issues, openPage, reload }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const mirrorIssues = issues.filter((issue) => issue.code === "missing-mirror");
  const mermaidIssues = issues.filter((issue) => issue.code === "mermaid" || issue.code === "mermaid-topology");
  const topIssues = [...errors, ...warnings].slice(0, 12);

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Wiki Health</h1>
          <p className="page-subtitle">
            {data.summary.byLang.en || 0} EN pages, {data.summary.byLang.zh || 0} ZH pages, {data.summary.totalFiles} Markdown files scanned.
          </p>
        </div>
        <button className="button secondary" onClick={reload}><RefreshCw size={16} /> Refresh index</button>
      </div>

      <div className="health-strip">
        <StatusCell label="Mirror" value={mirrorIssues.length} severity={mirrorIssues.length ? "error" : "success"} />
        <StatusCell label="Frontmatter" value={issues.filter((issue) => issue.code === "frontmatter").length} severity="warning" />
        <StatusCell label="Links" value={issues.filter((issue) => issue.code === "dead-wikilink").length} severity="warning" />
        <StatusCell label="Mermaid" value={mermaidIssues.length} severity={mermaidIssues.length ? "warning" : "success"} />
        <StatusCell label="Protected Notes" value={data.summary.protectedNotes} severity="info" />
        <StatusCell label="High Importance" value={data.summary.highImportance} severity="info" />
      </div>

      <div className="grid-2">
        <Panel title="Attention Queue">
          <IssueTable issues={topIssues} pages={data.pages} openPage={openPage} />
        </Panel>
        <div className="form-stack">
          <Panel title="Corpus Shape">
            <Distribution title="Types" values={data.summary.byType} />
            <Distribution title="Importance" values={data.summary.byImportance} />
          </Panel>
          <Panel title="Top Hubs">
            <div className="issue-list">
              {data.graph.topHubs.slice(0, 8).map((page) => (
                <button className="row-button" key={page.id} onClick={() => openPage(page)}>
                  {page.title} <span className="muted mono">inbound {page.inbound}</span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function LibraryView({ pages, allPages, query, setQuery, openPage }) {
  const [type, setType] = useState("all");
  const [lang, setLang] = useState("all");
  const types = [...new Set(allPages.map((page) => page.type))].sort();
  const visible = pages.filter((page) => (type === "all" || page.type === type) && (lang === "all" || page.lang === lang));

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Library</h1>
          <p className="page-subtitle">Registry of mirrored wiki pages, optimized for filtering and maintenance.</p>
        </div>
      </div>
      <div className="toolbar">
        <input className="control" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter library" />
        <select className="control" value={type} onChange={(event) => setType(event.target.value)}>
          <option value="all">All types</option>
          {types.map((item) => <option key={item} value={item}>{TYPE_LABELS[item] || item}</option>)}
        </select>
        <select className="control" value={lang} onChange={(event) => setLang(event.target.value)}>
          <option value="all">EN and ZH</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
        <StatusBadge severity="info">{visible.length} pages</StatusBadge>
      </div>
      <Panel title="Page Pairs and Files">
        <PageTable pages={visible} openPage={openPage} />
      </Panel>
    </section>
  );
}

function ReaderView({ page, issues, setActiveView }) {
  const pageIssues = issues.filter((issue) => issue.lang === page?.lang && issue.relativePath === page?.relativePath);
  if (!page) return <EmptyPage title="Reader" text="Select a page from Library or Search." />;
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">{page.title}</h1>
          <p className="page-subtitle"><span className="mono">{page.lang}/{page.relativePath}</span></p>
        </div>
        <div className="toolbar">
          {page.author?.toLowerCase() === "user" ? <StatusBadge severity="info"><Lock size={13} /> Protected note</StatusBadge> : null}
          <button className="button secondary" onClick={() => setActiveView("operations")}><ShieldCheck size={16} /> Issues {pageIssues.length}</button>
          <button className="button" onClick={() => setActiveView("operations")}><Pencil size={16} /> Edit</button>
        </div>
      </div>
      <div className="split-reader">
        <Panel title="Rendered Markdown">
          <article className="reader-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(page.body) }} />
        </Panel>
        <Panel title="Inspector">
          <Inspector page={page} issues={pageIssues} />
        </Panel>
      </div>
    </section>
  );
}

function SearchView({ pages, query, setQuery, openPage }) {
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Search</h1>
          <p className="page-subtitle">Search across titles, slugs, aliases, metadata, wikilinks, and body text.</p>
        </div>
      </div>
      <div className="toolbar">
        <input className="control" style={{ minWidth: 360 }} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try gap, antagonism, 鸿沟, 对抗..." />
        <StatusBadge severity="info">{pages.length} results</StatusBadge>
      </div>
      <Panel title="Results">
        <PageTable pages={pages.slice(0, 120)} openPage={openPage} showSnippet />
      </Panel>
    </section>
  );
}

function GraphView({ data, selected, setSelected, openPage }) {
  const nodes = data.graph.topHubs.slice(0, 28);
  const nodeMap = new Map(data.graph.nodes.map((node) => [node.id, node]));
  const adjacent = selected ? data.graph.edges.filter((edge) => edge.source === selected.id || edge.target === selected.id).slice(0, 80) : [];
  const selectedPage = selected ? nodeMap.get(selected.id) || selected : null;

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Knowledge Graph</h1>
          <p className="page-subtitle">High-inbound hubs with an accessible adjacency table.</p>
        </div>
      </div>
      <div className="split-reader">
        <Panel title="Graph Canvas">
          <div className="graph-canvas">
            {nodes.map((node, index) => (
              <button
                className={`graph-node ${selected?.id === node.id ? "active" : ""}`}
                key={node.id}
                style={nodePosition(index, nodes.length)}
                onClick={() => setSelected(node)}
              >
                <span className="graph-dot" style={{ background: typeColor(node.type) }} />
                <strong>{node.title}</strong>
                <div className="mono muted">{node.lang}/{node.slug}</div>
              </button>
            ))}
          </div>
        </Panel>
        <div className="form-stack">
          <Panel title="Inspector">
            {selectedPage ? (
              <div className="inspector-list">
                <div className="inspector-row"><span>Title</span><strong>{selectedPage.title}</strong></div>
                <div className="inspector-row"><span>Path</span><span className="mono">{selectedPage.lang}/{selectedPage.relativePath}</span></div>
                <div className="inspector-row"><span>Type</span><span>{TYPE_LABELS[selectedPage.type] || selectedPage.type}</span></div>
                <div className="inspector-row"><span>Inbound</span><span>{selectedPage.inbound ?? "n/a"}</span></div>
                <button className="button" onClick={() => openPage(selectedPage)}><Eye size={16} /> Open reader</button>
              </div>
            ) : <p className="muted">Select a node.</p>}
          </Panel>
          <Panel title="Adjacency List">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Source</th><th>Label</th><th>Target</th></tr></thead>
                <tbody>
                  {adjacent.map((edge) => (
                    <tr key={`${edge.source}-${edge.target}-${edge.label}`}>
                      <td>{nodeMap.get(edge.source)?.title || edge.source}</td>
                      <td>{edge.label}</td>
                      <td>{nodeMap.get(edge.target)?.title || edge.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function SourcesView({ sources }) {
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Sources</h1>
          <p className="page-subtitle">Immutable source inventory. The app never writes to <span className="mono">sources/</span>.</p>
        </div>
      </div>
      <div className="grid-2">
        <Panel title="Source Counts">
          <Distribution title="Directories" values={sources.byDir} />
        </Panel>
        <Panel title="Files">
          <div className="issue-list">
            {sources.files.slice(0, 120).map((file) => <div className="mono" key={file}>{file}</div>)}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function CanonicalView({ pages }) {
  const canonicals = pages
    .filter((page) => page.canonical_chapter !== null && page.canonical_chapter !== undefined)
    .sort((a, b) => Number(a.canonical_chapter || 0) - Number(b.canonical_chapter || 0) || b.importance - a.importance)
    .slice(0, 220);
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Canonical Ownership</h1>
          <p className="page-subtitle">Definitions grouped by <span className="mono">canonical_chapter</span> for conflict resolution.</p>
        </div>
      </div>
      <Panel title="Canonical Chapter Map">
        <PageTable pages={canonicals} openPage={() => {}} />
      </Panel>
    </section>
  );
}

function OperationsView({ data, runOperation, operationResult, openPage }) {
  const [editTarget, setEditTarget] = useState(data.pages.find((page) => page.lang === "en" && !page.isSpecial));
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Operations</h1>
          <p className="page-subtitle">Run deterministic maintenance and edit Markdown with policy-aware guards.</p>
        </div>
      </div>
      <div className="grid-2">
        <div className="form-stack">
          <Panel title="Maintenance Actions">
            <div className="toolbar">
              <button className="button secondary" onClick={() => runOperation("lint")}><ShieldCheck size={16} /> Validate</button>
              <button className="button secondary" onClick={() => runOperation("regen-map")}><RefreshCw size={16} /> Regenerate MAP</button>
              <button className="button secondary" onClick={() => runOperation("atomize-quotes")}><GitCompare size={16} /> Atomize Quotes</button>
            </div>
            {operationResult ? (
              <div className="operation-output">
                {operationResult.output || JSON.stringify(operationResult, null, 2)}
              </div>
            ) : <p className="muted">Operations run against local files. MAP and quote operations use the existing scripts.</p>}
          </Panel>
          <Panel title="Validation Issues">
            <IssueTable issues={data.validation.issues.slice(0, 80)} pages={data.pages} openPage={openPage} />
          </Panel>
        </div>
        <EditorPanel page={editTarget} pages={data.pages.filter((page) => !page.isSpecial)} setEditTarget={setEditTarget} />
      </div>
    </section>
  );
}

function EditorPanel({ page, pages, setEditTarget }) {
  const [body, setBody] = useState(page?.body || "");
  const [frontmatterText, setFrontmatterText] = useState(page?.frontmatterText || "");
  const [allowUserNoteEdit, setAllowUserNoteEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setBody(page?.body || "");
    setFrontmatterText(page?.frontmatterText || "");
    setAllowUserNoteEdit(false);
    setMessage("");
  }, [page]);

  async function save() {
    if (!page) return;
    setMessage("Saving...");
    const response = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang: page.lang,
        relativePath: page.relativePath,
        frontmatter: parseFrontmatterText(frontmatterText),
        body,
        allowUserNoteEdit
      })
    });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "Save failed.");
      return;
    }
    setMessage("Saved. Refresh the index to see validation changes.");
  }

  return (
    <Panel title="Editor">
      <div className="form-stack">
        <div className="form-row">
          <label>Page</label>
          <select className="control" value={page?.id || ""} onChange={(event) => setEditTarget(pages.find((item) => item.id === event.target.value))}>
            {pages.map((item) => <option value={item.id} key={item.id}>{item.lang}/{item.relativePath}</option>)}
          </select>
        </div>
        {page?.author?.toLowerCase() === "user" ? (
          <label className="badge info" style={{ justifyContent: "flex-start" }}>
            <input type="checkbox" checked={allowUserNoteEdit} onChange={(event) => setAllowUserNoteEdit(event.target.checked)} />
            Confirm protected note edit
          </label>
        ) : null}
        <div className="editor-grid">
          <div className="form-stack">
            <div className="form-row">
              <label>Frontmatter</label>
              <textarea className="textarea" style={{ minHeight: 220 }} value={frontmatterText} onChange={(event) => setFrontmatterText(event.target.value)} />
            </div>
            <button className="button" onClick={save}><Pencil size={16} /> Save page</button>
            {message ? <div className="operation-output">{message}</div> : null}
          </div>
          <div className="form-row">
            <label>Markdown Body</label>
            <textarea className="textarea" value={body} onChange={(event) => setBody(event.target.value)} />
          </div>
        </div>
      </div>
    </Panel>
  );
}

function PageTable({ pages, openPage, showSnippet = false }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Path</th>
            <th>Type</th>
            <th>Ch</th>
            <th>Imp</th>
            <th>Lang</th>
            <th>Author</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>
                <button className="row-button" onClick={() => openPage(page)}>
                  {page.title}
                </button>
                {showSnippet && page.snippet ? <div className="muted">{page.snippet}</div> : null}
              </td>
              <td className="mono">{page.relativePath}</td>
              <td>{TYPE_LABELS[page.type] || page.type}</td>
              <td>{page.canonical_chapter ?? page.chapter ?? ""}</td>
              <td>{page.importance || ""}</td>
              <td>{page.lang.toUpperCase()}</td>
              <td>{page.author || "unknown"}</td>
              <td>{page.last_verified || "missing"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IssueTable({ issues, pages = [], openPage }) {
  if (!issues.length) return <p className="muted">No issues in this view.</p>;
  return (
    <div className="issue-list">
      {issues.map((issue) => {
        const page = pages.find((item) => item.lang === issue.lang && item.relativePath === issue.relativePath);
        return (
          <div className="issue-item" key={issue.id}>
            <div className="issue-meta">
              <StatusBadge severity={issue.severity}>{issue.severity}</StatusBadge>
              <span className="mono">{issue.lang}/{issue.relativePath}</span>
              <span className="badge">{issue.code}</span>
            </div>
            <div>{issue.message}</div>
            {openPage && page ? (
              <button className="row-button" onClick={() => openPage(page)}>Open affected page</button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function Inspector({ page, issues }) {
  return (
    <div className="inspector-list">
      <div className="inspector-row"><span>Type</span><span>{TYPE_LABELS[page.type] || page.type}</span></div>
      <div className="inspector-row"><span>Author</span><span>{page.author || "unknown"}</span></div>
      <div className="inspector-row"><span>Importance</span><span>{page.importance || "missing"}</span></div>
      <div className="inspector-row"><span>Canonical</span><span>{page.canonical_chapter ?? "null"}</span></div>
      <div className="inspector-row"><span>Updated</span><span>{page.last_updated || "missing"}</span></div>
      <div className="inspector-row"><span>Verified</span><span>{page.last_verified || "missing"}</span></div>
      <div className="inspector-row"><span>Wikilinks</span><span>{page.wikilinks.length}</span></div>
      <div className="inspector-row"><span>Mermaid</span><span>{page.mermaid.length}</span></div>
      <div className="inspector-row"><span>Issues</span><span>{issues.length}</span></div>
      <div className="inspector-row"><span>Tags</span><span>{page.tags.join(", ") || "none"}</span></div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <div className="panel-head"><h2 className="panel-title">{title}</h2></div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function StatusCell({ label, value, severity }) {
  return (
    <div className="status-cell">
      <div className="status-label">
        <span>{label}</span>
        <SeverityIcon severity={severity} />
      </div>
      <div className="status-value">{value}</div>
    </div>
  );
}

function StatusBadge({ severity = "info", children }) {
  return <span className={`badge ${severity}`}>{children}</span>;
}

function SeverityIcon({ severity }) {
  if (severity === "error") return <CircleX size={16} color="var(--danger)" />;
  if (severity === "warning") return <TriangleAlert size={16} color="var(--warning)" />;
  if (severity === "success") return <CircleCheck size={16} color="var(--success)" />;
  return <ShieldCheck size={16} color="var(--info)" />;
}

function Distribution({ title, values }) {
  const entries = Object.entries(values || {}).sort(([a], [b]) => String(a).localeCompare(String(b)));
  const max = Math.max(1, ...entries.map(([, value]) => Number(value)));
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 className="panel-title" style={{ marginBottom: 8 }}>{title}</h3>
      <div className="form-stack">
        {entries.map(([key, value]) => (
          <div key={key}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span>{TYPE_LABELS[key] || key}</span><span className="mono">{value}</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "var(--bg-subtle)", overflow: "hidden" }}>
              <div style={{ width: `${(Number(value) / max) * 100}%`, height: "100%", background: "var(--action)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingState() {
  return <EmptyPage title="Loading local wiki" text="Parsing Markdown, frontmatter, wikilinks, logs, sources, and graph edges." />;
}

function ErrorState({ message, onRetry }) {
  return (
    <section className="page">
      <Panel title="Load Error">
        <p>{message}</p>
        <button className="button" onClick={onRetry}>Retry</button>
      </Panel>
    </section>
  );
}

function EmptyPage({ title, text }) {
  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{text}</p>
        </div>
      </div>
    </section>
  );
}

function groupNav(items) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.group)) map.set(item.group, []);
    map.get(item.group).push(item);
  }
  return [...map.entries()];
}

function filterPages(pages, query) {
  const q = query.trim().toLowerCase();
  const scored = pages.map((page) => {
    if (!q) return { page, score: page.importance || 0, snippet: "" };
    const haystack = [
      page.title,
      page.slug,
      page.relativePath,
      page.type,
      page.lang,
      page.aliases?.join(" "),
      page.tags?.join(" "),
      page.bodyText
    ].join(" ").toLowerCase();
    let score = 0;
    if (page.slug.toLowerCase() === q) score += 100;
    if (page.title.toLowerCase() === q) score += 100;
    if (page.title.toLowerCase().includes(q)) score += 40;
    if (page.slug.toLowerCase().includes(q)) score += 35;
    if (haystack.includes(q)) score += 10;
    score += page.importance || 0;
    return { page, score, snippet: makeSnippet(page.bodyText, q) };
  });
  return scored
    .filter((entry) => !q || entry.score > (entry.page.importance || 0))
    .sort((a, b) => b.score - a.score || b.page.importance - a.page.importance)
    .map((entry) => ({ ...entry.page, snippet: entry.snippet }));
}

function makeSnippet(text, q) {
  if (!q) return "";
  const index = text.toLowerCase().indexOf(q);
  if (index < 0) return text.slice(0, 160);
  return text.slice(Math.max(0, index - 60), index + q.length + 100);
}

function renderMarkdown(markdown) {
  const escaped = escapeHtml(markdown);
  const lines = escaped.split("\n");
  const html = [];
  let inList = false;
  let inCode = false;
  let codeLang = "";

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (!inCode) {
        closeList();
        inCode = true;
        codeLang = line.slice(3).trim();
        html.push(`<pre><code data-lang="${codeLang}">`);
      } else {
        inCode = false;
        html.push("</code></pre>");
      }
      continue;
    }
    if (inCode) {
      html.push(`${line}\n`);
      continue;
    }
    if (/^#{1,3}\s+/.test(line)) {
      closeList();
      const level = line.match(/^#+/)[0].length;
      html.push(`<h${level}>${inlineMarkdown(line.replace(/^#{1,3}\s+/, ""))}</h${level}>`);
      continue;
    }
    if (/^-\s+/.test(line)) {
      if (!inList) {
        inList = true;
        html.push("<ul>");
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^-\s+/, ""))}</li>`);
      continue;
    }
    closeList();
    if (!line.trim()) {
      html.push("");
    } else if (/^&gt;\s*/.test(line)) {
      html.push(`<blockquote>${inlineMarkdown(line.replace(/^&gt;\s*/, ""))}</blockquote>`);
    } else {
      html.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }
  closeList();
  return html.join("\n");

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }
}

function inlineMarkdown(text) {
  return text
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_match, target, label) => `<span class="badge info">${label || target}</span>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseFrontmatterText(text) {
  const data = {};
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    data[key] = parseValue(raw);
  }
  return data;
}

function parseValue(raw) {
  const value = raw.trim();
  if (value === "null") return null;
  if (/^-?\d+$/.test(value)) return Number(value);
  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""));
  }
  return value.replace(/^["']|["']$/g, "");
}

function nodePosition(index, total) {
  const radiusX = 33;
  const radiusY = 38;
  const angle = (index / Math.max(1, total)) * Math.PI * 2;
  const x = 45 + Math.cos(angle) * radiusX;
  const y = 45 + Math.sin(angle) * radiusY;
  return { left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" };
}

function typeColor(type) {
  if (type === "concept") return "var(--concept)";
  if (type === "structure") return "var(--structure)";
  if (type === "principle") return "var(--principle)";
  if (type === "quote") return "var(--quote)";
  if (type === "note") return "var(--note)";
  return "var(--info)";
}
