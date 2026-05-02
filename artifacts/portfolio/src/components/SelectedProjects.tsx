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
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          delay: i * 0.1
        }
      );
    });
  }, []);

  const projects = [
    { title: "Odyssey", category: "Web App", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" },
    { title: "Nexus", category: "Design System", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" },
    { title: "Apex", category: "E-Commerce", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
    { title: "Nova", category: "Brand Identity", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop" },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight">Selected Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div 
            key={i} 
            ref={el => itemsRef.current[i] = el}
            className="group relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl bg-secondary/20 border border-white/5 cursor-pointer glass-panel"
            data-cursor="hover"
          >
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-20" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-primary text-xs uppercase tracking-widest font-medium block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.category}</span>
              <h3 className="text-3xl font-display font-medium">{project.title}</h3>
            </div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500 z-30" />
          </div>
        ))}
      </div>
    </section>
  );
}
