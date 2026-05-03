import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FeaturedWork() {
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    <section id="work" className="py-36 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-28 flex flex-col md:flex-row justify-between items-end gap-8 pb-12"
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

      <div className="flex flex-col gap-36">
        {works.map((work, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className={`group relative flex flex-col gap-10 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            data-cursor="hover"
          >
            <div className="w-full md:w-[58%] overflow-hidden rounded-2xl aspect-[16/10] relative">
              <div className="absolute inset-0 bg-primary/8 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-800" />
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: 0.75,
                  filter: "saturate(0.6) brightness(0.92)",
                  transition: "all 1.2s cubic-bezier(0.25,1,0.5,1)",
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
