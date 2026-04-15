"use client";
import { useState } from "react";
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
  page: { background: "#000", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },
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
  main: { padding: "40px 40px" },

  sidebarTitle: { fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, fontWeight: 600 },
  sidebarSection: { marginBottom: 28 },
  sidebarLink: { display: "block", fontSize: 14, color: "#71717a", padding: "8px 0", textDecoration: "none", transition: "color 0.15s" },
  sidebarLinkActive: { color: "#fff" },

  eyebrow: { fontSize: 12, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 },
  h1: { fontSize: 42, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.1 },
  h2: { fontSize: 26, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14, marginTop: 40 },
  h3: { fontSize: 18, fontWeight: 600, color: "#e4e4e7", marginBottom: 10, marginTop: 28 },
  p: { fontSize: 15, color: "#a1a1aa", lineHeight: 1.7, marginBottom: 16 },
  code: { background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4, fontSize: "0.9em", fontFamily: "'DM Mono', monospace", color: "#f4f4f5" },
  codeBlock: { background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 20, overflowX: "auto", marginBottom: 20 },
  pre: { margin: 0, fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#e4e4e7", lineHeight: 1.6 },
  ul: { paddingLeft: 20, color: "#a1a1aa", marginBottom: 16 },
  li: { marginBottom: 8, lineHeight: 1.6 },
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
    section: "Core Concepts",
    items: [
      { id: "architecture", label: "Architecture" },
      { id: "agents", label: "Agents" },
      { id: "memory", label: "Memory System" },
    ]
  },
  {
    section: "Guides",
    items: [
      { id: "first-agent", label: "Your First Agent" },
      { id: "multi-agent", label: "Multi-Agent Workflows" },
      { id: "custom-tools", label: "Custom Tools" },
    ]
  },
  {
    section: "Reference",
    items: [
      { id: "cli", label: "CLI Reference" },
      { id: "config", label: "Configuration" },
      { id: "api", label: "API Reference" },
    ]
  },
];

