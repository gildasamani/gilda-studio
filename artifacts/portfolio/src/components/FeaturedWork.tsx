import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0, filter: "blur(4px)" },
      {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 84%" },
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const dir = i % 2 === 0 ? -30 : 30;
      gsap.fromTo(
        item,
        { x: dir, opacity: 0, filter: "blur(8px)" },
        {
          x: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 84%" },
        }
      );
    });
  }, []);

  const works = [
    {
      title: "Meridian",
      category: "Creative Direction",
      year: "2025",
      desc: "A quiet, warm interior — designed to evoke focus. Where architectural restraint meets living texture.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Canopy",
      category: "Digital Atmosphere",
      year: "2024",
      desc: "Lush and deliberate — a study in how organic forms breathe life into dark, modern spaces.",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Obsidian",
      category: "Interface Concept",
      year: "2024",
      desc: "Precision and shadow. An interface born in the space between control and instinct.",
      image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="work" ref={sectionRef} className="py-36 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-28 flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-white/5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/50 block mb-5">Selected Work</span>
          <h2 className="font-display font-medium tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}>
            Creative<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.15)", color: "transparent" }}>
              Directions
            </span>
          </h2>
        </div>
        <p className="text-muted-foreground/60 max-w-xs text-sm leading-relaxed">
          Environments, atmospheres, and interface concepts that explore how digital space feels.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {works.map((work, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className={`group relative flex flex-col gap-10 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            data-cursor="hover"
          >
            <div className="w-full md:w-3/5 overflow-hidden rounded-2xl aspect-[16/10] relative">
              {/* Cinematic overlay on hover */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-[1.04]"
                style={{ transition: "all 1.1s cubic-bezier(0.25,1,0.5,1)", filter: "saturate(0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "saturate(0.95)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "saturate(0.6)")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-20" />
            </div>

            <div className="w-full md:w-2/5 flex flex-col justify-center gap-5 py-6">
              <div className="flex items-center gap-3">
                <span className="w-4 h-px bg-primary/50" />
                <span className="text-primary/60 font-medium tracking-[0.22em] uppercase text-[10px]">{work.category}</span>
              </div>
              <h3
                className="font-display font-medium tracking-tight group-hover:text-primary/90 transition-colors duration-600"
                style={{ fontSize: "clamp(2.5rem,4.5vw,4rem)", lineHeight: "0.9", transition: "color 0.6s ease" }}
              >
                {work.title}
              </h3>
              <p className="text-muted-foreground/55 leading-relaxed text-sm max-w-xs">{work.desc}</p>
              <span className="text-muted-foreground/25 text-[10px] tracking-[0.22em] mt-3 border border-white/6 rounded-full px-4 py-1.5 w-fit uppercase">{work.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
