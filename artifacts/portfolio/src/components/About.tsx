import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0, filter: "blur(4px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      }
    );

    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      gsap.fromTo(
        stat,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: stat, start: "top 85%" },
          delay: i * 0.12,
        }
      );
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(183,123,87,0.04), transparent)"
      }} />

      <div className="max-w-6xl mx-auto" ref={contentRef}>
        <span className="text-xs uppercase tracking-[0.3em] text-primary/60 block mb-8">The Studio</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="font-display font-medium tracking-tight mb-10 leading-[0.88]" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}>
              Reframe<br /><span className="text-foreground/25" style={{ WebkitTextStroke: "1px rgba(246,240,232,0.22)" }}>Studio</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10">
              We are a collective of designers, engineers, and storytellers — obsessed with the space where technology evokes emotion. Our work exists at the edge of interaction and atmosphere.
            </p>
            <p className="text-base text-muted-foreground/60 leading-relaxed">
              Every project is a question: what does this experience feel like? Not just what does it do.
            </p>

            <div className="mt-14 grid grid-cols-3 gap-8">
              {[["12+", "Recognitions"], ["40+", "Concepts Built"], ["7+", "Years Deep"]].map(([num, label], i) => (
                <div key={i} ref={el => { statsRef.current[i] = el; }}>
                  <span className="block font-display text-3xl md:text-4xl text-primary mb-1.5">{num}</span>
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-8 md:p-10 border border-white/5">
            <h3 className="text-sm uppercase tracking-[0.2em] text-primary/70 mb-8">Our Principles</h3>
            <ul className="space-y-7">
              {[
                ["01", "Form follows emotion.", "Design is not decoration — it's the architecture of feeling."],
                ["02", "Restraint is a creative act.", "What we remove is as deliberate as what we keep."],
                ["03", "Performance is atmosphere.", "Speed and fluidity are invisible design that the body senses."],
              ].map(([num, title, desc]) => (
                <li key={num} className="pb-7 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="text-primary/40 text-xs font-medium block mb-1.5">{num}</span>
                  <span className="text-foreground/90 font-medium block mb-1">{title}</span>
                  <span className="text-muted-foreground/60 text-sm leading-relaxed">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
