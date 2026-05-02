import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─── colour helpers ──────────────────────────────────── */
const T = { fg: "rgba(246,240,232,0.92)", sub: "rgba(216,197,174,0.68)", muted: "rgba(216,197,174,0.42)", accent: "rgba(183,123,87,1)", accentDim: "rgba(183,123,87,0.65)", high: "rgba(126,184,126,0.9)", mid: "rgba(183,123,87,0.9)", low: "rgba(194,96,96,0.85)", border: "rgba(255,255,255,0.07)", accentBorder: "rgba(183,123,87,0.22)", panel: "rgba(22,17,14,0.88)" };
const scoreColor = (v: number) => v >= 70 ? T.high : v >= 45 ? T.mid : T.low;

/* ─── animated ring ───────────────────────────────────── */
function Ring({ value, size = 136 }: { value: number; size?: number }) {
  const r = size / 2 - 13;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(value);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={circ - (value / 100) * circ}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 10px ${color})` }}
      />
    </svg>
  );
}

/* ─── animated bar ────────────────────────────────────── */
function Bar({ value, delay = 0, height = 4 }: { value: number; delay?: number; height?: number }) {
  const [w, setW] = useState(0);
  const color = scoreColor(value);
  useEffect(() => { const t = setTimeout(() => setW(value), 250 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full" style={{ width: `${w}%`, background: color, boxShadow: `0 0 10px ${color}66`, transition: `width 1.4s cubic-bezier(0.4,0,0.2,1)` }} />
    </div>
  );
}

/* ─── small metric row ────────────────────────────────── */
function Metric({ label, value, note, delay }: { label: string; value: number; note: string; delay?: number }) {
  return (
    <div className="py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs" style={{ color: T.sub }}>{label}</span>
        <span className="text-xs font-medium font-display" style={{ color: scoreColor(value) }}>{value}/100</span>
      </div>
      <Bar value={value} delay={delay} />
      <p className="text-[10px] mt-1.5 leading-snug" style={{ color: T.muted }}>{note}</p>
    </div>
  );
}

/* ─── glass panel wrapper ─────────────────────────────── */
function Panel({ children, glow = false, className = "" }: { children: React.ReactNode; glow?: boolean; className?: string }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${className}`} style={{
      background: T.panel, backdropFilter: "blur(20px)",
      borderColor: glow ? T.accentBorder : T.border,
      boxShadow: glow ? "0 0 60px rgba(183,123,87,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
    }}>
      {children}
    </div>
  );
}

/* ─── section label ───────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.28em] mb-5 font-medium" style={{ color: T.accentDim }}>{children}</p>;
}

/* ─── loading messages ────────────────────────────────── */
const PHASES = [
  "Scanning website structure...",
  "Evaluating user experience...",
  "Measuring visual hierarchy...",
  "Checking mobile responsiveness...",
  "Analysing conversion opportunities...",
  "Detecting trust signals...",
  "Comparing industry standards...",
];

/* ─── mock data ───────────────────────────────────────── */
function buildResult(url: string) {
  return {
    url, overall: 58,
    firstImpression: [
      { label: "Modern Feel", value: 44, note: "Design language appears dated relative to premium competitors." },
      { label: "Premium Appearance", value: 38, note: "Colour and typography choices reduce perceived brand value." },
      { label: "Trustworthiness", value: 51, note: "Some trust signals are missing or poorly placed above the fold." },
      { label: "Visual Hierarchy", value: 47, note: "Attention is scattered — no clear focal point guides the eye." },
      { label: "Emotional Impact", value: 35, note: "Visitors feel little connection or urgency to take action." },
    ],
    conversion: { loss: 68, cta: 32, engagement: 45, retention: 41 },
    mobile: { score: 62, notes: ["Inconsistent tap target sizes on mobile navigation.", "Font sizes reduce below comfortable reading threshold at 375px.", "Hero section layout collapses poorly on small screens.", "Padding and spacing are not optimised for thumb navigation."] },
    competitor: [
      { label: "Visual Quality", yours: 38, avg: 72 },
      { label: "Brand Positioning", yours: 42, avg: 68 },
      { label: "User Experience", yours: 51, avg: 74 },
      { label: "Trust Level", yours: 49, avg: 70 },
      { label: "Modern Design", yours: 35, avg: 77 },
    ],
    brand: { current: ["Generic", "Forgettable", "Low emotional engagement", "Lacks premium signalling"], suggested: ["Premium", "Memorable", "High emotional resonance", "Conversion-focused"] },
    recommendations: [
      "Establish a clear visual hierarchy with intentional typography scale",
      "Redesign the hero section with a bold, conversion-optimised CTA above the fold",
      "Modernise colour palette to signal quality and build subconscious trust",
      "Improve mobile layout with responsive spacing and accessible tap targets",
      "Add authentic social proof, trust badges, and credibility indicators",
      "Redesign the conversion journey — reduce friction between awareness and action",
      "Optimise page speed and core web vitals for SEO and user experience",
    ],
    impact: [
      { stat: "+42%", label: "User Engagement" },
      { stat: "+31%", label: "Conversion Potential" },
      { stat: "+Premium", label: "Brand Perception" },
      { stat: "+Stronger", label: "Customer Trust" },
    ],
  };
}
type Result = ReturnType<typeof buildResult>;

