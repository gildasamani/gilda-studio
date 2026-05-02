import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type AuditResult = {
  url: string;
  overall: number;
  scores: { label: string; value: number; icon: string; description: string }[];
  issues: { category: string; finding: string; priority: "high" | "medium" | "low" }[];
};

function generateAuditResult(url: string): AuditResult {
  return {
    url,
    overall: 58,
    scores: [
      { label: "Visual Design", value: 52, icon: "◈", description: "Typography, colour, and layout quality" },
      { label: "SEO & Performance", value: 49, icon: "◎", description: "Search visibility and load speed" },
      { label: "Mobile Responsiveness", value: 65, icon: "◻", description: "Experience across all screen sizes" },
      { label: "User Experience", value: 55, icon: "◑", description: "Navigation, clarity, and flow" },
      { label: "Conversion Potential", value: 41, icon: "△", description: "CTAs, trust, and lead capture" },
      { label: "Trust & Credibility", value: 47, icon: "◇", description: "Social proof, security, and authority" },
    ],
    issues: [
      { category: "Visual Design", finding: "Typography lacks hierarchy — headings and body text are too similar in weight and size, reducing brand perception and readability.", priority: "high" },
      { category: "Mobile Responsiveness", finding: "Key layout sections break below 768px. Navigation collapses poorly and CTAs are cut off on mobile.", priority: "high" },
      { category: "SEO & Performance", finding: "Missing meta descriptions and Open Graph tags. Page load exceeds 3.2s due to unoptimised images and render-blocking scripts.", priority: "high" },
      { category: "User Experience", finding: "No clear primary CTA above the fold. User attention dissipates before reaching conversion points.", priority: "high" },
      { category: "Conversion Potential", finding: "No social proof or testimonials visible in the first scroll depth. No urgency or value proposition communicated early.", priority: "medium" },
      { category: "Trust & Credibility", finding: "HTTPS not enforced on all pages. No trust badges, security indicators, or client logos visible.", priority: "medium" },
    ],
  };
}

function ScoreRing({ value, size = 128 }: { value: number; size?: number }) {
  const r = (size / 2) - 12;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 70 ? "#7eb87e" : value >= 50 ? "#B77B57" : "#c26060";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth="7"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 8px ${color}66)` }}
      />
    </svg>
  );
}

function ScoreBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  const color = value >= 70 ? "rgba(126,184,126,0.9)" : value >= 50 ? "rgba(183,123,87,0.9)" : "rgba(194,96,96,0.8)";

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="w-full h-[4px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div className="h-full rounded-full" style={{
        width: `${width}%`,
        background: color,
        transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 10px ${color}`,
      }} />
    </div>
  );
}

const priorityConfig = {
  high: { label: "High", color: "rgba(194,96,96,0.85)", bg: "rgba(194,96,96,0.1)", border: "rgba(194,96,96,0.3)" },
  medium: { label: "Medium", color: "rgba(183,123,87,0.9)", bg: "rgba(183,123,87,0.1)", border: "rgba(183,123,87,0.3)" },
  low: { label: "Low", color: "rgba(126,184,126,0.8)", bg: "rgba(126,184,126,0.08)", border: "rgba(126,184,126,0.25)" },
};

const previewCategories = [
  { label: "Visual Design", icon: "◈" },
  { label: "SEO & Performance", icon: "◎" },
  { label: "Mobile Responsive", icon: "◻" },
  { label: "User Experience", icon: "◑" },
  { label: "Conversion Potential", icon: "△" },
  { label: "Trust & Credibility", icon: "◇" },
];

