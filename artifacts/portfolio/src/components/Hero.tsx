import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const titleChars = titleRef.current?.querySelectorAll(".char");
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleChars || [],
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      }
    ).fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=1"
    );

    // Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });

      if (titleRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 30;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(titleRef.current, {
          x: xMove,
          y: yMove,
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleText = "DIGITAL CRAFT".split("");

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(183, 123, 87, 0.12), transparent 80%)`
        }}
      />
      
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[150px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDelay: '2s', animationDuration: '8s' }} />

      <div className="relative z-10 text-center px-6 mt-20">
        <h1 
          ref={titleRef}
          className="text-[12vw] leading-[0.8] font-display font-medium tracking-tighter text-foreground perspective-1000"
          style={{ perspective: "1000px" }}
        >
          {titleText.map((char, i) => (
            <span key={i} className="char inline-block origin-bottom">{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>
        <p 
          ref={subtitleRef}
          className="mt-8 text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto tracking-wide"
        >
          We engineer award-winning interactive experiences that blur the line between software and art.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent animate-bounce" />
      </div>
    </section>
  );
}
