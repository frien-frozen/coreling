"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   LOGO  (same as home page)
───────────────────────────────────────────────────────── */
function CorelingLogo({ size = 28, color = "#fff" }) {
  return (
    <svg width={size} height={size * (124.16 / 106.99)} viewBox="0 0 106.99 124.16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M80.25,44.59h0V16c0-.23-.12-.44-.32-.55L53.83.09c-.2-.12-.45-.12-.65,0l-26.42,15.54h0S.32,31.19.32,31.19c-.2.12-.32.33-.32.55v60.56c0,.23.12.44.32.55l26.44,15.56,26.75,15.75v-.02l26.74-15.73h0l26.42-15.56c.2-.12.32-.33.32-.55v-31.61c0-.23-.12-.44-.32-.55l-26.42-15.54ZM81.12,51.91l16.69,9.64c.43.25.43.87,0,1.11l-16.69,9.64c-.43.25-.97-.06-.97-.56v-19.27c0-.5.54-.81.97-.56ZM60.08,32.7l13.95-8.04c.43-.25.97.06.97.56v16.1c0,.5-.54.81-.97.56l-13.95-8.05c-.43-.25-.43-.87,0-1.12ZM74.99,49.8v24.62c0,.23-.12.44-.32.56l-21.29,12.29c-.2.11-.44.11-.64,0l-21.31-12.3c-.2-.11-.32-.33-.32-.56v-24.61c0-.23.12-.44.32-.56l21.31-12.3c.2-.11.44-.11.64,0l21.29,12.3c.2.11.32.33.32.56ZM99.98,88.84c0,.23-.12.44-.32.56l-22.43,12.96h0l-.7.41-23.15,13.35c-.2.11-.44.11-.64,0l-21.62-12.48h0s-1.52-.88-1.52-.88l-23.15-13.35c-.2-.11-.32-.33-.32-.56v-53.46c0-.23.12-.44.32-.56l23.15-13.36,1.52-.88,21.62-12.48c.2-.11.44-.11.64,0l17.63,10.18c.43.25.43.87,0,1.12l-19.46,11.23-1.47.86-23.52,13.57-1.19.69c-.2.11-.32.33-.32.56v31.62c0,.23.12.44.32.56l1.19.69,24.99,14.42,1.2.69c.2.11.44.11.64,0l1.2-.69,24.27-14.01h0l.7-.41,19.45-11.24c.43-.25.97.06.97.56v20.36Z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────── */
const Icon = {
  External: ({ s = 16, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3h3v3M10 10L17 3M17 14v3H3V3h3"/>
    </svg>
  ),
  Menu: ({ s = 20, c = "#fff" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <line x1="3" y1="5" x2="17" y2="5"/>
      <line x1="3" y1="10" x2="17" y2="10"/>
      <line x1="3" y1="15" x2="17" y2="15"/>
    </svg>
  ),
  Close: ({ s = 20, c = "#fff" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="4" x2="16" y2="16"/>
      <line x1="16" y1="4" x2="4" y2="16"/>
    </svg>
  ),
  Chevron: ({ s = 14, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7 6 10 10 13 6"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────── */
const T = {
  page: { background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" },
  nav: { position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 },
  logoLink: { display: "flex", alignItems: "center", gap: 10, color: "#fff" },
  logoText: { fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em" },
  navLinks: { display: "flex", gap: 28, alignItems: "center" },
  navLink: { fontSize: 14, color: "#71717a", fontWeight: 400, transition: "color 0.15s" },
  btn: { background: "#fff", color: "#000", fontSize: 14, fontWeight: 600, padding: "8px 16px", borderRadius: 8, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 },
  btnGhost: { border: "1px solid rgba(255,255,255,0.1)", color: "#71717a", fontSize: 14, fontWeight: 500, padding: "8px 16px", borderRadius: 8, textDecoration: "none", background: "transparent", cursor: "pointer" },

  docsLayout: { display: "grid", gridTemplateColumns: "260px 1fr", maxWidth: 1200, margin: "0 auto" },
  sidebar: { position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto", padding: "32px 24px", borderRight: "1px solid rgba(255,255,255,0.06)" },
  main: { padding: "40px 40px", minWidth: 0, overflowX: "hidden" },

  sidebarTitle: { fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, fontWeight: 600 },
  sidebarSection: { marginBottom: 28 },
  sidebarLink: { display: "block", fontSize: 14, color: "#71717a", padding: "8px 0", textDecoration: "none", transition: "color 0.15s" },
  sidebarLinkActive: { color: "#fff" },

  eyebrow: { fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 },
  h1: { fontSize: 42, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 },
  h2: { fontSize: 26, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14, marginTop: 40 },
  h3: { fontSize: 18, fontWeight: 600, color: "#e4e4e7", marginBottom: 10, marginTop: 28 },
  p: { fontSize: 15, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 16, overflowWrap: "break-word", wordBreak: "break-word" },
  code: { background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4, fontSize: "0.9em", fontFamily: "'DM Mono', monospace", color: "#f4f4f5", wordBreak: "break-all" },
  codeBlock: { background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 20, overflowX: "auto", marginBottom: 20, maxWidth: "100%" },
  pre: { margin: 0, fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#e4e4e7", lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word" },
  ul: { paddingLeft: 20, color: "#a1a1aa", marginBottom: 16 },
  li: { marginBottom: 8, lineHeight: 1.6, overflowWrap: "break-word" },
  note: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 16, marginBottom: 20 },
  noteTitle: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 },
};

/* ─────────────────────────────────────────────────────────
   SIDEBAR NAVIGATION
───────────────────────────────────────────────────────── */
const NAV = [
  {
    section: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "installation", label: "Installation" },
      { id: "quickstart", label: "Quick Start" },
    ]
  },
  {
    section: "Features",
    items: [
      { id: "modes", label: "Engine Modes" },
      { id: "memory", label: "Memory System" },
      { id: "vision", label: "Image Analysis" },
    ]
  },
  {
    section: "Reference",
    items: [
      { id: "commands", label: "Commands" },
      { id: "storage", label: "Storage Layout" },
      { id: "updating", label: "Updating" },
    ]
  },
];

/* ─────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const ids = NAV.flatMap(g => g.items.map(i => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={T.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: rgba(255,255,255,0.15); }
        section[id] { scroll-margin-top: 80px; }
        .docs-desktop-nav { display: flex; }
        .docs-mobile-btn { display: none; background: none; border: none; cursor: pointer; padding: 6px; }
        .docs-toc-btn { display: none; }
        .docs-sidebar-close { display: none; }
        .docs-backdrop { display: none; }
        @media (max-width: 768px) {
          .docs-desktop-nav { display: none !important; }
          .docs-mobile-btn { display: flex !important; align-items: center; }
          .docs-layout { grid-template-columns: 1fr !important; }
          .docs-sidebar {
            display: none !important;
            position: fixed !important;
            top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            height: 100dvh !important;
            z-index: 50 !important;
            background: #080808 !important;
            overflow-y: auto !important;
            padding: 20px 24px 40px !important;
            border-right: none !important;
            border-bottom: none !important;
          }
          .docs-sidebar.open { display: block !important; }
          .docs-sidebar-close { display: flex !important; align-items: center; gap: 8px; background: none; border: none; color: #71717a; font-size: 13px; cursor: pointer; padding: 0 0 20px 0; font-family: 'DM Sans', sans-serif; }
          .docs-toc-btn { display: flex !important; align-items: center; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: #a1a1aa; font-size: 13px; cursor: pointer; padding: 10px 16px; border-radius: 8px; font-family: 'DM Sans', sans-serif; margin-bottom: 28px; width: 100%; }
          .docs-backdrop { display: block !important; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 49; backdrop-filter: blur(4px); }
          .docs-main { padding: 28px 20px 60px !important; }
        }
      `}</style>

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <nav style={T.nav}>
        <div style={T.navInner}>
          <a href="/" style={T.logoLink}>
            <CorelingLogo size={22} color="#fff" />
            <span style={T.logoText}>coreling</span>
          </a>

          {/* Desktop Nav */}
          <div className="docs-desktop-nav" style={{ alignItems: "center", gap: 24 }}>
            <a href="https://github.com/frien-frozen/corelingpy" target="_blank" rel="noopener noreferrer" style={{ ...T.navLink, display: "flex", alignItems: "center", gap: 6 }}>
              GitHub <Icon.External s={12} />
            </a>
            <a href="/" style={T.btnGhost}>Back to Home</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="docs-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Icon.Close s={22} c="#fff" /> : <Icon.Menu s={22} c="#fff" />}
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ position: "absolute", top: 60, left: 0, right: 0, background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: 20, zIndex: 40 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href="https://github.com/frien-frozen/corelingpy" target="_blank" rel="noopener noreferrer" style={{ ...T.navLink, fontSize: 15 }}>GitHub</a>
            <a href="/" style={{ ...T.btnGhost, textAlign: "center" }}>← Back to Home</a>
          </div>
        </motion.div>
      )}

      {/* ══ DOCS LAYOUT ════════════════════════════════════════════ */}
      <div className="docs-layout" style={{ display: "grid", gridTemplateColumns: "260px 1fr", maxWidth: 1200, margin: "0 auto" }}>
        {/* Sidebar */}
        <aside className={`docs-sidebar${tocOpen ? " open" : ""}`} style={T.sidebar}>
          <button className="docs-sidebar-close" onClick={() => setTocOpen(false)}>
            <svg width={16} height={16} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
            Close
          </button>
          {NAV.map(({ section, items }) => (
            <div key={section} style={T.sidebarSection}>
              <p style={T.sidebarTitle}>{section}</p>
              {items.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(id);
                    setTocOpen(false);
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    ...T.sidebarLink,
                    ...(activeSection === id ? T.sidebarLinkActive : {}),
                  }}
                  onMouseEnter={(e) => e.target.style.color = activeSection === id ? "#fff" : "#a1a1aa"}
                  onMouseLeave={(e) => e.target.style.color = activeSection === id ? "#fff" : "#71717a"}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* Backdrop for mobile TOC */}
        {tocOpen && <div className="docs-backdrop" onClick={() => setTocOpen(false)} />}

        {/* Main Content */}
        <main className="docs-main" style={T.main}>

          {/* Mobile Contents button */}
          <button className="docs-toc-btn" onClick={() => setTocOpen(true)}>
            <svg width={15} height={15} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="5" x2="17" y2="5"/><line x1="3" y1="10" x2="12" y2="10"/><line x1="3" y1="15" x2="17" y2="15"/></svg>
            Contents
          </button>

          {/* Introduction */}
          <section id="introduction">
            <p style={T.eyebrow}>Getting Started</p>
            <h1 style={T.h1}>Introduction</h1>
            <p style={T.p}>
              Coreling is a local AI assistant that runs entirely on your machine. It auto-downloads
              everything it needs on first launch — no configuration, no API keys, no cloud.
            </p>
            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>How it works</p>
              <p style={{ ...T.p, marginBottom: 0 }}>
                Coreling is a Python TUI (terminal UI). On first run it silently downloads its inference
                engine into <code style={T.code}>~/.coreling/</code> and starts it as a background process.
                Your conversations, memory, and model weights never leave your machine.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Installation */}
          <section id="installation">
            <p style={T.eyebrow}>Getting Started</p>
            <h2 style={T.h2}>Installation</h2>
            <p style={T.p}>One command installs Coreling v2. Requires Node.js 22+. Local models download on first use via <code style={T.code}>/model</code>.</p>

            <h3 style={T.h3}>Prerequisites</h3>
            <ul style={T.ul}>
              <li style={T.li}>Python 3.7+</li>
              <li style={T.li}>8 GB+ RAM recommended</li>
              <li style={T.li}>macOS, Linux, or Windows</li>
            </ul>

            <h3 style={T.h3}>macOS / Linux</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>curl -fsSL https://coreling.org/install.sh | bash</code></pre>
            </div>

            <h3 style={T.h3}>Windows (PowerShell)</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>irm https://coreling.org/install.ps1 | iex</code></pre>
            </div>

            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>First launch</p>
              <p style={{ ...T.p, marginBottom: 0 }}>
                On first run Coreling downloads its inference engine (~50 MB) and an open language model (~2 GB).
                This only happens once. Subsequent launches are instant.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Quick Start */}
          <section id="quickstart">
            <p style={T.eyebrow}>Getting Started</p>
            <h2 style={T.h2}>Quick Start</h2>
            <p style={T.p}>Start a session in one command.</p>

            <div style={T.codeBlock}>
              <pre style={T.pre}><code>coreling</code></pre>
            </div>

            <p style={T.p}>You will see an engine selection menu:</p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`  ▶ Uni-Core    Standard   Deep reasoning
    Multi-Core  Fast       Speed + math coprocessor`}</code></pre>
            </div>

            <p style={T.p}>Use arrow keys to select, Enter to confirm. That is it — start chatting.</p>

            <h3 style={T.h3}>Example session</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`  ❯ you  What is the time complexity of quicksort?
  ● coreling  O(n log n) on average, O(n²) worst case.
              Use randomized pivot to keep it fast in practice.

  ❯ you  Remember: I work in Python
  ● coreling  Got it.

  ❯ you  /exit`}</code></pre>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Engine Modes */}
          <section id="modes">
            <p style={T.eyebrow}>Features</p>
            <h2 style={T.h2}>Engine Modes</h2>
            <p style={T.p}>
              Coreling offers two modes selectable at startup.
            </p>

            <h3 style={T.h3}>Uni-Core</h3>
            <p style={T.p}>
              Coreling's standard engine. Best for reasoning, writing, and coding.
              This is the default and recommended mode for most tasks.
            </p>

            <h3 style={T.h3}>Multi-Core</h3>
            <p style={T.p}>
              Coreling's fast engine. Routes arithmetic expressions through a deterministic
              coprocessor — evaluated locally without going through the language model,
              giving exact answers instead of approximations.
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`# Multi-Core detects math automatically:
  ❯ you  What is 1,847 × 293?
  ● coreling  541,171`}</code></pre>
            </div>

            <h3 style={T.h3}>Vision (automatic)</h3>
            <p style={T.p}>
              Drop any image path into the chat — Coreling detects it, ingests the image, and
              auto-switches to its vision model. No extra setup needed.
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`  ❯ you  /Users/me/screenshot.png What does this show?
  ● coreling  The image shows a Python traceback...`}</code></pre>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Memory System */}
          <section id="memory">
            <p style={T.eyebrow}>Features</p>
            <h2 style={T.h2}>Memory System</h2>
            <p style={T.p}>
              Memory is stored in <code style={T.code}>~/.coreling/brain.md</code> — a plain Markdown file
              that acts as Coreling's persistent system prompt.
            </p>
            <p style={T.p}>
              When you tell Coreling a fact, it silently appends a <code style={T.code}>[Learned Memory]</code> entry
              to brain.md. The memory is injected into every future session automatically.
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`# brain.md (example after a few sessions)
You are Coreling, an advanced AI orchestrator...

[Learned Memory]: User works at a fintech startup
[Learned Memory]: User prefers Python 3.12 one-liners`}</code></pre>
            </div>
            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>Edit it directly</p>
              <p style={{ ...T.p, marginBottom: 0 }}>
                <code style={T.code}>brain.md</code> is a plain text file. Open it in any editor to review,
                edit, or delete memories manually. Use <code style={T.code}>/wipe</code> to reset it to factory defaults.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Image Analysis */}
          <section id="vision">
            <p style={T.eyebrow}>Features</p>
            <h2 style={T.h2}>Image Analysis</h2>
            <p style={T.p}>
              Paste any image file path into your message. Coreling copies it to
              <code style={T.code}> ~/.coreling/saved/</code>, encodes it, and switches to
              its vision model automatically — no extra command needed.
            </p>
            <ul style={T.ul}>
              <li style={T.li}>Supports <code style={T.code}>.png</code>, <code style={T.code}>.jpg</code>, <code style={T.code}>.jpeg</code></li>
              <li style={T.li}>Works on macOS, Linux, and Windows paths</li>
              <li style={T.li}>Vision model is pulled on first image use (~4 GB, one-time)</li>
              <li style={T.li}>Session stays in vision mode for subsequent messages</li>
            </ul>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Commands */}
          <section id="commands">
            <p style={T.eyebrow}>Reference</p>
            <h2 style={T.h2}>Commands</h2>

            <h3 style={T.h3}>Launch commands</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`coreling           # Start a new session
coreling --update  # Update to the latest version`}</code></pre>
            </div>

            <h3 style={T.h3}>In-session commands</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`/clear   # Reset conversation history (keeps brain.md)
/wipe    # Reset brain.md to factory defaults
/exit    # Quit Coreling`}</code></pre>
            </div>

            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>/clear vs /wipe</p>
              <p style={{ ...T.p, marginBottom: 0 }}>
                <code style={T.code}>/clear</code> resets the current conversation but keeps your learned memories.
                <code style={T.code}> /wipe</code> erases everything in brain.md — use it to start completely fresh.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Storage Layout */}
          <section id="storage">
            <p style={T.eyebrow}>Reference</p>
            <h2 style={T.h2}>Storage Layout</h2>
            <p style={T.p}>
              Everything Coreling needs lives in <code style={T.code}>~/.coreling/</code>.
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`~/.coreling/
  brain.md        # system prompt + learned memories
  corelingd       # inference engine binary (auto-downloaded)
  artifacts/      # model weights (auto-downloaded)
  saved/          # images you've shared in chat`}</code></pre>
            </div>
            <p style={T.p}>
              To reclaim disk space, delete <code style={T.code}>~/.coreling/artifacts/</code>.
              Models will be re-downloaded on next launch. To fully uninstall, delete the entire
              <code style={T.code}> ~/.coreling/</code> directory and the <code style={T.code}>coreling</code> binary.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Updating */}
          <section id="updating">
            <p style={T.eyebrow}>Reference</p>
            <h2 style={T.h2}>Updating</h2>
            <p style={T.p}>
              Coreling checks for updates automatically in the background. When a new version is available
              you will see a notice at the end of your session.
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`# Update to the latest version
coreling --update`}</code></pre>
            </div>
            <p style={T.p}>
              This re-runs the install script for your platform (macOS/Linux: bash, Windows: PowerShell).
              Your <code style={T.code}>brain.md</code> and saved images are not affected.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}
