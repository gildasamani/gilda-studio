import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const titleChars = titleRef.current?.querySelectorAll(".char");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0, letterSpacing: "0.5em" },
      { y: 0, opacity: 1, letterSpacing: "0.3em", duration: 1.4, delay: 0.2 }
    ).fromTo(
      titleChars || [],
      { y: 120, opacity: 0, rotateX: -80, transformOrigin: "bottom center" },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.035, duration: 1.6 },
      "-=0.8"
    ).fromTo(
      subtitleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.9"
    );

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });

      if (titleRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 22;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 18;
        gsap.to(titleRef.current, {
          x: xMove,
          y: yMove,
          duration: 1.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const line1 = "IMMERSIVE".split("");
  const line2 = "BY DESIGN".split("");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 700px at ${mousePos.x}% ${mousePos.y}%, rgba(183,123,87,0.10), transparent 75%)`,
          transition: "background 0.15s ease",
        }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(183,123,87,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "floatOrb 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(42,33,29,0.6) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "floatOrb 18s ease-in-out infinite reverse",
        }}
      />

      <div className="relative z-10 text-center px-6 mt-24 select-none">
        <span
          ref={taglineRef}
          className="block text-xs md:text-sm uppercase tracking-[0.3em] text-primary/70 mb-8 font-medium"
        >
          Reframe Studio — Creative Digital Experience
        </span>

        <h1
          ref={titleRef}
          className="font-display font-medium tracking-tighter leading-[0.82] text-foreground"
          style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)", perspective: "1200px" }}
        >
          <span className="block">
            {line1.map((char, i) => (
              <span key={i} className="char inline-block origin-bottom">
                {char}
              </span>
            ))}
          </span>
          <span className="block text-primary/20" style={{ WebkitTextStroke: "1px rgba(246,240,232,0.18)" }}>
            {line2.map((char, i) => (
              <span key={i} className="char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-10 text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto leading-relaxed"
        >
          We engineer award-winning interactive experiences that blur the line between software and art.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/50">Scroll to explore</span>
        <div className="w-px h-14 bg-gradient-to-b from-primary/50 to-transparent" style={{ animation: "scrollIndicator 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.04); }
          66% { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes scrollIndicator {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.9; transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
}
