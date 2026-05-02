import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type AuditResult = {
  url: string;
  overall: number;
  scores: { label: string; value: number; icon: string }[];
  issues: { category: string; finding: string; priority: "high" | "medium" | "low" }[];
};

function generateAuditResult(url: string): AuditResult {
  return {
    url,
    overall: 61,
    scores: [
      { label: "Visual Design", value: 58, icon: "◈" },
      { label: "Mobile Responsive", value: 67, icon: "◻" },
      { label: "SEO Readiness", value: 54, icon: "◎" },
      { label: "Performance", value: 63, icon: "◑" },
      { label: "Accessibility", value: 52, icon: "◇" },
      { label: "Conversion Potential", value: 44, icon: "△" },
    ],
    issues: [
      { category: "Visual Design", finding: "Typography lacks hierarchy — headings and body text are too visually similar, reducing readability and brand perception.", priority: "high" },
      { category: "Mobile Responsiveness", finding: "Layout elements overflow below 768px. Navigation collapses poorly on smaller screens.", priority: "high" },
      { category: "SEO Improvements", finding: "Missing meta descriptions, Open Graph tags, and structured data markup on key pages.", priority: "high" },
      { category: "Speed & Performance", finding: "Unoptimised images adding 1.4s to initial load. Render-blocking scripts detected in header.", priority: "medium" },
      { category: "User Experience", finding: "No clear primary CTA above the fold. User attention dissipates before reaching conversion points.", priority: "high" },
      { category: "Conversion & Trust", finding: "No social proof, testimonials, or trust signals visible in the first scroll depth.", priority: "medium" },
      { category: "Technical Structure", finding: "HTTPS redirect not enforced. Some internal links using HTTP protocol.", priority: "low" },
    ],
  };
}

function ScoreRing({ value, size = 120 }: { value: number; size?: number }) {
  const r = (size / 2) - 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 70 ? "#7eb87e" : value >= 50 ? "#B77B57" : "#c26060";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color}55)` }}
      />
    </svg>
  );
}

function ScoreBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const color = value >= 70 ? "rgba(126,184,126,0.85)" : value >= 50 ? "rgba(183,123,87,0.85)" : "rgba(194,96,96,0.7)";

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
      <div className="h-full rounded-full" style={{
        width: `${width}%`,
        background: color,
        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 8px ${color}`,
      }} />
    </div>
  );
}

const priorityConfig = {
  high: { label: "High", color: "rgba(194,96,96,0.7)", bg: "rgba(194,96,96,0.08)" },
  medium: { label: "Medium", color: "rgba(183,123,87,0.8)", bg: "rgba(183,123,87,0.08)" },
  low: { label: "Low", color: "rgba(126,184,126,0.7)", bg: "rgba(126,184,126,0.08)" },
};