/* ─────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={T.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: rgba(255,255,255,0.15); }
      `}</style>

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <nav style={T.nav}>
        <div style={T.navInner}>
          <a href="/" style={T.logoLink}>
            <CorelingLogo size={22} color="#fff" />
            <span style={T.logoText}>coreling</span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="https://github.com/frien-frozen/corelingpy" target="_blank" rel="noopener noreferrer" style={{ ...T.navLink, display: "flex", alignItems: "center", gap: 6 }}>
              GitHub <Icon.External s={12} />
            </a>
            <a href="/#pricing" style={T.navLink}>Pricing</a>
            <a href="/" style={T.btnGhost}>Back to Home</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: "none", background: "none", border: "none", padding: 8, cursor: "pointer" }}
          >
            {mobileMenuOpen ? <Icon.Close /> : <Icon.Menu />}
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
            <a href="/docs" style={{ ...T.navLink, fontSize: 15 }}>Docs</a>
            <a href="https://github.com/frien-frozen/corelingpy" target="_blank" rel="noopener noreferrer" style={{ ...T.navLink, fontSize: 15 }}>GitHub</a>
            <a href="/#pricing" style={{ ...T.navLink, fontSize: 15 }}>Pricing</a>
            <a href="/" style={{ ...T.btnGhost, textAlign: "center" }}>Back to Home</a>
          </div>
        </motion.div>
      )}

      {/* ══ DOCS LAYOUT ════════════════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", maxWidth: 1200, margin: "0 auto" }}>
        {/* Sidebar */}
        <aside style={T.sidebar}>
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

        {/* Main Content */}
        <main style={T.main}>
          {/* Introduction */}
          <section id="introduction">
            <p style={T.eyebrow}>Getting Started</p>
            <h1 style={T.h1}>Introduction</h1>
            <p style={T.p}>
              Coreling is a local AI orchestration platform that runs multiple LLMs in parallel.
              It manages memory, divides tasks, and unifies your AI workflow — all on your machine.
            </p>
            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>What is Coreling?</p>
              <p style={{ ...T.p, marginBottom: 0 }}>
                Think of Coreling as a conductor for your local AI models. Instead of running one model at a time,
                Coreling coordinates multiple models simultaneously, assigning each subtask to the best-suited model.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Installation */}
          <section id="installation">
            <p style={T.eyebrow}>Getting Started</p>
            <h2 style={T.h2}>Installation</h2>
            <p style={T.p}>Get Coreling up and running in under 2 minutes.</p>

            <h3 style={T.h3}>Prerequisites</h3>
            <ul style={T.ul}>
              <li style={T.li}>Node.js 18+ installed</li>
              <li style={T.li}>At least one local LLM backend (Ollama, LM Studio, or llama.cpp)</li>
              <li style={T.li}>8GB+ RAM recommended for multi-model orchestration</li>
            </ul>

            <h3 style={T.h3}>Install via npm</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>npm install -g coreling</code></pre>
            </div>

            <h3 style={T.h3}>Verify installation</h3>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>coreling --version</code></pre>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Quick Start */}
          <section id="quickstart">
            <p style={T.eyebrow}>Getting Started</p>
            <h2 style={T.h2}>Quick Start</h2>
            <p style={T.p}>Your first multi-agent workflow in 5 steps.</p>

            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`# 1. Initialize a new project
coreling init my-project

# 2. Configure your models
coreling config add ollama://gemma3:4b
coreling config add ollama://llama3.2:3b

# 3. Define your agent roles
coreling agent create researcher --model gemma3:4b
coreling agent create writer --model llama3.2:3b

# 4. Create a workflow
coreling workflow create research-paper

# 5. Run your workflow
coreling run "Research quantum computing advances in 2025"`}</code></pre>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Architecture */}
          <section id="architecture">
            <p style={T.eyebrow}>Core Concepts</p>
            <h2 style={T.h2}>Architecture</h2>
            <p style={T.p}>
              Coreling uses a modular architecture designed for local-first AI orchestration.
            </p>
            <ul style={T.ul}>
              <li style={T.li}><strong>Orchestrator:</strong> Routes tasks to optimal models based on capability and load</li>
              <li style={T.li}><strong>Memory Layer:</strong> Persistent vector store for context across sessions</li>
              <li style={T.li}><strong>Agent Runtime:</strong> Isolated execution environments for each agent</li>
              <li style={T.li}><strong>Tool Registry:</strong> Pluggable tools that agents can invoke</li>
            </ul>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Agents */}
          <section id="agents">
            <p style={T.eyebrow}>Core Concepts</p>
            <h2 style={T.h2}>Agents</h2>
            <p style={T.p}>
              Agents are specialized model instances configured for specific tasks.
            </p>
            <div style={T.note}>
              <p style={{ ...T.noteTitle, marginBottom: 4 }}>Agent Best Practices</p>
              <ul style={{ ...T.ul, marginBottom: 0 }}>
                <li style={T.li}>Use smaller models (2-4B) for simple tasks like summarization</li>
                <li style={T.li}>Reserve larger models (8B+) for complex reasoning</li>
                <li style={T.li}>Give agents descriptive names for easier workflow debugging</li>
              </ul>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Memory System */}
          <section id="memory">
            <p style={T.eyebrow}>Core Concepts</p>
            <h2 style={T.h2}>Memory System</h2>
            <p style={T.p}>
              Coreling stores context in a local vector database, enabling agents to recall
              information across sessions and projects.
            </p>
            <p style={T.p}>
              Memory is stored as plain-text SQLite + JSON files in <code style={T.code}>~/.coreling/memory</code>,
              making it easy to inspect, backup, or version-control.
            </p>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* CLI Reference */}
          <section id="cli">
            <p style={T.eyebrow}>Reference</p>
            <h2 style={T.h2}>CLI Reference</h2>
            <p style={T.p}>Complete command reference for the Coreling CLI.</p>

            <h3 style={T.h3}>coreling init</h3>
            <p style={T.p}>Initialize a new Coreling project.</p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`coreling init <project-name>
coreling init my-ai-assistant --template agent`}</code></pre>
            </div>

            <h3 style={T.h3}>coreling config</h3>
            <p style={T.p}>Manage model configurations.</p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`coreling config list
coreling config add <model-url>
coreling config remove <model-name>`}</code></pre>
            </div>

            <h3 style={T.h3}>coreling agent</h3>
            <p style={T.p}>Create and manage agents.</p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`coreling agent list
coreling agent create <name> --model <model>
coreling agent delete <name>`}</code></pre>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "40px 0" }} />

          {/* Configuration */}
          <section id="config">
            <p style={T.eyebrow}>Reference</p>
            <h2 style={T.h2}>Configuration</h2>
            <p style={T.p}>Configuration file reference and options.</p>
            <p style={T.p}>
              Coreling uses a <code style={T.code}>config.json</code> file in your project directory.
              Here is a complete example:
            </p>
            <div style={T.codeBlock}>
              <pre style={T.pre}><code>{`{
  "models": [
    {
      "name": "gemma3",
      "url": "http://localhost:11434",
      "model": "gemma3:4b"
    },
    {
      "name": "llama3",
      "url": "http://localhost:11434",
      "model": "llama3.2:3b"
    }
  ],
  "memory": {
    "enabled": true,
    "path": "~/.coreling/memory",
    "dimensions": 384
  },
  "orchestrator": {
    "timeout": 30000,
    "maxConcurrent": 4
  }
}`}</code></pre>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
