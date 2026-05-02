import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function CreativeProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 80%",
        scrub: true
      }
    });

    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(
        step,
        { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  const steps = [
    { number: "01", title: "Discovery", desc: "Deep dive into your brand, audience, and objectives to form a strategic foundation." },
    { number: "02", title: "Concept", desc: "Exploring visual directions and experiential concepts that align with the strategy." },
    { number: "03", title: "Design", desc: "Crafting every detail with precision, focusing on aesthetics and user experience." },
    { number: "04", title: "Development", desc: "Bringing designs to life with robust, high-performance code and smooth animations." }
  ];

  return (
    <section id="process" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-display font-medium">Creative Process</h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/50 -translate-x-1/2" />
        <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2 h-0" />

        {steps.map((step, i) => (
          <div 
            key={i} 
            ref={el => stepsRef.current[i] = el}
            className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-24 last:mb-0 ${i % 2 === 0 ? "md:flex-row-reverse text-left" : "text-left md:text-right"}`}
          >
            <div className="hidden md:block w-1/2" />
            
            <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-secondary border border-primary -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(183,123,87,0.3)]">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>

            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
              <span className="text-primary font-display text-2xl opacity-50 block mb-2">{step.number}</span>
              <h3 className="text-3xl font-medium mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
