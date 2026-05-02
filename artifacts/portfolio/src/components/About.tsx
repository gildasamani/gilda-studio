import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "wouter";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/30 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(183,123,87,0.05),transparent_50%)]" />
      
      <div className="max-w-5xl mx-auto" ref={textRef}>
        <h2 className="text-4xl md:text-6xl font-display font-medium mb-12">The Studio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              We are a collective of designers, engineers, and strategists crafting digital experiences for ambitious brands. We believe that technology should evoke emotion.
            </p>
            <div className="mt-12 flex gap-8">
              <div>
                <span className="block text-4xl font-display text-primary mb-2">12+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Awards</span>
              </div>
              <div>
                <span className="block text-4xl font-display text-primary mb-2">40+</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Projects</span>
              </div>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-xl font-medium mb-6 clip-text-accent">Our Philosophy</h3>
            <ul className="space-y-6">
              <li className="border-b border-border/50 pb-4">
                <span className="text-primary block mb-1">01</span>
                Form follows emotion.
              </li>
              <li className="border-b border-border/50 pb-4">
                <span className="text-primary block mb-1">02</span>
                Performance is a design feature.
              </li>
              <li className="pb-4">
                <span className="text-primary block mb-1">03</span>
                Details are not the details. They make the design.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
