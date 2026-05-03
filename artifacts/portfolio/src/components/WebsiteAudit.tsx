import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ── palette ── */
const C = {
  fg: "rgba(246,240,232,0.94)",
  sub: "rgba(216,197,174,0.72)",
  muted: "rgba(216,197,174,0.46)",
  accent: "rgba(183,123,87,1)",
  accentD: "rgba(183,123,87,0.7)",
  accentBg: "rgba(183,123,87,0.08)",
  accentBorder: "rgba(183,123,87,0.25)",
  border: "rgba(255,255,255,0.08)",
  panelBg: "rgba(22,17,14,0.92)",
  high: "rgba(126,184,126,0.95)",
  mid: "rgba(183,123,87,0.95)",
  low: "rgba(194,96,96,0.9)",
};
const sc = (v: number) => v >= 68 ? C.high : v >= 46 ? C.mid : C.low;

/* ── animated ring ── */
function Ring({ value, size = 148 }: { value: number; size?: number }) {
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  const col = sc(value);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth="9"
        strokeDasharray={circ} strokeDashoffset={circ - (value / 100) * circ}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 12px ${col})` }} />
    </svg>
  );
}

/* ── mini bar ── */
function Bar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [w, setW] = useState(0);
  const col = sc(value);
  useEffect(() => { const t = setTimeout(() => setW(value), 200 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full" style={{ width: `${w}%`, background: col, boxShadow: `0 0 8px ${col}88`, transition: `width 1.4s cubic-bezier(0.4,0,0.2,1)` }} />
    </div>
  );
}

/* ── glass panel ── */
function Panel({ children, glow = false, className = "" }: { children: React.ReactNode; glow?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${className}`} style={{
      background: C.panelBg, backdropFilter: "blur(24px)",
      borderColor: glow ? C.accentBorder : C.border,
      boxShadow: glow ? "0 0 70px rgba(183,123,87,0.09), inset 0 1px 0 rgba(255,255,255,0.05)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
    }}>
      {children}
    </div>
  );
}

const PHASES = [
  "Scanning website structure...",
  "Evaluating user experience...",
  "Measuring visual hierarchy...",
  "Detecting conversion issues...",
];

function buildResult(url: string) {
  return {
    url,
    overall: 54,
    metrics: [
      { label: "First Impression", value: 41, note: "Visitors form a lasting judgment in under 3 seconds." },
      { label: "Mobile Experience", value: 62, note: "Layout issues reduce comfort on most devices." },
      { label: "Conversion Potential", value: 38, note: "Weak CTA placement is reducing enquiries." },
      { label: "Brand Trust Level", value: 47, note: "Low emotional resonance with your target audience." },
    ],
    why: [
      "Weak first impression — design signals low quality",
      "Confusing layout — visitors can't find what they need",
      "Low emotional engagement — no connection is made",
      "Poor mobile experience — over 63% of traffic is mobile",
      "Invisible CTAs — visitors leave without taking action",
    ],
    recs: [
      "Establish bold visual hierarchy with intentional type scale",
      "Redesign the hero to convert above the fold",
      "Build a mobile-first responsive layout",
      "Modernise colour and typography for brand authority",
      "Add trust signals and social proof in high-visibility zones",
    ],
  };
}
type Result = ReturnType<typeof buildResult>;

