import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glassPanelRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  // One-time reveal animations (unchanged)
  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { y: 50, opacity: 0, filter: "blur(4px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" } }
    );
    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      gsap.fromTo(stat,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: stat, start: "top 86%" },
          delay: i * 0.11 }
      );
    });
  }, []);

  // Continuous scroll effects — active on both scroll directions
  useEffect(() => {
    if (!sectionRef.current) return;
    const st: ScrollTrigger[] = [];

    const fullRange = {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
    };

    // Background glow drifts upward through section
    const t1 = gsap.to(bgGlowRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: { ...fullRange, scrub: 2 },
    });
    if (t1.scrollTrigger) st.push(t1.scrollTrigger);

    // Glass panel moves at slightly different rate — creates depth vs the text column
    const t2 = gsap.to(glassPanelRef.current, {
      y: -18,
      ease: "none",
      scrollTrigger: { ...fullRange, scrub: 2.8 },
    });
    if (t2.scrollTrigger) st.push(t2.scrollTrigger);

    // Section glow bloom as it scrolls into view then fades
    const glowTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 2.5,
      },
    });
    glowTl
      .to(bgGlowRef.current, { opacity: 1, ease: "none", duration: 0.4 })
      .to(bgGlowRef.current, { opacity: 0.15, ease: "none", duration: 0.6 });
    if (glowTl.scrollTrigger) st.push(glowTl.scrollTrigger);

    return () => st.forEach(t => t.kill());
  }, []);

  const stats = [
    ["10+", "Years Building"],
    ["200+", "Sites Delivered"],
    ["100%", "Responsive"],
  ];

  const principles = [
    ["01", "Form follows emotion.", "Design is not decoration — it is the architecture of feeling, built in code."],
    ["02", "Restraint is a creative act.", "What we remove is as deliberate as what we keep."],
    ["03", "Performance is atmosphere.", "Speed and fluidity are invisible design the body senses without knowing."],
  ];

  return (
    <section ref={sectionRef} id="about" className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Scroll-reactive atmospheric background glow */}
      <div ref={bgGlowRef} className="absolute pointer-events-none z-0" style={{
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "500px",
        background: "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(183,123,87,0.06), transparent)",
        filter: "blur(70px)",
        opacity: 0,
        willChange: "transform, opacity",
      }} />

      <div className="max-w-6xl mx-auto relative z-10" ref={contentRef}>
        <span className="text-[10px] uppercase tracking-[0.32em] text-primary/45 block mb-8">The Studio</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="font-display font-medium tracking-tight mb-10 leading-[0.88]" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Gilda<br />
              <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.2)", color: "transparent" }}>Studio</span>
            </h2>

            <p className="text-lg md:text-xl font-light leading-relaxed mb-6" style={{ color: "rgba(216,197,174,0.65)" }}>
              Over a decade of frontend expertise — from WordPress to cutting-edge React — building websites and digital experiences that work precisely, feel beautiful, and convert with intent.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(216,197,174,0.42)" }}>
              We specialise in UI implementation, responsive web development, WordPress builds, and the full spectrum of digital experience refinement. Every pixel is deliberate. Every interaction earns its place.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(216,197,174,0.38)" }}>
              Our process begins with one question: not what does this do, but what does this feel like?
            </p>

            <div className="mt-14 grid grid-cols-3 gap-8">
              {stats.map(([num, label], i) => (
                <div key={i} ref={el => { statsRef.current[i] = el; }}>
                  <span className="block font-display text-3xl md:text-4xl text-primary mb-2">{num}</span>
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(216,197,174,0.45)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Glass panel — scroll parallax at different rate for depth */}
          <div
            ref={glassPanelRef}
            className="rounded-2xl p-8 md:p-10 border"
            style={{
              background: "rgba(42,33,29,0.28)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255,255,255,0.05)",
              willChange: "transform",
            }}
          >
            <h3 className="text-[10px] uppercase tracking-[0.24em] mb-8" style={{ color: "rgba(183,123,87,0.6)" }}>Our Principles</h3>
            <ul className="space-y-7">
              {principles.map(([num, title, desc]) => (
                <li key={num} className="pb-7 last:pb-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span className="text-[10px] font-medium block mb-1.5" style={{ color: "rgba(183,123,87,0.38)" }}>{num}</span>
                  <span className="font-medium block mb-1.5 text-sm" style={{ color: "rgba(246,240,232,0.82)" }}>{title}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "rgba(216,197,174,0.48)" }}>{desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <span className="text-[10px] uppercase tracking-[0.24em] block mb-4" style={{ color: "rgba(183,123,87,0.4)" }}>Expertise</span>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "WordPress", "GSAP", "Framer Motion", "Responsive Design", "UI Implementation", "Tailwind CSS", "Next.js", "Web Performance"].map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wide px-3 py-1 rounded-full border"
                    style={{ color: "rgba(216,197,174,0.45)", borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
