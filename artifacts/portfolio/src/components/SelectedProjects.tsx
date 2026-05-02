import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          delay: (i % 2) * 0.12,
        }
      );
    });
  }, []);

  const projects = [
    {
      title: "Grove",
      category: "Digital Atmosphere",
      desc: "Green tension against dark space. Stillness that breathes.",
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Helio",
      category: "Interface Concept",
      desc: "Warm precision. A workspace where light is the primary material.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Forma",
      category: "Creative Direction",
      desc: "Where editorial meets environment — intentional, uncluttered, alive.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Lumen",
      category: "Digital Atmosphere",
      desc: "Light diffused through dark geometry. The mood before the moment.",
      image: "https://images.unsplash.com/photo-1616587896649-29ed940e8412?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-20 flex flex-col md:flex-row justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/50 block mb-5">Concept Work</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.88]" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Interface<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.14)", color: "transparent" }}>
              Concepts
            </span>
          </h2>
        </div>
        <p className="text-muted-foreground/50 max-w-xs text-sm leading-relaxed mt-6 md:mt-0">
          Visual explorations at the intersection of atmosphere and function.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ aspectRatio: i === 0 || i === 3 ? "4/3" : "4/3" }}
            data-cursor="hover"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-[1.04]"
              style={{
                transition: "all 1s cubic-bezier(0.25,1,0.5,1)",
                filter: "saturate(0.5)",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "saturate(0.85)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "saturate(0.5)")}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent z-10" />
            <div
              className="absolute inset-0 rounded-2xl z-20 border border-primary/0 group-hover:border-primary/20 transition-all duration-700"
              style={{ boxShadow: "inset 0 0 0 0 rgba(183,123,87,0)" }}
            />
            {/* Green accent tint on hover for select items */}
            {(i === 0 || i === 2) && (
              <div className="absolute inset-0 bg-[rgba(80,120,70,0)] group-hover:bg-[rgba(80,120,70,0.06)] mix-blend-overlay z-10 transition-all duration-700" />
            )}

            <div className="absolute bottom-0 left-0 p-7 w-full z-30">
              <span className="text-primary/50 text-[10px] uppercase tracking-[0.22em] block mb-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{project.category}</span>
              <h3 className="font-display font-medium text-2xl md:text-3xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {project.title}
              </h3>
              <p className="text-muted-foreground/50 text-xs mt-2 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