/* ═══════════════════════════════════════════════════════ */
export function WebsiteAudit() {
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 82%" } });
    gsap.fromTo(panelRef.current, { y: 40, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: panelRef.current, start: "top 84%" }, delay: 0.12 });
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      const items = resultsRef.current.querySelectorAll(".reveal-card");
      gsap.fromTo(items, { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 0.9, ease: "power3.out" });
    }
  }, [result]);

  const analyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true); setResult(null); setPhase(0);
    PHASES.forEach((_, i) => setTimeout(() => setPhase(i), i * 550));
    setTimeout(() => { setLoading(false); setResult(buildResult(url)); }, PHASES.length * 550 + 200);
  };

  return (
    <section id="audit" className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 65% at 50% 30%, rgba(183,123,87,0.08), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 30% at 20% 60%, rgba(183,123,87,0.04), transparent)" }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-16 text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.32em] mb-6 px-4 py-1.5 rounded-full border font-medium"
            style={{ color: T.accent, borderColor: T.accentBorder, background: "rgba(183,123,87,0.07)" }}>
            Free Instant Analysis
          </span>
          <h2 className="font-display font-medium tracking-tight leading-[0.87] mb-5" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}>
            Website<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.18)", color: "transparent" }}>Health Check</span>
          </h2>
          <p className="text-base font-light max-w-lg mx-auto leading-relaxed" style={{ color: T.sub }}>
            Discover what's holding your website back from converting visitors into customers.
          </p>
        </div>

        {/* ── Input Panel ── */}
        <div ref={panelRef}>
          <Panel glow className="mb-8">
            {/* Chrome bar */}
            <div className="px-7 py-4 flex items-center gap-3 border-b" style={{ borderColor: T.border }}>
              <div className="flex gap-1.5">
                {["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", T.accent].map((bg, i) => (
                  <span key={i} className="w-3 h-3 rounded-full" style={{ background: bg, opacity: i === 2 ? 0.55 : 1 }} />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: T.muted }}>Reframe Studio — Website Analyser</span>
            </div>
            <div className="p-7">
              <p className="text-sm mb-5 leading-relaxed" style={{ color: T.sub }}>
                Enter your website URL below and receive a full diagnostic report in seconds — no sign-up required.
              </p>
              <form onSubmit={analyze} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-wider font-semibold select-none"
                    style={{ color: T.accentDim }}>https://</span>
                  <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="yourwebsite.com"
                    className="w-full rounded-xl pl-20 pr-5 py-4 text-sm focus:outline-none transition-all duration-300 border"
                    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.14)", color: T.fg, caretColor: T.accent }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(183,123,87,0.5)")}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")} />
                </div>
                <button type="submit" disabled={loading || !url.trim()}
                  className="group relative flex-shrink-0 flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-[0.14em] overflow-hidden transition-all duration-300 disabled:opacity-40"
                  style={{ background: T.accent, color: "#1A1512", boxShadow: "0 4px 28px rgba(183,123,87,0.38), 0 0 0 1px rgba(183,123,87,0.2)" }}>
                  <span className="relative z-10">{loading ? "Analysing..." : "Analyze Website"}</span>
                  {!loading && (
                    <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.14)" }} />
                </button>
              </form>
            </div>
          </Panel>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <Panel glow className="mb-8">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-6 h-6 rounded-full border-[2.5px] animate-spin flex-shrink-0"
                  style={{ borderColor: "rgba(183,123,87,0.3)", borderTopColor: T.accent }} />
                <span className="text-sm font-medium" style={{ color: T.fg }}>{PHASES[phase]}</span>
              </div>
              <div className="space-y-3">
                {PHASES.map((msg, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500" style={{
                      background: i < phase ? T.accent : i === phase ? "rgba(183,123,87,0.6)" : "rgba(255,255,255,0.08)",
                      boxShadow: i <= phase ? `0 0 10px rgba(183,123,87,${i === phase ? "0.7" : "0.4"})` : "none",
                      transform: i === phase ? "scale(1.3)" : "scale(1)",
                    }} />
                    <span className="text-xs uppercase tracking-wide transition-colors duration-400" style={{ color: i < phase ? T.accentDim : i === phase ? T.sub : T.muted }}>
                      {msg}
                    </span>
                    {i < phase && (
                      <svg className="w-3.5 h-3.5 flex-shrink-0 ml-auto" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke={T.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
          <Panel className="mb-8">
            <div className="p-7">
              <SectionLabel>Diagnostic Categories</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                {[
                  ["◈", "Visual Design Score"],
                  ["◎", "SEO & Performance"],
                  ["◻", "Mobile Responsiveness"],
                  ["◑", "User Experience"],
                  ["△", "Conversion Potential"],
                  ["◇", "Trust & Credibility"],
                ].map(([icon, label], i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-4 border"
                    style={{ background: "rgba(255,255,255,0.025)", borderColor: T.border }}>
                    <span style={{ color: "rgba(183,123,87,0.55)", fontSize: 16 }}>{icon}</span>
                    <span className="text-xs leading-snug" style={{ color: T.sub }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="text-center py-5 rounded-xl border" style={{ background: "rgba(183,123,87,0.04)", borderColor: T.accentBorder, borderStyle: "dashed" }}>
                <p className="text-xs" style={{ color: T.muted }}>Enter your URL above — your full diagnostic generates in seconds</p>
              </div>
            </div>
          </Panel>
        )}

        {/* ══════════════ RESULTS DASHBOARD ══════════════ */}
        {result && !loading && (
          <div ref={resultsRef} className="space-y-5">

            {/* 1. Overall Score */}
            <Panel glow className="reveal-card">
              <div className="p-7 md:p-9">
                <SectionLabel>Overall Website Score</SectionLabel>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative flex-shrink-0">
                    <Ring value={result.overall} size={136} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-4xl font-medium" style={{ color: T.fg }}>{result.overall}</span>
                      <span className="text-[10px] uppercase tracking-widest" style={{ color: T.muted }}>/ 100</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl mb-3 leading-tight" style={{ color: T.fg }}>
                      Below Industry Average
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: T.sub }}>
                      Your website has strong potential, but several design and UX issues are actively reducing trust and conversions. Visitors are making a judgment within 3 seconds — and most are leaving.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Poor First Impression", "Low Conversion Clarity", "Outdated Visual Language"].map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wide px-3 py-1 rounded-full border"
                          style={{ color: T.low, borderColor: "rgba(194,96,96,0.3)", background: "rgba(194,96,96,0.08)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* 2. First Impression Analysis */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>First Impression Analysis</SectionLabel>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: T.sub }}>
                  Visitors form an irreversible opinion within 50 milliseconds of landing on your site. Here's what they're feeling:
                </p>
                <div>
                  {result.firstImpression.map((m, i) => (
                    <Metric key={i} label={m.label} value={m.value} note={m.note} delay={i * 100} />
                  ))}
                </div>
              </div>
            </Panel>

            {/* 3. Conversion Loss */}
            <Panel glow className="reveal-card" >
              <div className="p-7">
                <SectionLabel>Conversion Loss Estimation</SectionLabel>
                <div className="rounded-xl p-6 mb-6 border" style={{ background: "rgba(194,96,96,0.06)", borderColor: "rgba(194,96,96,0.2)" }}>
                  <p className="text-sm font-medium mb-1" style={{ color: "rgba(246,240,232,0.88)" }}>
                    Your website may be losing up to <span style={{ color: T.low }}>68% of potential customers</span> due to weak visual structure and low conversion clarity.
                  </p>
                  <p className="text-xs" style={{ color: T.muted }}>
                    Users who leave in the first 10 seconds rarely return. First impressions are permanent.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Estimated Conversion Loss", value: result.conversion.loss, suffix: "%" },
                    { label: "CTA Visibility Score", value: result.conversion.cta, suffix: "/100" },
                    { label: "Engagement Potential", value: result.conversion.engagement, suffix: "/100" },
                    { label: "Attention Retention", value: result.conversion.retention, suffix: "/100" },
                  ].map((m, i) => (
                    <div key={i} className="rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.025)", borderColor: T.border }}>
                      <span className="text-[10px] uppercase tracking-[0.18em] block mb-3" style={{ color: T.muted }}>{m.label}</span>
                      <span className="font-display text-2xl font-medium block mb-3" style={{ color: scoreColor(m.label.includes("Loss") ? 100 - m.value : m.value) }}>
                        {m.value}{m.suffix}
                      </span>
                      <Bar value={m.label.includes("Loss") ? m.value : m.value} delay={i * 90} />
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* 4. Mobile Analysis */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>Mobile Experience Analysis</SectionLabel>
                <div className="flex flex-col md:flex-row gap-7 items-start">
                  {/* Phone mockup — pure CSS */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <div className="relative rounded-[2.2rem] border-[5px] overflow-hidden" style={{
                      width: 140, height: 240, borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(42,33,29,0.7)", boxShadow: "0 0 40px rgba(0,0,0,0.6)"
                    }}>
                      <div className="w-12 h-1 rounded-full mx-auto mt-3 mb-4" style={{ background: "rgba(255,255,255,0.15)" }} />
                      {/* Mocked broken layout */}
                      <div className="px-3 space-y-1.5">
                        <div className="h-2.5 rounded" style={{ background: "rgba(194,96,96,0.3)", width: "110%" }} />
                        <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.1)" }} />
                        <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.07)", width: "80%" }} />
                        <div className="h-1.5 rounded mt-2" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <div className="h-6 rounded mt-2" style={{ background: "rgba(194,96,96,0.18)", border: "1px solid rgba(194,96,96,0.3)" }} />
                        <div className="h-1.5 rounded mt-1" style={{ background: "rgba(255,255,255,0.06)", width: "60%" }} />
                        <div className="h-8 rounded mt-2" style={{ background: "rgba(255,255,255,0.04)" }} />
                        <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "90%" }} />
                        <div className="h-1.5 rounded" style={{ background: "rgba(255,255,255,0.05)", width: "70%" }} />
                      </div>
                      <div className="absolute top-[52px] left-0 right-0 h-px" style={{ background: "rgba(194,96,96,0.5)" }} />
                      <div className="absolute top-[52px] right-0 px-1.5 py-0.5 text-[7px] rounded-bl" style={{ background: "rgba(194,96,96,0.4)", color: "#fff" }}>Overflow</div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: T.low }} />
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>Mobile Score: {result.mobile.score}/100</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {result.mobile.notes.map((note, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: T.border }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: T.low }} />
                        <span className="text-xs leading-relaxed" style={{ color: T.sub }}>{note}</span>
                      </div>
                    ))}
                    <div className="rounded-xl p-4 border" style={{ background: "rgba(183,123,87,0.06)", borderColor: T.accentBorder }}>
                      <p className="text-xs leading-relaxed" style={{ color: T.sub }}>
                        <span style={{ color: T.accent }}>63% of web traffic</span> comes from mobile devices. An inconsistent mobile experience is directly costing you customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* 5. Competitor Comparison */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>Competitor Comparison</SectionLabel>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: T.sub }}>
                  How your website measures up against industry-standard competitors in your market:
                </p>
                <div className="space-y-5">
                  {result.competitor.map((c, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs" style={{ color: T.sub }}>{c.label}</span>
                        <div className="flex items-center gap-4 text-[10px] uppercase tracking-wide">
                          <span style={{ color: scoreColor(c.yours) }}>You: {c.yours}</span>
                          <span style={{ color: T.muted }}>Industry: {c.avg}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Bar value={c.avg} delay={i * 80} height={6} />
                        <div className="absolute top-0 left-0 h-full rounded-full overflow-hidden" style={{ width: `${c.yours}%`, transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms` }}>
                          <div className="h-full" style={{ background: scoreColor(c.yours), boxShadow: `0 0 10px ${scoreColor(c.yours)}` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[["Below Average", T.low], ["Outdated", T.low], ["Lacks Differentiation", T.mid], ["Strong Potential", T.accent]].map(([label, color]) => (
                    <div key={label} className="text-center py-3 px-2 rounded-xl border" style={{ background: "rgba(255,255,255,0.02)", borderColor: T.border }}>
                      <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* 6. Brand Perception */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>What Your Website Communicates</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="rounded-xl p-6 border" style={{ background: "rgba(194,96,96,0.06)", borderColor: "rgba(194,96,96,0.2)" }}>
                    <span className="text-[10px] uppercase tracking-[0.24em] block mb-4" style={{ color: "rgba(194,96,96,0.8)" }}>Current Brand Feel</span>
                    <div className="space-y-2.5">
                      {result.brand.current.map(b => (
                        <div key={b} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(194,96,96,0.7)" }} />
                          <span className="text-sm" style={{ color: T.sub }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl p-6 border" style={{ background: "rgba(183,123,87,0.06)", borderColor: T.accentBorder }}>
                    <span className="text-[10px] uppercase tracking-[0.24em] block mb-4" style={{ color: T.accentDim }}>After Redesign</span>
                    <div className="space-y-2.5">
                      {result.brand.suggested.map(b => (
                        <div key={b} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: T.accent }} />
                          <span className="text-sm" style={{ color: T.sub }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* 7. Attention Simulation */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>User Attention Simulation</SectionLabel>
                <p className="text-xs mb-5" style={{ color: T.sub }}>
                  Where visitors actually focus — and where your website is losing them:
                </p>
                <div className="rounded-xl overflow-hidden relative" style={{ height: 220, background: "rgba(15,12,10,0.8)" }}>
                  {/* Heatmap zones */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0">
                    {[
                      { col: 1, row: 1, size: "large", heat: 0.8, label: "Logo" },
                      { col: 2, row: 1, size: "small", heat: 0.3, label: "" },
                      { col: 3, row: 1, size: "small", heat: 0.2, label: "" },
                      { col: 4, row: 1, size: "medium", heat: 0.55, label: "Nav" },
                      { col: 1, row: 2, size: "large", heat: 0.9, label: "Hero" },
                      { col: 2, row: 2, size: "medium", heat: 0.5, label: "" },
                      { col: 3, row: 2, size: "small", heat: 0.15, label: "CTA?" },
                      { col: 4, row: 2, size: "small", heat: 0.1, label: "" },
                      { col: 1, row: 3, size: "small", heat: 0.2, label: "" },
                      { col: 2, row: 3, size: "small", heat: 0.15, label: "" },
                      { col: 3, row: 3, size: "small", heat: 0.08, label: "Drop" },
                      { col: 4, row: 3, size: "small", heat: 0.05, label: "" },
                    ].map((z, i) => {
                      const heatColor = z.heat > 0.6 ? `rgba(183,123,87,${z.heat * 0.7})` : z.heat > 0.3 ? `rgba(183,123,87,${z.heat * 0.4})` : `rgba(194,96,96,${z.heat * 0.3})`;
                      return (
                        <div key={i} className="relative flex items-center justify-center" style={{ background: heatColor, transition: "all 2s ease", animation: z.heat > 0.6 ? "heatPulse 3s ease-in-out infinite" : "none" }}>
                          {z.label && <span className="text-[9px] uppercase tracking-wide font-medium" style={{ color: z.heat > 0.5 ? T.fg : "rgba(194,96,96,0.8)" }}>{z.label}</span>}
                        </div>
                      );
                    })}
                  </div>
                  {/* Overlay labels */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-2 rounded-sm" style={{ background: "rgba(183,123,87,0.6)" }} />
                      <span className="text-[9px]" style={{ color: T.muted }}>High attention</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-2 rounded-sm" style={{ background: "rgba(194,96,96,0.3)" }} />
                      <span className="text-[9px]" style={{ color: T.muted }}>Attention drop</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full border text-[9px] uppercase tracking-wider"
                    style={{ background: "rgba(194,96,96,0.1)", borderColor: "rgba(194,96,96,0.3)", color: "rgba(194,96,96,0.85)" }}>
                    Weak CTA placement detected
                  </div>
                </div>
              </div>
            </Panel>

            {/* 8. Before / After */}
            <Panel glow className="reveal-card">
              <div className="p-7">
                <SectionLabel>Transformation Preview</SectionLabel>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: T.sub }}>
                  A directional illustration of how your website's visual experience and conversion architecture could be elevated:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Before */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] mb-3 flex items-center gap-2" style={{ color: "rgba(194,96,96,0.75)" }}>
                      <div className="w-4 h-px" style={{ background: "rgba(194,96,96,0.5)" }} />
                      Current Experience
                    </div>
                    <div className="rounded-xl overflow-hidden border" style={{ background: "rgba(200,195,190,0.08)", borderColor: "rgba(194,96,96,0.2)", minHeight: 200 }}>
                      <div className="h-8 flex items-center px-4 gap-3" style={{ background: "rgba(220,215,210,0.06)" }}>
                        <div className="w-12 h-2 rounded" style={{ background: "rgba(255,255,255,0.2)" }} />
                        <div className="flex gap-2 ml-auto">
                          {[8, 6, 6].map((w, i) => <div key={i} className="h-1.5 rounded" style={{ width: `${w * 4}px`, background: "rgba(255,255,255,0.12)" }} />)}
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="h-16 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />
                        <div className="h-2 rounded w-3/4" style={{ background: "rgba(255,255,255,0.1)" }} />
                        <div className="h-2 rounded w-1/2" style={{ background: "rgba(255,255,255,0.07)" }} />
                        <div className="h-8 rounded mt-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {[1, 2, 3].map(i => <div key={i} className="h-14 rounded" style={{ background: "rgba(255,255,255,0.05)" }} />)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      {["No visual hierarchy", "Generic layout", "Weak CTA placement"].map(t => (
                        <div key={t} className="flex items-center gap-2 text-[10px]" style={{ color: "rgba(194,96,96,0.75)" }}>
                          <span>✕</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] mb-3 flex items-center gap-2" style={{ color: T.accentDim }}>
                      <div className="w-4 h-px" style={{ background: T.accentDim }} />
                      Potential Redesign Direction
                    </div>
                    <div className="rounded-xl overflow-hidden border" style={{ background: "rgba(26,21,18,0.9)", borderColor: T.accentBorder, minHeight: 200 }}>
                      <div className="h-8 flex items-center px-4 gap-3" style={{ background: "rgba(22,17,14,0.8)" }}>
                        <div className="w-14 h-2 rounded" style={{ background: T.accent, opacity: 0.7 }} />
                        <div className="flex gap-2 ml-auto">
                          {[6, 6, 6].map((_, i) => <div key={i} className="h-1.5 w-6 rounded" style={{ background: "rgba(183,123,87,0.3)" }} />)}
                          <div className="h-5 w-14 rounded-full" style={{ background: "rgba(183,123,87,0.25)", border: "1px solid rgba(183,123,87,0.4)" }} />
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="h-16 rounded" style={{ background: "linear-gradient(135deg, rgba(42,33,29,0.8), rgba(26,21,18,0.6))", border: "1px solid rgba(183,123,87,0.1)" }} />
                        <div className="h-2 rounded w-3/4" style={{ background: "rgba(246,240,232,0.22)" }} />
                        <div className="h-1.5 rounded w-1/2" style={{ background: "rgba(216,197,174,0.15)" }} />
                        <div className="h-8 rounded-full mt-3 w-32" style={{ background: T.accent, opacity: 0.85 }} />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {[1, 2, 3].map(i => <div key={i} className="h-14 rounded-xl" style={{ background: "rgba(42,33,29,0.6)", border: "1px solid rgba(183,123,87,0.1)" }} />)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      {["Strong visual hierarchy", "Cinematic dark aesthetic", "High-converting CTA"].map(t => (
                        <div key={t} className="flex items-center gap-2 text-[10px]" style={{ color: T.accentDim }}>
                          <span>✓</span> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* 9. Redesign Opportunity */}
            <Panel glow className="reveal-card">
              <div className="p-7 text-center">
                <SectionLabel>Redesign Opportunity</SectionLabel>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border mb-5" style={{ background: "rgba(183,123,87,0.1)", borderColor: T.accentBorder }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: T.accent, boxShadow: `0 0 10px ${T.accent}`, animation: "pulse 2s infinite" }} />
                  <span className="font-display text-lg tracking-wide" style={{ color: T.accent }}>HIGH</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: T.sub }}>Opportunity Score</span>
                </div>
                <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: T.sub }}>
                  Your business has strong potential for dramatically improved engagement, trust, and conversion through a modern redesign. The gap between your current site and your competitors is a direct revenue opportunity.
                </p>
              </div>
            </Panel>

            {/* 10. Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-card">
              {result.impact.map((m, i) => (
                <div key={i} className="rounded-2xl p-6 text-center border" style={{ background: T.panel, backdropFilter: "blur(20px)", borderColor: T.accentBorder, boxShadow: "0 0 40px rgba(183,123,87,0.05)" }}>
                  <span className="font-display text-2xl md:text-3xl block mb-2" style={{ color: T.accent }}>{m.stat}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: T.sub }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* 11. Recommendations */}
            <Panel className="reveal-card">
              <div className="p-7">
                <SectionLabel>Instant Recommendations</SectionLabel>
                <div className="space-y-3">
                  {result.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-4 rounded-xl p-5 border" style={{ background: "rgba(255,255,255,0.02)", borderColor: T.border }}>
                      <span className="w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-[10px] font-medium mt-0.5"
                        style={{ borderColor: T.accentBorder, color: T.accentDim }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm mb-1" style={{ color: T.sub }}>{r}</p>
                        <span className="text-[10px] uppercase tracking-wide" style={{ color: "rgba(183,123,87,0.45)" }}>
                          Can be solved through redesign optimisation
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* Final CTA */}
            <div className="reveal-card rounded-2xl border overflow-hidden" style={{
              background: "linear-gradient(135deg, rgba(42,33,29,0.95) 0%, rgba(26,21,18,0.9) 50%, rgba(34,26,22,0.95) 100%)",
              borderColor: "rgba(183,123,87,0.28)",
              boxShadow: "0 0 100px rgba(183,123,87,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              {/* Glow orb */}
              <div className="absolute pointer-events-none" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(183,123,87,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
              <div className="relative p-10 md:p-14 text-center">
                <span className="text-[10px] uppercase tracking-[0.34em] block mb-6" style={{ color: "rgba(183,123,87,0.65)" }}>Ready to Transform</span>
                <h3 className="font-display font-medium leading-tight mb-5" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", color: T.fg }}>
                  Transform Your Website Into<br />A Premium Digital Experience
                </h3>
                <p className="text-sm leading-relaxed max-w-lg mx-auto mb-10" style={{ color: T.sub }}>
                  Your website should do more than exist — it should attract, impress, and convert. Let's rebuild it from the ground up with 10+ years of frontend expertise behind every decision.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="group relative flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-[0.16em] overflow-hidden transition-all duration-400"
                    style={{ background: T.accent, color: "#1A1512", boxShadow: "0 6px 36px rgba(183,123,87,0.45)" }}>
                    <span className="relative z-10">Request a Redesign</span>
                    <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(255,255,255,0.15)" }} />
                  </button>
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="group flex items-center gap-3 px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.16em] border transition-all duration-400"
                    style={{ borderColor: "rgba(183,123,87,0.35)", color: "rgba(183,123,87,0.85)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(183,123,87,0.65)"; (e.currentTarget as HTMLButtonElement).style.color = T.accent; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(183,123,87,0.35)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(183,123,87,0.85)"; }}>
                    Book a Strategy Call
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes heatPulse { 0%,100% { opacity:1; } 50% { opacity:0.75; } }
        @keyframes pulse { 0%,100% { box-shadow:0 0 10px rgba(183,123,87,0.6); } 50% { box-shadow:0 0 20px rgba(183,123,87,1); } }
      `}</style>
    </section>
  );
}
