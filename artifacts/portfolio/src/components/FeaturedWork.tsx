import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  const works = [
    {
      title: "Lumina",
      category: "E-Commerce Experience",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Aether",
      category: "Brand Architecture",
      year: "2023",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Chronos",
      category: "Fintech Platform",
      year: "2023",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="work" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24">
      <div ref={textRef} className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-border pb-12">
        <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight">Featured<br/><span className="text-muted-foreground">Transformations</span></h2>
        <p className="text-muted-foreground max-w-sm text-lg">Pushing boundaries with immersive web experiences that drive results and captivate audiences.</p>
      </div>

      <div className="flex flex-col gap-24">
        {works.map((work, i) => (
          <div 
            key={i} 
            ref={el => itemsRef.current[i] = el}
            className="group relative flex flex-col md:flex-row gap-8 items-center cursor-pointer"
            data-cursor="hover"
          >
            <div className="w-full md:w-3/5 overflow-hidden rounded-lg aspect-[4/3] md:aspect-[16/9] relative">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={work.image} 
                alt={work.title}
                className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-4">
              <span className="text-primary font-medium tracking-widest uppercase text-sm">{work.category}</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium group-hover:text-primary transition-colors duration-500">{work.title}</h3>
              <span className="text-muted-foreground border border-border rounded-full px-4 py-1 w-fit mt-4">{work.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