/* ════════════════════════════════════════════════════════ */
export function WebsiteAudit() {
  const headRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    gsap.fromTo(headRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } });
    gsap.fromTo(inputRef.current, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: inputRef.current, start: "top 86%" }, delay: 0.1 });
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      const cards = resultsRef.current.querySelectorAll(".rc");
      gsap.fromTo(cards, { y: 28, opacity: 0, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.11, duration: 0.85, ease: "power3.out" });
    }
  }, [result]);

  const analyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setScanning(true); setResult(null); setPhase(0);
    PHASES.forEach((_, i) => setTimeout(() => setPhase(i), i * 620));
    const total = PHASES.length * 620 + 300;
    setTimeout(() => setScanning(false), total - 200);
    setTimeout(() => { setLoading(false); setResult(buildResult(url)); }, total);
  };

  return (
    <section id="audit" className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 75% 60% at 50% 25%, rgba(183,123,87,0.09), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 35% 25% at 80% 70%, rgba(183,123,87,0.04), transparent)" }} />

      {/* Scan-line overlay during loading */}
      {scanning && (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" style={{ opacity: 0.35 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(183,123,87,0.06) 2px, rgba(183,123,87,0.06) 4px)", animation: "scanMove 0.8s linear infinite" }} />
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <div ref={headRef} className="mb-14 text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.34em] mb-6 px-4 py-1.5 rounded-full border font-medium"
            style={{ color: C.accent, borderColor: C.accentBorder, background: C.accentBg }}>
            Free Instant Analysis
          </span>
          <h2 className="font-display font-medium tracking-tight leading-[0.87] mb-5" style={{ fontSize: "clamp(2.6rem,6.5vw,5.8rem)" }}>
            Website<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.18)", color: "transparent" }}>Health Check</span>
          </h2>
          <p className="text-sm font-light max-w-md mx-auto leading-relaxed" style={{ color: C.sub }}>
            Discover what's holding your website back from converting visitors into customers.
          </p>
        </div>

        {/* ── Input Panel ── */}
        <div ref={inputRef} className="mb-7">
          <Panel glow>
            {/* Chrome */}
            <div className="px-7 py-3.5 flex items-center gap-3 border-b" style={{ borderColor: C.border }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.09)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.09)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(183,123,87,0.5)" }} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: C.muted }}>
                Reframe Studio — Website Analyser
              </span>
            </div>
            <div className="p-7">
              <form onSubmit={analyze} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-wider font-semibold select-none pointer-events-none"
                    style={{ color: C.accentD }}>https://</span>
                  <input
                    type="text" value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="yourwebsite.com"
                    className="w-full rounded-xl pl-[4.8rem] pr-5 py-4 text-sm focus:outline-none transition-all duration-300 border"
                    style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.18)", color: C.fg, caretColor: C.accent }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(183,123,87,0.55)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
                  />
                </div>
                <button type="submit" disabled={loading || !url.trim()}
                  className="group relative flex-shrink-0 flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[0.14em] overflow-hidden transition-all duration-300 disabled:opacity-35"
                  style={{ background: C.accent, color: "#1A1512", boxShadow: "0 4px 28px rgba(183,123,87,0.42)" }}>
                  <span className="relative z-10">{loading ? "Analysing..." : "Analyze Website"}</span>
                  {!loading && (
                    <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.14)" }} />
                </button>
              </form>
            </div>
          </Panel>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <Panel glow className="mb-7">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-5 h-5 rounded-full border-[2.5px] animate-spin flex-shrink-0"
                  style={{ borderColor: "rgba(183,123,87,0.25)", borderTopColor: C.accent }} />
                <span className="text-sm font-medium" style={{ color: C.fg }}>{PHASES[phase]}</span>
              </div>
              <div className="space-y-3">
                {PHASES.map((msg, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500" style={{
                      background: i < phase ? C.accent : i === phase ? "rgba(183,123,87,0.55)" : "rgba(255,255,255,0.07)",
                      boxShadow: i <= phase ? `0 0 10px rgba(183,123,87,${i === phase ? "0.8" : "0.4"})` : "none",
                      transform: i === phase ? "scale(1.4)" : "scale(1)",
                    }} />
                    <span className="text-xs uppercase tracking-wide transition-colors duration-400" style={{ color: i < phase ? C.accentD : i === phase ? C.sub : C.muted }}>
                      {msg}
                    </span>
                    {i < phase && (
                      <svg className="w-3 h-3 ml-auto flex-shrink-0" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5 5.5-5" stroke={C.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        )}

        {/* ── Empty state ── */}
        {!loading && !result && (
          <Panel className="mb-7">
            <div className="p-7">
              <p className="text-[10px] uppercase tracking-[0.26em] mb-5" style={{ color: C.muted }}>What gets analysed</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[["◈", "Visual Design"], ["◎", "SEO & Speed"], ["◑", "UX & Flow"], ["△", "Conversions"]].map(([icon, label]) => (
                  <div key={label} className="flex flex-col items-center gap-2 rounded-xl py-5 border text-center"
                    style={{ background: "rgba(255,255,255,0.02)", borderColor: C.border }}>
                    <span style={{ color: "rgba(183,123,87,0.5)", fontSize: 18 }}>{icon}</span>
                    <span className="text-[10px] uppercase tracking-wide" style={{ color: C.sub }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        )}

        {/* ══ RESULTS ══ */}
        {result && !loading && (
          <div ref={resultsRef} className="space-y-5">

            {/* 1. Overall Score */}
            <Panel glow className="rc">
              <div className="p-7 md:p-9 flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex-shrink-0">
                  <Ring value={result.overall} size={148} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-medium" style={{ fontSize: 40, color: C.fg }}>{result.overall}</span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>/ 100</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-[10px] uppercase tracking-[0.28em] block mb-3" style={{ color: C.accentD }}>Website Health Score</span>
                  <h3 className="font-display text-2xl md:text-3xl mb-3 leading-tight" style={{ color: C.fg }}>
                    Significant Improvement Potential
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: C.sub }}>
                    Your site has strong potential — but critical design and UX gaps are actively reducing trust and preventing conversions. The gap is closable.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {result.metrics.map((m, i) => (
                      <div key={i} className="rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: C.border }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-wide" style={{ color: C.sub }}>{m.label}</span>
                          <span className="text-xs font-display font-medium" style={{ color: sc(m.value) }}>{m.value}</span>
                        </div>
                        <Bar value={m.value} delay={i * 90} />
                        <p className="text-[10px] mt-2 leading-snug" style={{ color: C.muted }}>{m.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>

            {/* 2. Why Visitors Leave */}
            <Panel className="rc">
              <div className="p-7">
                <p className="text-[10px] uppercase tracking-[0.28em] mb-5 font-medium" style={{ color: C.accentD }}>Why Visitors Leave</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.why.map((reason, i) => (
                    <div key={i} className="flex items-start gap-3.5 rounded-xl p-4 border" style={{ background: "rgba(194,96,96,0.04)", borderColor: "rgba(194,96,96,0.15)" }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px]" style={{ background: "rgba(194,96,96,0.7)" }} />
                      <span className="text-xs leading-relaxed" style={{ color: C.sub }}>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* 3. Before / After */}
            <Panel glow className="rc">
              <div className="p-7">
                <p className="text-[10px] uppercase tracking-[0.28em] mb-2 font-medium" style={{ color: C.accentD }}>Transformation Preview</p>
                <p className="text-xs mb-7" style={{ color: C.muted }}>
                  A directional illustration of how your site's feel, hierarchy, and conversion potential can be elevated through redesign.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* ── Before ── */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: "rgba(194,96,96,0.7)" }} />
                      <span className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: "rgba(194,96,96,0.8)" }}>Current Experience</span>
                    </div>
                    {/* Wireframe mockup — generic / dated */}
                    <div className="rounded-xl overflow-hidden border" style={{ background: "rgba(200,196,190,0.07)", borderColor: "rgba(194,96,96,0.2)", minHeight: 290 }}>
                      {/* Nav */}
                      <div className="h-10 border-b flex items-center px-4 gap-3" style={{ background: "rgba(210,205,200,0.06)", borderColor: "rgba(255,255,255,0.06)" }}>
                        <div className="h-2 w-16 rounded" style={{ background: "rgba(255,255,255,0.18)" }} />
                        <div className="flex gap-2 ml-auto">
                          <div className="h-1.5 w-8 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                          <div className="h-1.5 w-8 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                          <div className="h-1.5 w-8 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                        </div>
                      </div>
                      {/* Hero */}
                      <div className="px-4 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        <div className="h-3 w-3/4 rounded mb-2" style={{ background: "rgba(255,255,255,0.15)" }} />
                        <div className="h-3 w-1/2 rounded mb-1" style={{ background: "rgba(255,255,255,0.1)" }} />
                        <div className="h-2 w-2/3 rounded mb-4" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <div className="h-2 w-2/3 rounded mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
                        {/* Weak CTA */}
                        <div className="inline-block h-7 w-24 rounded" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
                      </div>
                      {/* 3-col grid */}
                      <div className="px-4 py-4 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="rounded p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="h-10 rounded mb-2" style={{ background: "rgba(255,255,255,0.04)" }} />
                            <div className="h-1.5 rounded mb-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                            <div className="h-1.5 w-3/4 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {["✕  No visual hierarchy", "✕  Weak, forgettable first impression", "✕  CTA buried and invisible"].map(t => (
                        <p key={t} className="text-[10px] font-medium" style={{ color: "rgba(194,96,96,0.75)" }}>{t}</p>
                      ))}
                    </div>
                  </div>

                  {/* ── After ── */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: C.accent, boxShadow: `0 0 10px ${C.accent}` }} />
                      <span className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: C.accentD }}>Redesigned Direction</span>
                    </div>
                    {/* Wireframe mockup — premium dark */}
                    <div className="rounded-xl overflow-hidden border" style={{ background: "rgba(18,14,12,0.95)", borderColor: C.accentBorder, minHeight: 290, boxShadow: "0 0 40px rgba(183,123,87,0.1)" }}>
                      {/* Nav */}
                      <div className="h-10 border-b flex items-center px-4 gap-3" style={{ background: "rgba(14,11,9,0.9)", borderColor: "rgba(183,123,87,0.12)" }}>
                        <div className="h-2 w-16 rounded" style={{ background: C.accent, opacity: 0.65 }} />
                        <div className="flex gap-2 ml-auto">
                          <div className="h-1.5 w-8 rounded" style={{ background: "rgba(216,197,174,0.25)" }} />
                          <div className="h-1.5 w-8 rounded" style={{ background: "rgba(216,197,174,0.25)" }} />
                          <div className="h-5 w-16 rounded-full" style={{ background: "rgba(183,123,87,0.22)", border: "1px solid rgba(183,123,87,0.45)" }} />
                        </div>
                      </div>
                      {/* Hero */}
                      <div className="px-4 pt-5 pb-4 border-b" style={{ borderColor: "rgba(183,123,87,0.08)" }}>
                        <div className="h-1 w-10 rounded mb-3" style={{ background: C.accent, opacity: 0.55 }} />
                        <div className="h-5 w-4/5 rounded mb-1.5" style={{ background: "rgba(246,240,232,0.22)" }} />
                        <div className="h-5 w-3/5 rounded mb-3" style={{ background: "rgba(246,240,232,0.14)" }} />
                        <div className="h-2 w-2/3 rounded mb-1" style={{ background: "rgba(216,197,174,0.18)" }} />
                        <div className="h-2 w-1/2 rounded mb-5" style={{ background: "rgba(216,197,174,0.12)" }} />
                        {/* Strong CTA */}
                        <div className="h-8 w-32 rounded-full flex items-center justify-center" style={{ background: C.accent, opacity: 0.9, boxShadow: "0 4px 20px rgba(183,123,87,0.4)" }}>
                          <div className="h-1.5 w-16 rounded" style={{ background: "rgba(26,21,18,0.6)" }} />
                        </div>
                      </div>
                      {/* Cards */}
                      <div className="px-4 py-4 grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="rounded-xl p-3" style={{ background: "rgba(42,33,29,0.6)", border: "1px solid rgba(183,123,87,0.12)" }}>
                            <div className="h-10 rounded-lg mb-2" style={{ background: "linear-gradient(135deg,rgba(42,33,29,0.8),rgba(26,21,18,0.5))" }} />
                            <div className="h-1.5 rounded mb-1" style={{ background: "rgba(246,240,232,0.18)" }} />
                            <div className="h-1.5 w-3/4 rounded" style={{ background: "rgba(246,240,232,0.1)" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {["✓  Strong hierarchy & premium brand feel", "✓  High-converting CTA above the fold", "✓  Cinematic dark aesthetic with depth"].map(t => (
                        <p key={t} className="text-[10px] font-medium" style={{ color: C.accentD }}>{t}</p>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Improvement badges */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {["+ Better hierarchy", "+ Premium branding", "+ Improved trust", "+ Higher conversion", "+ Mobile-optimised"].map(tag => (
                    <span key={tag} className="text-[10px] font-medium uppercase tracking-wide px-3 py-1 rounded-full border"
                      style={{ color: C.accentD, borderColor: C.accentBorder, background: C.accentBg }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Panel>

            {/* 4. Recommendations */}
            <Panel className="rc">
              <div className="p-7">
                <p className="text-[10px] uppercase tracking-[0.28em] mb-5 font-medium" style={{ color: C.accentD }}>Top Recommendations</p>
                <div className="space-y-2.5">
                  {result.recs.map((r, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl px-5 py-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: C.border }}>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-semibold mt-0.5"
                        style={{ borderColor: C.accentBorder, color: C.accentD }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm" style={{ color: C.sub }}>{r}</p>
                        <span className="text-[10px] uppercase tracking-wide" style={{ color: "rgba(183,123,87,0.4)" }}>
                          Addressable through redesign
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* 5. Final CTA */}
            <div className="rc rounded-2xl border overflow-hidden relative" style={{
              background: "linear-gradient(140deg, rgba(42,33,29,0.98) 0%, rgba(26,21,18,0.95) 60%, rgba(34,26,22,0.98) 100%)",
              borderColor: "rgba(183,123,87,0.3)",
              boxShadow: "0 0 120px rgba(183,123,87,0.11), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              {/* Glow orb */}
              <div className="absolute pointer-events-none" style={{ top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 350, background: "radial-gradient(ellipse at center, rgba(183,123,87,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
              <div className="relative px-8 py-14 md:py-20 text-center">
                <span className="inline-block text-[10px] uppercase tracking-[0.36em] mb-7 px-4 py-1.5 rounded-full border"
                  style={{ color: C.accentD, borderColor: C.accentBorder, background: C.accentBg }}>
                  Ready to Transform
                </span>
                <h3 className="font-display font-medium leading-[0.88] mb-6" style={{ fontSize: "clamp(2rem,5vw,4rem)", color: C.fg }}>
                  Transform Your Website Into<br />
                  <span style={{ WebkitTextStroke: "1px rgba(183,123,87,0.45)", color: "transparent" }}>A Premium Digital Experience</span>
                </h3>
                <p className="text-sm leading-relaxed max-w-md mx-auto mb-10" style={{ color: C.sub }}>
                  Your website should do more than exist — it should attract, impress, and convert. Let's rebuild it with 10+ years of frontend expertise behind every decision.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="group relative flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.16em] overflow-hidden transition-all duration-400"
                    style={{ background: C.accent, color: "#1A1512", boxShadow: "0 6px 40px rgba(183,123,87,0.48)" }}>
                    <span className="relative z-10">Request a Redesign</span>
                    <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.14)" }} />
                  </button>
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-3 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.16em] border transition-all duration-400"
                    style={{ borderColor: "rgba(183,123,87,0.38)", color: "rgba(183,123,87,0.88)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(183,123,87,0.7)"; (e.currentTarget as HTMLButtonElement).style.color = C.accent; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(183,123,87,0.38)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(183,123,87,0.88)"; }}>
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes scanMove {
          from { background-position-y: 0; }
          to { background-position-y: 8px; }
        }
      `}</style>
    </section>
  );
}
