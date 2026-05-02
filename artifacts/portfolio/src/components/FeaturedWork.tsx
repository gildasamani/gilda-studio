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
      desc: "Warm geometry dissolved in deep shadow. An interior that breathes — where architecture becomes atmosphere.",
      image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Canopy",
      category: "Digital Atmosphere",
      year: "2024",
      desc: "The bird of paradise held still — a study in sculptural form, green tension, and editorial negative space.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2400&auto=format&fit=crop",
    },
    {
      title: "Obsidian",
      category: "Interface Concept",
      year: "2024",
      desc: "A dark interface born in restraint. Precision UI — where function is the only decoration that remains.",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2400&auto=format&fit=crop",
    },
  ];

  return (
    <section id="work" className="py-36 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-28 flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-white/[0.04]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-primary/45 block mb-5">Selected Work</span>
          <h2 className="font-display font-medium tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}>
            Creative<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.12)", color: "transparent" }}>Directions</span>
          </h2>
        </div>
        <p style={{ color: "rgba(216,197,174,0.45)" }} className="max-w-[260px] text-sm leading-relaxed">
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
                  opacity: 0.62,
                  filter: "saturate(0.55) brightness(0.88)",
                  transition: "all 1.2s cubic-bezier(0.25,1,0.5,1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.filter = "saturate(0.82) brightness(0.95)";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = "0.62";
                  e.currentTarget.style.filter = "saturate(0.55) brightness(0.88)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-20" />
            </div>

            <div className="w-full md:w-[42%] flex flex-col justify-center gap-5 py-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-px" style={{ background: "rgba(183,123,87,0.45)" }} />
                <span className="text-[10px] uppercase tracking-[0.24em] font-medium" style={{ color: "rgba(183,123,87,0.55)" }}>{work.category}</span>
              </div>
              <h3
                className="font-display font-medium tracking-tight"
                style={{
                  fontSize: "clamp(2.6rem,4.5vw,4.2rem)",
                  lineHeight: "0.9",
                  color: "rgba(246,240,232,0.9)",
                  transition: "color 0.6s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(183,123,87,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(246,240,232,0.9)")}
              >
                {work.title}
              </h3>
              <p style={{ color: "rgba(216,197,174,0.45)" }} className="leading-relaxed text-sm max-w-[260px]">{work.desc}</p>
              <span className="text-[10px] uppercase tracking-[0.22em] mt-3 rounded-full px-4 py-1.5 w-fit border" style={{ color: "rgba(216,197,174,0.25)", borderColor: "rgba(255,255,255,0.06)" }}>{work.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
