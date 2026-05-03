import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  // One-time reveal animations (unchanged)
  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 84%" } }
    );
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -35 : 35, opacity: 0, filter: "blur(8px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 83%" } }
      );
    });
  }, []);

  // Continuous scroll effects — respond on scroll up and down
  useEffect(() => {
    if (!sectionRef.current) return;
    const st: ScrollTrigger[] = [];

    // Atmospheric section glow — rises and fades as you scroll through
    const glowTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2.5,
      },
    });
    glowTl
      .to(glowRef.current, { opacity: 1, y: "-15%", ease: "none", duration: 0.45 })
      .to(glowRef.current, { opacity: 0, y: "-30%", ease: "none", duration: 0.55 });
    if (glowTl.scrollTrigger) st.push(glowTl.scrollTrigger);

    // Per-image parallax depth — image drifts upward slower than container
    imgWrapRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      const trigger = itemsRef.current[i];
      if (!trigger) return;

      const t = gsap.to(wrap, {
        y: -32,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });
      if (t.scrollTrigger) st.push(t.scrollTrigger);
    });

    return () => st.forEach(t => t.kill());
  }, []);

  const works = [
    {
      title: "Meridian",
      category: "Creative Direction",
      year: "2025",
      desc: "A premium digital presence built from restraint — where editorial typography meets architectural precision.",
      image: "/images/meridian.png",
    },
    {
      title: "Canopy",
      category: "Digital Atmosphere",
      year: "2024",
      desc: "Light dissolves into obsidian — a study in ambient warmth, negative space, and cinematic digital mood.",
      image: "/images/canopy.png",
    },
    {
      title: "Obsidian",
      category: "Interface Concept",
      year: "2024",
      desc: "Precision UI in the dark — a layered digital surface born from restraint, where only the essential survives.",
      image: "/images/obsidian.png",
    },
  ];

  return (
    <section ref={sectionRef} id="work" className="py-36 px-6 md:px-12 lg:px-24 relative overflow-hidden">

      {/* Atmospheric section glow — continuously scroll-reactive */}
      <div ref={glowRef} className="absolute pointer-events-none z-0" style={{
        top: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "500px",
        background: "radial-gradient(ellipse, rgba(183,123,87,0.065) 0%, transparent 68%)",
        filter: "blur(80px)",
        opacity: 0,
        willChange: "transform, opacity",
      }} />

      <div ref={headingRef} className="mb-28 flex flex-col md:flex-row justify-between items-end gap-8 pb-12 relative z-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-5" style={{ color: "rgba(183,123,87,0.6)" }}>Selected Work</span>
          <h2 className="font-display font-medium tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}>
            Creative<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.15)", color: "transparent" }}>Directions</span>
          </h2>
        </div>
        <p className="max-w-[260px] text-sm leading-relaxed" style={{ color: "rgba(216,197,174,0.6)" }}>
          Environments, atmospheres, and interface concepts that explore how digital space feels.
        </p>
      </div>

      <div className="flex flex-col gap-36 relative z-10">
        {works.map((work, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className={`group relative flex flex-col gap-10 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            data-cursor="hover"
          >
            {/* Image container — overflow-hidden clips parallax movement */}
            <div className="w-full md:w-[58%] overflow-hidden rounded-2xl aspect-[16/10] relative">
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/8 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Parallax image wrapper — extends beyond container for movement room */}
              <div
                ref={el => { imgWrapRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  top: "-10%",
                  bottom: "-10%",
                  left: 0,
                  right: 0,
                  willChange: "transform",
                }}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  style={{
                    opacity: 0.75,
                    filter: "saturate(0.6) brightness(0.92)",
                    transition: "opacity 1.2s cubic-bezier(0.25,1,0.5,1), filter 1.2s cubic-bezier(0.25,1,0.5,1), transform 1.2s cubic-bezier(0.25,1,0.5,1)",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = "0.92";
                    e.currentTarget.style.filter = "saturate(0.85) brightness(1)";
                    e.currentTarget.style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = "0.75";
                    e.currentTarget.style.filter = "saturate(0.6) brightness(0.92)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent z-20" />
            </div>

            <div className="w-full md:w-[42%] flex flex-col justify-center gap-5 py-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-px" style={{ background: "rgba(183,123,87,0.55)" }} />
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium" style={{ color: "rgba(183,123,87,0.7)" }}>{work.category}</span>
              </div>
              <h3
                className="font-display font-medium tracking-tight cursor-default"
                style={{
                  fontSize: "clamp(2.6rem,4.5vw,4.2rem)",
                  lineHeight: "0.9",
                  color: "rgba(246,240,232,0.92)",
                  transition: "color 0.6s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(183,123,87,0.92)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(246,240,232,0.92)")}
              >
                {work.title}
              </h3>
              <p className="leading-relaxed text-sm max-w-[260px]" style={{ color: "rgba(216,197,174,0.6)" }}>{work.desc}</p>
              <span className="text-[10px] uppercase tracking-[0.22em] mt-3 rounded-full px-4 py-1.5 w-fit border"
                style={{ color: "rgba(216,197,174,0.35)", borderColor: "rgba(255,255,255,0.08)" }}>{work.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