export function WebsiteAudit() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);

  const loadingMessages = [
    "Crawling your website...",
    "Analysing visual design...",
    "Testing mobile responsiveness...",
    "Running performance checks...",
    "Generating your audit report...",
  ];

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" } }
    );
    gsap.fromTo(panelRef.current,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 84%" },
        delay: 0.15 }
    );
  }, []);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setLoadingPhase(0);

    const phases = [0, 1, 2, 3, 4];
    phases.forEach((phase, i) => {
      setTimeout(() => setLoadingPhase(phase), i * 700);
    });

    setTimeout(() => {
      setLoading(false);
      setResult(generateAuditResult(url));
    }, 3700);
  };

  return (
    <section id="audit" ref={sectionRef} className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(183,123,87,0.055), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-5" style={{ color: "rgba(183,123,87,0.5)" }}>
            Free Instant Analysis
          </span>
          <h2 className="font-display font-medium tracking-tight leading-[0.87] mb-6" style={{ fontSize: "clamp(2.2rem,5.5vw,5rem)" }}>
            AI Website<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.12)", color: "transparent" }}>Audit</span>
          </h2>
          <p className="text-sm font-light max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(216,197,174,0.48)" }}>
            Enter your URL and see exactly where your site is losing visitors, rankings, and revenue.
          </p>
        </div>

        <div ref={panelRef} className="rounded-2xl border overflow-hidden" style={{
          background: "rgba(22,17,14,0.7)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(183,123,87,0.12)",
          boxShadow: "0 0 80px rgba(183,123,87,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}>
          {/* Header bar */}
          <div className="px-8 py-5 flex items-center gap-3 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(183,123,87,0.4)" }} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(216,197,174,0.3)" }}>
              Reframe Studio — Website Analyser
            </span>
          </div>

          {/* Input */}
          <div className="p-8 pb-0">
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider" style={{ color: "rgba(183,123,87,0.5)" }}>
                  URL
                </span>
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="w-full rounded-xl pl-14 pr-5 py-4 text-sm focus:outline-none transition-all duration-400 border"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                    color: "rgba(246,240,232,0.85)",
                    caretColor: "rgba(183,123,87,1)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(183,123,87,0.4)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="group relative px-8 py-4 rounded-xl text-sm uppercase tracking-[0.16em] font-medium overflow-hidden transition-all duration-400 disabled:opacity-40"
                style={{ background: "rgba(183,123,87,1)", color: "#1A1512" }}
              >
                <span className="relative z-10">{loading ? "Analysing..." : "Analyze Website"}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(255,255,255,0.12)" }} />
              </button>
            </form>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 pt-6">
              <div className="rounded-xl p-7 border" style={{
                background: "rgba(183,123,87,0.04)",
                borderColor: "rgba(183,123,87,0.12)",
              }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(183,123,87,0.6)", borderTopColor: "transparent" }} />
                  <span className="text-sm font-light transition-all duration-500" style={{ color: "rgba(216,197,174,0.7)" }}>
                    {loadingMessages[loadingPhase]}
                  </span>
                </div>
                <div className="space-y-2">
                  {loadingMessages.map((msg, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{
                        background: i <= loadingPhase ? "rgba(183,123,87,0.8)" : "rgba(255,255,255,0.08)",
                        boxShadow: i <= loadingPhase ? "0 0 6px rgba(183,123,87,0.5)" : "none",
                        transition: "all 0.4s ease",
                      }} />
                      <span className="text-[11px] uppercase tracking-wide transition-all duration-400" style={{
                        color: i <= loadingPhase ? "rgba(216,197,174,0.65)" : "rgba(216,197,174,0.22)",
                      }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="p-8 pt-6 space-y-8">
              {/* Overall score */}
              <div className="flex flex-col sm:flex-row items-center gap-8 p-7 rounded-xl border" style={{
                background: "rgba(183,123,87,0.04)",
                borderColor: "rgba(183,123,87,0.12)",
              }}>
                <div className="relative flex-shrink-0">
                  <ScoreRing value={result.overall} size={116} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-3xl" style={{ color: "rgba(246,240,232,0.92)" }}>{result.overall}</span>
                    <span className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(216,197,174,0.4)" }}>/ 100</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] block mb-2" style={{ color: "rgba(183,123,87,0.55)" }}>Overall Score</span>
                  <h3 className="font-display text-xl mb-2" style={{ color: "rgba(246,240,232,0.88)" }}>
                    {result.url}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(216,197,174,0.48)" }}>
                    Your site has significant room to grow. Below-average scores across design, SEO, and conversion are limiting your visibility and revenue potential.
                  </p>
                </div>
              </div>

              {/* Score grid */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] block mb-5" style={{ color: "rgba(216,197,174,0.35)" }}>Score Breakdown</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.scores.map((score, i) => (
                    <div key={i} className="rounded-xl p-5 border" style={{
                      background: "rgba(255,255,255,0.015)",
                      borderColor: "rgba(255,255,255,0.05)",
                    }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs" style={{ color: "rgba(216,197,174,0.6)" }}>
                          <span className="mr-2 opacity-50">{score.icon}</span>
                          {score.label}
                        </span>
                        <span className="font-display text-base" style={{
                          color: score.value >= 70 ? "rgba(126,184,126,0.85)" : score.value >= 50 ? "rgba(183,123,87,0.85)" : "rgba(194,96,96,0.8)"
                        }}>{score.value}</span>
                      </div>
                      <ScoreBar value={score.value} delay={i * 80} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] block mb-5" style={{ color: "rgba(216,197,174,0.35)" }}>Improvement Areas</span>
                <div className="space-y-3">
                  {result.issues.map((issue, i) => {
                    const cfg = priorityConfig[issue.priority];
                    return (
                      <div key={i} className="flex items-start gap-4 rounded-xl p-5 border" style={{
                        background: "rgba(255,255,255,0.012)",
                        borderColor: "rgba(255,255,255,0.045)",
                      }}>
                        <span className="mt-0.5 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                          style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}` }}>
                          {cfg.label}
                        </span>
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.18em] block mb-1.5 font-medium" style={{ color: "rgba(183,123,87,0.65)" }}>{issue.category}</span>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(216,197,174,0.52)" }}>{issue.finding}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-8 text-center border" style={{
                background: "linear-gradient(135deg, rgba(42,33,29,0.7) 0%, rgba(26,21,18,0.6) 100%)",
                borderColor: "rgba(183,123,87,0.18)",
                boxShadow: "0 0 60px rgba(183,123,87,0.06)",
              }}>
                <span className="text-[10px] uppercase tracking-[0.28em] block mb-4" style={{ color: "rgba(183,123,87,0.5)" }}>Ready to Transform</span>
                <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: "rgba(246,240,232,0.9)" }}>
                  We can fix every issue — and more.
                </h3>
                <p className="text-xs leading-relaxed max-w-sm mx-auto mb-7" style={{ color: "rgba(216,197,174,0.48)" }}>
                  Reframe Studio rebuilds websites from the ground up — sharper visual design, faster performance, better SEO, and more conversions. Let's talk about your site.
                </p>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative px-10 py-[13px] rounded-full text-sm uppercase tracking-[0.18em] font-medium overflow-hidden border transition-all duration-400"
                  style={{ borderColor: "rgba(183,123,87,0.4)", color: "rgba(183,123,87,0.9)" }}
                >
                  <span className="relative z-10 group-hover:text-background transition-colors duration-400">Start the Conversation</span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                    style={{ background: "rgba(183,123,87,1)", zIndex: 0 }} />
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && !result && (
            <div className="p-8 pt-4">
              <div className="grid grid-cols-3 gap-3">
                {["Visual Design", "SEO & Performance", "Conversion Rate"].map((label, i) => (
                  <div key={i} className="rounded-xl p-4 text-center border" style={{
                    background: "rgba(255,255,255,0.015)",
                    borderColor: "rgba(255,255,255,0.05)",
                  }}>
                    <div className="w-7 h-7 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(183,123,87,0.1)" }}>
                      <span className="text-[10px]" style={{ color: "rgba(183,123,87,0.7)" }}>◈</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide" style={{ color: "rgba(216,197,174,0.38)" }}>{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] mt-5" style={{ color: "rgba(216,197,174,0.28)" }}>
                Enter your URL above to generate a full audit report
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
