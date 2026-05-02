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
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const dir = i % 2 === 0 ? -40 : 40;
      gsap.fromTo(
        item,
        { x: dir, opacity: 0, filter: "blur(6px)" },
        {
          x: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        }
      );
    });
  }, []);

  const works = [
    {
      title: "Veil",
      category: "Atmospheric Interface Study",
      year: "2024",
      desc: "A spatial exploration of depth, ambient light, and dissolving boundaries in digital space.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Obsidian",
      category: "Cinematic Motion Concept",
      year: "2024",
      desc: "A study in monolithic geometry and light decay — where stillness and motion coexist.",
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Drift",
      category: "Immersive Visual Direction",
      year: "2023",
      desc: "An exploration of weightlessness — textures dissolving into atmospheric blur and grain.",
      image: "https://images.unsplash.com/photo-1604076913837-52ab5629fde4?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="work" ref={sectionRef} className="py-36 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-28 flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-white/5">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">Selected Concepts</span>
          <h2 className="font-display font-medium tracking-tighter leading-[0.85]" style={{ fontSize: "clamp(2.5rem,6vw,5.5rem)" }}>
            Visual<br /><span className="text-foreground/20" style={{ WebkitTextStroke: "1px rgba(246,240,232,0.2)" }}>Explorations</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
          Conceptual digital studies in atmosphere, motion, and the edge of perception.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {works.map((work, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className={`group relative flex flex-col gap-8 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            data-cursor="hover"
          >
            <div className="w-full md:w-3/5 overflow-hidden rounded-xl aspect-[16/10] relative">
              <div className="absolute inset-0 bg-primary/15 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-20" />
            </div>
            <div className="w-full md:w-2/5 flex flex-col justify-center gap-5 py-4">
              <span className="text-primary/70 font-medium tracking-[0.2em] uppercase text-xs">{work.category}</span>
              <h3 className="font-display font-medium tracking-tight group-hover:text-primary transition-colors duration-500" style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)", lineHeight: "0.9" }}>
                {work.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-xs">{work.desc}</p>
              <span className="text-muted-foreground/40 text-xs tracking-[0.2em] mt-4 border border-white/8 rounded-full px-4 py-1.5 w-fit">{work.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
