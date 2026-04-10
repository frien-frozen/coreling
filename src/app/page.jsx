"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   LOGO  (exact SVG path from coreling.svg)
───────────────────────────────────────────────────────── */
function CorelingLogo({ size = 28, color = "#fff" }) {
  return (
    <svg width={size} height={size * (124.16 / 106.99)} viewBox="0 0 106.99 124.16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M80.25,44.59h0V16c0-.23-.12-.44-.32-.55L53.83.09c-.2-.12-.45-.12-.65,0l-26.42,15.54h0S.32,31.19.32,31.19c-.2.12-.32.33-.32.55v60.56c0,.23.12.44.32.55l26.44,15.56,26.75,15.75v-.02l26.74-15.73h0l26.42-15.56c.2-.12.32-.33.32-.55v-31.61c0-.23-.12-.44-.32-.55l-26.42-15.54ZM81.12,51.91l16.69,9.64c.43.25.43.87,0,1.11l-16.69,9.64c-.43.25-.97-.06-.97-.56v-19.27c0-.5.54-.81.97-.56ZM60.08,32.7l13.95-8.04c.43-.25.97.06.97.56v16.1c0,.5-.54.81-.97.56l-13.95-8.05c-.43-.25-.43-.87,0-1.12ZM74.99,49.8v24.62c0,.23-.12.44-.32.56l-21.29,12.29c-.2.11-.44.11-.64,0l-21.31-12.3c-.2-.11-.32-.33-.32-.56v-24.61c0-.23.12-.44.32-.56l21.31-12.3c.2-.11.44-.11.64,0l21.29,12.3c.2.11.32.33.32.56ZM99.98,88.84c0,.23-.12.44-.32.56l-22.43,12.96h0l-.7.41-23.15,13.35c-.2.11-.44.11-.64,0l-21.62-12.48h0s-1.52-.88-1.52-.88l-23.15-13.35c-.2-.11-.32-.33-.32-.56v-53.46c0-.23.12-.44.32-.56l23.15-13.36,1.52-.88,21.62-12.48c.2-.11.44-.11.64,0l17.63,10.18c.43.25.43.87,0,1.12l-19.46,11.23-1.47.86-23.52,13.57-1.19.69c-.2.11-.32.33-.32.56v31.62c0,.23.12.44.32.56l1.19.69,24.99,14.42,1.2.69c.2.11.44.11.64,0l1.2-.69,24.27-14.01h0l.7-.41,19.45-11.24c.43-.25.97.06.97.56v20.36Z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   PREMIUM CUSTOM SVG ICONS  (hand-drawn, 20×20 grid)
   Thin stroke, geometric, matches the hexagonal logo DNA
───────────────────────────────────────────────────────── */
const Icon = {
  /* Branching fork / task split */
  Fork: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="3.5" r="1.5"/>
      <circle cx="4"  cy="16.5" r="1.5"/>
      <circle cx="16" cy="16.5" r="1.5"/>
      <line x1="10" y1="5" x2="10" y2="9"/>
      <path d="M10 9 C10 12 4 12 4 15"/>
      <path d="M10 9 C10 12 16 12 16 15"/>
    </svg>
  ),
  /* Neural / memory nodes */
  Memory: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <circle cx="10" cy="10" r="2.2"/>
      <circle cx="3.5" cy="5.5" r="1.4"/>
      <circle cx="16.5" cy="5.5" r="1.4"/>
      <circle cx="3.5" cy="14.5" r="1.4"/>
      <circle cx="16.5" cy="14.5" r="1.4"/>
      <line x1="10" y1="7.8" x2="4.6" y2="6.3"/>
      <line x1="10" y1="7.8" x2="15.4" y2="6.3"/>
      <line x1="10" y1="12.2" x2="4.6" y2="13.7"/>
      <line x1="10" y1="12.2" x2="15.4" y2="13.7"/>
    </svg>
  ),
  /* Shield with inner check-line */
  Shield: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2 L17 5 L17 10 C17 14.5 10 18.5 10 18.5 C10 18.5 3 14.5 3 10 L3 5 Z"/>
      <polyline points="7.5,10.2 9.2,12 12.5,8.5"/>
    </svg>
  ),
  /* Hexagonal mesh / model network */
  Mesh: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <polygon points="10,2 13.5,4 13.5,8 10,10 6.5,8 6.5,4"/>
      <polygon points="4,11 6.5,12.4 6.5,15.2 4,16.6 1.5,15.2 1.5,12.4"/>
      <polygon points="16,11 18.5,12.4 18.5,15.2 16,16.6 13.5,15.2 13.5,12.4"/>
      <line x1="6.5" y1="8" x2="4" y2="11"/>
      <line x1="13.5" y1="8" x2="16" y2="11"/>
    </svg>
  ),
  /* Lightning bolt — performance */
  Bolt: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12,2 7,10.5 10.5,10.5 8,18 14,8.5 10,8.5 12,2"/>
    </svg>
  ),
  /* Storage cylinder */
  Storage: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <ellipse cx="10" cy="5.5" rx="6" ry="2.2"/>
      <line x1="4" y1="5.5" x2="4" y2="14.5"/>
      <line x1="16" y1="5.5" x2="16" y2="14.5"/>
      <ellipse cx="10" cy="14.5" rx="6" ry="2.2"/>
      <ellipse cx="10" cy="10" rx="6" ry="2.2"/>
    </svg>
  ),
  /* Terminal prompt */
  Terminal: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3.5" width="16" height="13" rx="2"/>
      <polyline points="6,8 8.5,10 6,12"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  ),
  /* CPU chip */
  Cpu: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <rect x="5.5" y="5.5" width="9" height="9" rx="1.5"/>
      <rect x="7.5" y="7.5" width="5" height="5" rx="0.5"/>
      <line x1="8" y1="3" x2="8" y2="5.5"/>
      <line x1="12" y1="3" x2="12" y2="5.5"/>
      <line x1="8" y1="14.5" x2="8" y2="17"/>
      <line x1="12" y1="14.5" x2="12" y2="17"/>
      <line x1="3" y1="8" x2="5.5" y2="8"/>
      <line x1="3" y1="12" x2="5.5" y2="12"/>
      <line x1="14.5" y1="8" x2="17" y2="8"/>
      <line x1="14.5" y1="12" x2="17" y2="12"/>
    </svg>
  ),
  /* Database stack */
  Database: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <ellipse cx="10" cy="5" rx="6.5" ry="2.5"/>
      <path d="M3.5 5 L3.5 15 C3.5 16.38 6.46 17.5 10 17.5 C13.54 17.5 16.5 16.38 16.5 15 L16.5 5"/>
      <path d="M3.5 10 C3.5 11.38 6.46 12.5 10 12.5 C13.54 12.5 16.5 11.38 16.5 10"/>
    </svg>
  ),
  /* Sparkle / output */
  Spark: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <line x1="10" y1="2" x2="10" y2="5"/>
      <line x1="10" y1="15" x2="10" y2="18"/>
      <line x1="2" y1="10" x2="5" y2="10"/>
      <line x1="15" y1="10" x2="18" y2="10"/>
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
      <line x1="13.66" y1="13.66" x2="15.78" y2="15.78"/>
      <line x1="15.78" y1="4.22" x2="13.66" y2="6.34"/>
      <line x1="6.34" y1="13.66" x2="4.22" y2="15.78"/>
      <circle cx="10" cy="10" r="2.5"/>
    </svg>
  ),
  /* Lock */
  Lock: ({ s = 18, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="12" height="9" rx="2"/>
      <path d="M7 9 V6.5 A3 3 0 0 1 13 6.5 V9"/>
      <circle cx="10" cy="13.5" r="1.2" fill={c} stroke="none"/>
    </svg>
  ),
  /* Download arrow */
  Download: ({ s = 16, c = "#000" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="3" x2="10" y2="13"/>
      <polyline points="6,9.5 10,13.5 14,9.5"/>
      <line x1="3" y1="17" x2="17" y2="17"/>
    </svg>
  ),
  /* Arrow right */
  ArrowR: ({ s = 14, c = "#fff" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="10" x2="17" y2="10"/>
      <polyline points="12,5.5 17,10 12,14.5"/>
    </svg>
  ),
  /* Check */
  Check: ({ s = 14, c = "#52525b" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4,10.5 8.5,15 16,6"/>
    </svg>
  ),
  /* Chevron right */
  ChevR: ({ s = 12, c = "#52525b" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="7,4 13,10 7,16"/>
    </svg>
  ),
  /* GitHub mark */
  GitHub: ({ s = 16, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill={c}>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5C5.30 1.5 1.5 5.30 1.5 10c0 3.75 2.43 6.93 5.8 8.06.42.08.58-.18.58-.4v-1.4c-2.36.51-2.86-1.14-2.86-1.14-.39-.98-.95-1.24-.95-1.24-.77-.53.06-.52.06-.52.85.06 1.3.87 1.3.87.76 1.3 1.99.92 2.47.7.08-.55.3-.92.54-1.13-1.88-.21-3.86-.94-3.86-4.18 0-.92.33-1.68.87-2.27-.09-.21-.38-1.07.08-2.24 0 0 .71-.23 2.32.87A8.1 8.1 0 0 1 10 6.47c.72 0 1.44.1 2.12.28 1.61-1.1 2.32-.87 2.32-.87.46 1.17.17 2.03.08 2.24.54.59.87 1.35.87 2.27 0 3.25-1.98 3.97-3.87 4.18.31.27.58.79.58 1.59v2.36c0 .22.15.48.58.4A8.51 8.51 0 0 0 18.5 10C18.5 5.30 14.70 1.5 10 1.5Z"/>
    </svg>
  ),
  /* Twitter / X */
  Twitter: ({ s = 16, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill={c}>
      <path d="M15.18 2h2.6l-5.68 6.49L18.8 18h-5.23l-4.1-5.36L4.78 18H2.17l6.08-6.95L1.2 2h5.36l3.71 4.84L15.18 2Zm-.9 14.4h1.44L5.75 3.48H4.2l10.08 12.92Z"/>
    </svg>
  ),
  /* External link */
  Ext: ({ s = 12, c = "#71717a" }) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 3h6v6"/>
      <line x1="17" y1="3" x2="9" y2="11"/>
      <path d="M8 5H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────
   SPOTLIGHT CARD
───────────────────────────────────────────────────────── */
function SpotlightCard({ children, style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  return (
    <div ref={ref} style={{
      ...style,
      background: on
        ? `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.05) 0%, transparent 65%), #000`
        : "#000",
    }}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >{children}</div>
  );
}

/* ─────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   ANIMATED TERMINAL
───────────────────────────────────────────────────────── */
const LINES = [
  { t: "prompt",  text: 'coreling run --task "Refactor auth & generate tests"' },
  { t: "info",    text: "  Analyzing complexity…" },
  { t: "route",   text: "  analysis  →  gemma3:27b" },
  { t: "route",   text: "  codegen   →  llama3.2:latest" },
  { t: "model",   label: "gemma3",   text: "Scanned 1,204 lines across 23 files" },
  { t: "model",   label: "llama3.2", text: "Generated refactored module + 18 unit tests" },
  { t: "mem",     text: "  Memory write  ·  auth.context.v3" },
  { t: "success", text: "  ✓  6.2 s  ·  0 bytes left your machine" },
];
const TC = { prompt:"#e4e4e7", info:"#52525b", route:"#71717a", model:"#34d399", mem:"#818cf8", success:"#34d399" };

function TerminalMock() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= LINES.length) return;
    const id = setTimeout(() => setN(v => v + 1), n === 0 ? 800 : 450);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <div style={{ background: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, overflow: "hidden", fontFamily: "'DM Mono', 'Fira Code', monospace", fontSize: 13, width: "100%" }}>
      <div style={{ background: "#0c0c0c", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 7 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />)}
        <span style={{ marginLeft: 12, color: "#3f3f46", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>coreling — zsh</span>
      </div>
      <div style={{ padding: "20px 22px", minHeight: 230, lineHeight: 2 }}>
        {LINES.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 9, color: TC[l.t] }}>
            {l.t === "prompt" && <span style={{ color: "#3f3f46", userSelect: "none", fontWeight: 300 }}>$</span>}
            {l.label && (
              <span style={{ background: l.label === "gemma3" ? "rgba(52,211,153,0.1)" : "rgba(129,140,248,0.1)", color: l.label === "gemma3" ? "#34d399" : "#818cf8", fontSize: 10, padding: "2px 7px", borderRadius: 5, fontWeight: 600, flexShrink: 0, marginTop: 5, letterSpacing: "0.04em" }}>
                {l.label}
              </span>
            )}
            <span style={{ letterSpacing: "-0.01em" }}>{l.text}</span>
            {i === n - 1 && n < LINES.length && (
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}
                style={{ display: "inline-block", width: 7, height: 14, background: "#52525b", borderRadius: 1, marginTop: 5 }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const FEATURES = [
  { Ic: Icon.Fork,    title: "Task Delegation",   desc: "Coreling's router analyzes complexity, domain, and compute — then assigns each subtask to the best local model. Zero config.", tag: "Orchestration" },
  { Ic: Icon.Memory,  title: "Unified Memory",     desc: "A persistent local vector store enriches every session. Context survives restarts, model switches, and project changes.", tag: "Memory" },
  { Ic: Icon.Shield,  title: "100% Local",         desc: "Zero telemetry. Zero cloud calls. Every prompt, completion, and memory artifact stays on-device. Fully air-gap compatible.", tag: "Privacy" },
  { Ic: Icon.Mesh,    title: "Model Mesh",         desc: "Run Gemma 3, Llama 3.2, Mistral, and Phi-3 in parallel as a single unified agent — not isolated chatbots.", tag: "Multi-model" },
  { Ic: Icon.Bolt,    title: "Sub-50ms Routing",   desc: "The Coreling orchestrator adds less than 50 ms overhead. Multi-agent intelligence at native local inference speed.", tag: "Performance" },
  { Ic: Icon.Storage, title: "Plain-text Storage", desc: "Task history, memory graphs, and configs stored as SQLite + JSON on disk. Export, inspect, or version-control everything.", tag: "Transparent" },
];

const STEPS = [
  { Ic: Icon.Terminal,  n: "01", title: "Input",          desc: "Natural language task" },
  { Ic: Icon.Fork,      n: "02", title: "Task Splitter",  desc: "Decomposes into subtasks" },
  { Ic: Icon.Cpu,       n: "03", title: "Local LLMs",     desc: "Best model per subtask" },
  { Ic: Icon.Database,  n: "04", title: "Memory DB",      desc: "Context written locally" },
  { Ic: Icon.Spark,     n: "05", title: "Output",         desc: "Unified coherent result" },
];

const LOGOS = ["Ollama","LM Studio","llama.cpp","Gemma 3","Llama 3.2","Mistral","Phi-3","Qwen 2.5"];

const PLANS = [
  {
    name: "Community", price: "Free", sub: "Open-source core, forever", primary: false, cta: "Download Free",
    features: ["Unlimited local LLM runs","Task delegation engine","Long-term local memory","CLI interface","Community support"],
  },
  {
    name: "Pro", price: "$49", sub: "One-time license · no subscription", primary: true, cta: "Get Pro License",
    features: ["Everything in Community","Visual task graph dashboard","Encrypted config sync (self-hosted)","Priority routing profiles","REST API for automation","Email support"],
  },
];

/* ─────────────────────────────────────────────────────────
   SHARED STYLE TOKENS
───────────────────────────────────────────────────────── */
const T = {
  page:    { background: "#000", color: "#fff", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" },
  wrap:    { maxWidth: 1100, margin: "0 auto", padding: "0 28px" },
  eyebrow: { fontSize: 11, color: "#52525b", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, marginBottom: 16 },
  h2:      { fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#fff", margin: 0 },
  dim:     { color: "#3f3f46" },
  pill:    { fontSize: 10, color: "#52525b", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999, padding: "3px 10px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" },
  iconBox: { width: 38, height: 38, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  hr:      { border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: 0 },
  btnW:    { display: "inline-flex", alignItems: "center", gap: 7, background: "#fff", color: "#000", fontSize: 14, fontWeight: 600, padding: "11px 22px", borderRadius: 9, textDecoration: "none", letterSpacing: "-0.02em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  btnG:    { display: "inline-flex", alignItems: "center", gap: 7, border: "1px solid rgba(255,255,255,0.1)", color: "#71717a", fontSize: 14, fontWeight: 500, padding: "11px 22px", borderRadius: 9, textDecoration: "none", letterSpacing: "-0.02em", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
};

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function CorelingLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    const mouseFn = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", fn);
    window.addEventListener("mousemove", mouseFn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("mousemove", mouseFn);
    };
  }, []);

  return (
    <div style={T.page}>
      {/* Google Fonts — DM Sans + DM Mono */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        a { color: inherit; text-decoration: none; }
        ::selection { background: rgba(255,255,255,0.15); }
      `}</style>

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 62,
        display: "flex", alignItems: "center",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(22px)" : "none",
        background: scrolled ? "rgba(0,0,0,0.84)" : "transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ ...T.wrap, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1100, padding: "0 28px" }}>
          {/* Logo mark + wordmark */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CorelingLogo size={22} color="#fff" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em", color: "#fff" }}>coreling</span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {["Docs","GitHub","Pricing"].map(l => (
              <a key={l} href="#" style={{ fontSize: 14, color: "#71717a", fontWeight: 400, letterSpacing: "-0.01em", transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color="#fff"}
                onMouseLeave={e => e.target.style.color="#71717a"}>{l}</a>
            ))}
          </nav>
          <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={{ ...T.btnW, padding: "8px 18px" }}>
            <Icon.Download s={14} c="#000" /> Download
          </motion.a>
        </div>
      </header>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 28px 80px", overflow: "hidden" }}>
        {/* Moving Background Spotlight */}
        <motion.div
          animate={{
            x: mousePos.x - 700,
            y: mousePos.y - 400,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 50,
            restDelta: 0.001
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1400,
            height: 800,
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(60px)",
          }}
        />

        {/* Pulsing Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1600,
            height: 900,
            background: "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
          {/* Badge */}
          <Reveal delay={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "5px 16px 5px 12px", marginBottom: 44, backdropFilter: "blur(10px)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#a1a1aa", fontFamily: "'DM Mono', monospace", letterSpacing: "0.01em" }}>v1.0 — Now available</span>
              <Icon.ChevR s={11} c="#52525b" />
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.07}>
            <h1 style={{ fontSize: "clamp(52px, 9.5vw, 96px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.95, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
              Local AI,{" "}
              <span style={T.dim}>orchestrated.</span>
            </h1>
          </Reveal>

          {/* Sub */}
          <Reveal delay={0.13}>
            <p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", color: "#71717a", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 46px", letterSpacing: "-0.01em", fontWeight: 400 }}>
              Run multiple local LLMs in parallel. Coreling divides tasks, manages memory, and unifies your AI workflow — without a single byte leaving your machine.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.19}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
              <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={T.btnW}>
                <Icon.Download s={14} c="#000" /> Download for Mac
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={T.btnG}>
                <Icon.GitHub s={15} c="#71717a" /> Star on GitHub <Icon.ArrowR s={13} c="#71717a" />
              </motion.a>
            </div>
          </Reveal>

          {/* Terminal */}
          <Reveal delay={0.26}>
            <TerminalMock />
          </Reveal>

          <Reveal delay={0.34}>
            <p style={{ marginTop: 22, fontSize: 11, color: "#3f3f46", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
              Compatible with Ollama · LM Studio · llama.cpp
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════ */}
      <hr style={T.hr} />
      <div style={{ padding: "24px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 64, animation: "ticker 24s linear infinite", width: "max-content" }}>
          {[...LOGOS,...LOGOS].map((l,i) => (
            <span key={i} style={{ fontSize: 11, color: "#3f3f46", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace" }}>{l}</span>
          ))}
        </div>
      </div>
      <hr style={T.hr} />

      {/* ══ FEATURES BENTO ════════════════════════════════════ */}
      <section style={{ ...T.wrap, padding: "110px 28px 90px" }}>
        <Reveal>
          <p style={T.eyebrow}>Capabilities</p>
          <h2 style={{ ...T.h2, marginBottom: 64 }}>
            Everything local AI<br />
            <span style={T.dim}>was missing.</span>
          </h2>
        </Reveal>
        {/* Bento — 1px separator lines via gap:1 on colored container */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 18, overflow: "hidden" }}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <SpotlightCard style={{ padding: "32px 28px", height: "100%", cursor: "default" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={T.iconBox}><f.Ic s={17} c="#71717a" /></div>
                  <span style={T.pill}>{f.tag}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 10, color: "#fff" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.78, fontWeight: 400 }}>{f.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
      <section style={{ ...T.wrap, padding: "0 28px 110px" }}>
        <Reveal>
          <p style={T.eyebrow}>Architecture</p>
          <h2 style={{ ...T.h2, marginBottom: 72 }}>
            One input.<br />
            <span style={T.dim}>Many models. One output.</span>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, position: "relative" }}>
          <div style={{ position: "absolute", top: 26, left: "8%", right: "8%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)", pointerEvents: "none" }} />
          {STEPS.map((st, i) => (
            <Reveal key={st.title} delay={i * 0.07}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 10px" }}>
                <div style={{ width: 52, height: 52, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", position: "relative", marginBottom: 18, zIndex: 1 }}>
                  <st.Ic s={19} c="#71717a" />
                  <span style={{ position: "absolute", top: -8, right: -8, width: 18, height: 18, borderRadius: "50%", background: "#000", border: "1px solid rgba(255,255,255,0.09)", fontSize: 9, color: "#52525b", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{st.n}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>{st.title}</p>
                <p style={{ fontSize: 11, color: "#3f3f46", lineHeight: 1.55, fontWeight: 400 }}>{st.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ PRIVACY BANNER ════════════════════════════════════ */}
      <section style={{ ...T.wrap, padding: "0 28px 100px" }}>
        <Reveal>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "38px 46px", display: "flex", alignItems: "center", gap: 38, flexWrap: "wrap" }}>
            <div style={T.iconBox}><Icon.Lock s={20} c="#fff" /></div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: 8 }}>Zero cloud. Zero exposure.</h3>
              <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.75, maxWidth: 540 }}>
                No account. No telemetry. No model provider reading your prompts. Coreling was built air-gap-first — your data stays exactly where it belongs.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, padding: "8px 16px", flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 7px #22c55e" }} />
              <span style={{ fontSize: 12, color: "#52525b", whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace" }}>Air-gap compatible</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════ */}
      <section style={{ ...T.wrap, padding: "0 28px 120px" }}>
        <Reveal>
          <p style={T.eyebrow}>Open Source</p>
          <h2 style={{ ...T.h2, marginBottom: 60 }}>Free forever.</h2>
        </Reveal>
        <div style={{ maxWidth: 640 }}>
          <Reveal delay={0.1}>
            <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 22, padding: "40px 38px", background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32 }}>
                <div style={T.iconBox}><Icon.GitHub s={20} c="#fff" /></div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: 6 }}>Proudly Open Source</h3>
                  <p style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>Coreling is and will always be free for everyone. Our mission is to democratize local AI orchestration.</p>
                </div>
              </div>
              <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px", marginBottom: 40 }}>
                {["Unlimited local runs","Multi-model orchestration","Private vector memory","CLI & REST API"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#a1a1aa" }}>
                    <Icon.Check s={14} c="#22c55e" /> {f}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <motion.a href="https://github.com/coreling/coreling" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={T.btnW}>
                  View on GitHub
                </motion.a>
                <div style={{ flex: 1, fontSize: 13, color: "#52525b", lineHeight: 1.5 }}>
                  If you want to support development, consider <a href="#" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 3 }}>buying us a coffee</a> or contributing code.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════ */}
      <section style={{ ...T.wrap, padding: "0 28px 120px" }}>
        <Reveal>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "90px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 360, background: "radial-gradient(ellipse 55% 55% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            {/* Logo mark in CTA */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, position: "relative" }}>
              <CorelingLogo size={40} color="rgba(255,255,255,0.15)" />
            </div>
            <h2 style={{ fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 700, letterSpacing: "-0.045em", marginBottom: 20, position: "relative", lineHeight: 1 }}>
              Your machine.<br /><span style={T.dim}>Your AI stack.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 460, margin: "0 auto 48px", lineHeight: 1.75 }}>
              Stop sending your most sensitive work to someone else's server. Multi-agent AI running entirely on your hardware.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={T.btnW}>
                <Icon.Download s={14} c="#000" /> Download for Mac
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} style={T.btnG}>
                <Icon.GitHub s={15} c="#71717a" /> Star on GitHub <Icon.Ext s={12} c="#52525b" />
              </motion.a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <hr style={T.hr} />
      <footer style={{ padding: "30px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <CorelingLogo size={18} color="#3f3f46" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#3f3f46", fontWeight: 600, letterSpacing: "-0.02em" }}>coreling</span>
          </a>
          <p style={{ fontSize: 12, color: "#3f3f46", fontFamily: "'DM Mono', monospace" }}>© {new Date().getFullYear()} Coreling. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["Privacy","Terms","License"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "#3f3f46", transition: "color 0.15s" }}
                onMouseEnter={e => e.target.style.color="#71717a"}
                onMouseLeave={e => e.target.style.color="#3f3f46"}>{l}</a>
            ))}
            <a href="#" style={{ color: "#3f3f46", transition: "color 0.15s", display:"flex" }}
              onMouseEnter={e => e.currentTarget.style.color="#71717a"}
              onMouseLeave={e => e.currentTarget.style.color="#3f3f46"}>
              <Icon.Twitter s={15} c="currentColor" />
            </a>
            <a href="#" style={{ color: "#3f3f46", transition: "color 0.15s", display:"flex" }}
              onMouseEnter={e => e.currentTarget.style.color="#71717a"}
              onMouseLeave={e => e.currentTarget.style.color="#3f3f46"}>
              <Icon.GitHub s={15} c="currentColor" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