export function WebsiteAudit() {
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
    "Checking SEO & performance...",
    "Generating your health report...",
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
        scrollTrigger: { trigger: panelRef.current, start: "top 84%" }, delay: 0.15 }
    );
  }, []);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setLoadingPhase(0);
    loadingMessages.forEach((_, i) => {
      setTimeout(() => setLoadingPhase(i), i * 680);
    });
    setTimeout(() => {
      setLoading(false);
      setResult(generateAuditResult(url));
    }, 3700);
  };

  return (
    <section id="audit" className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(183,123,87,0.07), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.32em] mb-5 px-4 py-1.5 rounded-full border"
            style={{ color: "rgba(183,123,87,0.85)", borderColor: "rgba(183,123,87,0.25)", background: "rgba(183,123,87,0.06)" }}>
            Free Instant Analysis
          </span>
          <h2 className="font-display font-medium tracking-tight leading-[0.87] mb-5" style={{ fontSize: "clamp(2.4rem,5.5vw,5rem)" }}>
            Website<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.18)", color: "transparent" }}>Health Check</span>
          </h2>
          <p className="text-sm font-light max-w-md mx-auto leading-relaxed" style={{ color: "rgba(216,197,174,0.65)" }}>
            Enter your website URL and discover exactly where you're losing visitors, search rankings, and revenue — in under 10 seconds.
          </p>
        </div>

        {/* Main panel */}
        <div ref={panelRef} className="rounded-2xl border overflow-hidden" style={{
          background: "rgba(26,21,18,0.85)",
          backdropFilter: "blur(24px)",
          borderColor: "rgba(183,123,87,0.2)",
          boxShadow: "0 0 100px rgba(183,123,87,0.07), 0 1px 0 rgba(255,255,255,0.04) inset",
        }}>
          {/* Window chrome */}
          <div className="px-8 py-4 flex items-center gap-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(183,123,87,0.55)" }} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(216,197,174,0.4)" }}>
              Reframe Studio — Website Analyser
            </span>
          </div>

          {/* URL input */}
          <div className="p-8 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <p className="text-xs mb-4" style={{ color: "rgba(216,197,174,0.55)" }}>
              Get a full breakdown of your website's design, SEO, performance, and conversion gaps — instantly.
            </p>
            <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider font-medium"
                  style={{ color: "rgba(183,123,87,0.7)" }}>https://</span>
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="w-full rounded-xl pl-20 pr-5 py-4 text-sm focus:outline-none transition-all duration-300 border"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "rgba(246,240,232,0.9)",
                    caretColor: "rgba(183,123,87,1)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(183,123,87,0.55)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="group relative px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-[0.14em] overflow-hidden transition-all duration-300 disabled:opacity-40 flex-shrink-0"
                style={{ background: "rgba(183,123,87,1)", color: "#1A1512", boxShadow: "0 4px 24px rgba(183,123,87,0.35)" }}
              >
                <span className="relative z-10">{loading ? "Analysing..." : "Analyze Website"}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(255,255,255,0.15)" }} />
              </button>
            </form>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8">
              <div className="rounded-xl p-6 border" style={{
                background: "rgba(183,123,87,0.05)", borderColor: "rgba(183,123,87,0.18)"
              }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-5 h-5 rounded-full border-2 animate-spin flex-shrink-0"
                    style={{ borderColor: "rgba(183,123,87,0.4)", borderTopColor: "rgba(183,123,87,1)" }} />
                  <span className="text-sm" style={{ color: "rgba(216,197,174,0.8)" }}>
                    {loadingMessages[loadingPhase]}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {loadingMessages.map((msg, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-400" style={{
                        background: i <= loadingPhase ? "rgba(183,123,87,0.9)" : "rgba(255,255,255,0.1)",
                        boxShadow: i <= loadingPhase ? "0 0 8px rgba(183,123,87,0.6)" : "none",
                      }} />
                      <span className="text-[11px] uppercase tracking-wide transition-all duration-400" style={{
                        color: i <= loadingPhase ? "rgba(216,197,174,0.75)" : "rgba(216,197,174,0.25)",
                      }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audit result */}
          {result && !loading && (
            <div className="p-8 space-y-7">
              {/* Overall score header */}
              <div className="flex flex-col sm:flex-row items-center gap-8 p-7 rounded-xl border" style={{
                background: "rgba(183,123,87,0.05)", borderColor: "rgba(183,123,87,0.2)",
                boxShadow: "0 0 40px rgba(183,123,87,0.04)"
              }}>
                <div className="relative flex-shrink-0">
                  <ScoreRing value={result.overall} size={128} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-4xl" style={{ color: "rgba(246,240,232,0.95)" }}>{result.overall}</span>
                    <span className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: "rgba(216,197,174,0.5)" }}>/ 100</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] block mb-2" style={{ color: "rgba(183,123,87,0.7)" }}>Website Health Score</span>
                  <h3 className="font-display text-xl md:text-2xl mb-3" style={{ color: "rgba(246,240,232,0.92)" }}>
                    {result.url}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(216,197,174,0.65)" }}>
                    Your site has critical gaps in design, SEO, and conversion that are costing you visitors and revenue every day.
                  </p>
                </div>
              </div>

              {/* Score grid */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] block mb-4" style={{ color: "rgba(216,197,174,0.5)" }}>Score Breakdown</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.scores.map((score, i) => (
                    <div key={i} className="rounded-xl p-5 border" style={{
                      background: "rgba(255,255,255,0.025)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-medium block mb-0.5" style={{ color: "rgba(246,240,232,0.78)" }}>
                            <span className="mr-2" style={{ color: "rgba(183,123,87,0.6)" }}>{score.icon}</span>
                            {score.label}
                          </span>
                          <span className="text-[10px]" style={{ color: "rgba(216,197,174,0.4)" }}>{score.description}</span>
                        </div>
                        <span className="font-display text-xl font-medium flex-shrink-0 ml-3" style={{
                          color: score.value >= 70 ? "rgba(126,184,126,0.9)" : score.value >= 50 ? "rgba(183,123,87,0.9)" : "rgba(194,96,96,0.85)"
                        }}>{score.value}</span>
                      </div>
                      <ScoreBar value={score.value} delay={i * 90} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] block mb-4" style={{ color: "rgba(216,197,174,0.5)" }}>What Needs to Change</span>
                <div className="space-y-2.5">
                  {result.issues.map((issue, i) => {
                    const cfg = priorityConfig[issue.priority];
                    return (
                      <div key={i} className="flex items-start gap-4 rounded-xl p-5 border" style={{
                        background: "rgba(255,255,255,0.018)",
                        borderColor: "rgba(255,255,255,0.06)",
                      }}>
                        <span className="mt-0.5 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0 font-medium border"
                          style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
                          {cfg.label}
                        </span>
                        <div>
                          <span className="text-xs font-medium block mb-1.5" style={{ color: "rgba(183,123,87,0.75)" }}>{issue.category}</span>
                          <p className="text-xs leading-relaxed" style={{ color: "rgba(216,197,174,0.62)" }}>{issue.finding}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-8 md:p-10 text-center border" style={{
                background: "linear-gradient(135deg, rgba(42,33,29,0.85) 0%, rgba(26,21,18,0.75) 100%)",
                borderColor: "rgba(183,123,87,0.25)",
                boxShadow: "0 0 80px rgba(183,123,87,0.08)",
              }}>
                <span className="text-[10px] uppercase tracking-[0.3em] block mb-4" style={{ color: "rgba(183,123,87,0.65)" }}>
                  Ready to Transform
                </span>
                <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight" style={{ color: "rgba(246,240,232,0.95)" }}>
                  Your website could perform better.
                </h3>
                <p className="text-sm leading-relaxed max-w-md mx-auto mb-8" style={{ color: "rgba(216,197,174,0.68)" }}>
                  Let's redesign it into a high-converting, modern experience — sharper design, faster performance, better SEO, and more customers.
                </p>
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.16em] overflow-hidden transition-all duration-400"
                  style={{
                    background: "rgba(183,123,87,1)",
                    color: "#1A1512",
                    boxShadow: "0 6px 32px rgba(183,123,87,0.4)",
                  }}
                >
                  <span className="relative z-10">Request a Redesign</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(255,255,255,0.15)" }} />
                </button>
              </div>
            </div>
          )}

          {/* Empty state — preview categories */}
          {!loading && !result && (
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(216,197,174,0.45)" }}>
                Categories Analysed
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {previewCategories.map((cat, i) => (
                  <div key={i} className="rounded-xl p-4 border flex items-center gap-3" style={{
                    background: "rgba(255,255,255,0.025)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}>
                    <span className="text-base flex-shrink-0" style={{ color: "rgba(183,123,87,0.55)" }}>{cat.icon}</span>
                    <span className="text-xs leading-snug" style={{ color: "rgba(216,197,174,0.62)" }}>{cat.label}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-5 border text-center" style={{
                background: "rgba(183,123,87,0.04)",
                borderColor: "rgba(183,123,87,0.15)",
                borderStyle: "dashed",
              }}>
                <p className="text-xs" style={{ color: "rgba(216,197,174,0.5)" }}>
                  Enter your URL above — your full health report generates in seconds
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
