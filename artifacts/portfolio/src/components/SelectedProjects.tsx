import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 70, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%" },
          delay: (i % 2) * 0.15,
        }
      );
    });
  }, []);

  const projects = [
    {
      title: "Liminal",
      category: "Threshold Study",
      desc: "The space between states — a visual meditation on transition.",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Umbra",
      category: "Shadow Architecture",
      desc: "Form revealed only through the geometry of its absence.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Apex",
      category: "Interface Concept",
      desc: "Precision at the intersection of function and desire.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Chroma",
      category: "Colour Behaviour Study",
      desc: "How light mutates meaning — a chromatic field experiment.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24">
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">Concept Experiences</span>
          <h2 className="font-display font-medium tracking-tight" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Experimental<br />Directions
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={el => { itemsRef.current[i] = el; }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            data-cursor="hover"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-95 group-hover:scale-[1.05] transition-all duration-900 ease-out"
              style={{ transition: "all 0.9s cubic-bezier(0.25,1,0.5,1)" }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent z-10" />
            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/25 transition-colors duration-600 z-20" style={{ transition: "border-color 0.6s ease" }} />
            {/* Hover ambient */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 mix-blend-overlay z-10 transition-all duration-700" />

            <div className="absolute bottom-0 left-0 p-7 w-full z-30">
              <span className="text-primary/60 text-xs uppercase tracking-[0.2em] block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.category}</span>
              <h3 className="font-display font-medium text-2xl md:text-3xl translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
              <p className="text-muted-foreground text-xs mt-2 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
