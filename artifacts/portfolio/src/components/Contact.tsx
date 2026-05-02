import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Magnetic button effect
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
      
      <h2 className="text-6xl md:text-8xl font-display font-medium mb-8">Ready to build?</h2>
      <p className="text-xl text-muted-foreground mb-16 max-w-xl">
        Let's discuss how we can bring your vision to life with cinematic precision.
      </p>
      
      <button 
        ref={btnRef}
        className="w-48 h-48 rounded-full bg-primary text-background font-medium text-lg tracking-wide hover:scale-105 transition-transform duration-300 relative group flex items-center justify-center"
      >
        <span className="relative z-10">Say Hello</span>
        <div className="absolute inset-0 rounded-full border border-primary scale-110 opacity-0 group-hover:animate-ping" />
      </button>
      
      <div className="mt-32 w-full max-w-4xl border-t border-border pt-8 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
        <span>© 2024 StudioX. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-primary transition-colors">Dribbble</a>
        </div>
      </div>
    </section>
  );
}
