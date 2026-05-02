import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SelectedProjects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
    );
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item,
        { y: 65, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          delay: (i % 2) * 0.13 }
      );
    });
  }, []);

  const projects = [
    {
      title: "Grove",
      category: "Digital Atmosphere",
      desc: "An architectural dialogue between glass and living form — where a single leaf commands the frame.",
      image: "https://images.unsplash.com/photo-1572892022983-b5dea97ef95a?q=80&w=1800&auto=format&fit=crop",
    },
    {
      title: "Helio",
      category: "Interface Concept",
      desc: "A workspace in perpetual golden hour. Where the light is the product, and everything else is negative space.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1800&auto=format&fit=crop",
    },
    {
      title: "Forma",
      category: "Creative Direction",
      desc: "Dark minimalism — deliberate, editorial, expensive. Architecture as a statement of restraint.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1800&auto=format&fit=crop",
    },
    {
      title: "Lumen",
      category: "Digital Atmosphere",
      desc: "Light diffused through obsidian glass. A mood board for the space between awareness and design.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <div ref={headingRef} className="mb-20 flex flex-col md:flex-row justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-primary/45 block mb-5">Concept Work</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.88]" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Interface<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.12)", color: "transparent" }}>Concepts</span>
          </h2>
        </div>
        <p style={{ color: "rgba(216,197,174,0.45)" }} className="max-w-[240px] text-sm leading-relaxed mt-6 md:mt-0">
          Visual explorations at the intersection of atmosphere and function.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ aspectRatio: "4/3" }}
            data-cursor="hover"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{
                opacity: 0.48,
                filter: "saturate(0.45) brightness(0.8)",
                transition: "all 1s cubic-bezier(0.25,1,0.5,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = "0.82";
                e.currentTarget.style.filter = "saturate(0.75) brightness(0.92)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = "0.48";
                e.currentTarget.style.filter = "saturate(0.45) brightness(0.8)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/96 via-background/25 to-transparent z-10" />
            <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/18 z-20 transition-all duration-700" />

            <div className="absolute bottom-0 left-0 p-7 w-full z-30">
              <span className="text-[10px] uppercase tracking-[0.22em] block mb-2.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                style={{ color: "rgba(183,123,87,0.6)" }}>
                {project.category}
              </span>
              <h3 className="font-display font-medium text-2xl md:text-[2rem] translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out"
                style={{ color: "rgba(246,240,232,0.88)" }}>
                {project.title}
              </h3>
              <p className="text-xs mt-2.5 max-w-[240px] leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                style={{ color: "rgba(216,197,174,0.5)" }}>
                {project.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
