import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const titleChars = titleRef.current?.querySelectorAll(".char");
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      taglineRef.current,
      { y: 24, opacity: 0, letterSpacing: "0.6em" },
      { y: 0, opacity: 1, letterSpacing: "0.3em", duration: 1.5, delay: 0.3 }
    ).fromTo(
      titleChars || [],
      { y: 140, opacity: 0, rotateX: -70, transformOrigin: "bottom center" },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 1.8 },
      "-=0.9"
    ).fromTo(
      subtitleRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: "power3.out" },
      "-=0.9"
    );

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });

      if (titleRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 18;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 14;
        gsap.to(titleRef.current, { x: xMove, y: yMove, duration: 1.8, ease: "power2.out" });
      }
      if (orbRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * -30;
        const yMove = (e.clientY / window.innerHeight - 0.5) * -20;
        gsap.to(orbRef.current, { x: xMove, y: yMove, duration: 3, ease: "power1.out" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const line1 = "IMMERSIVE".split("");
  const line2 = "BY DESIGN".split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Deep layered dark atmosphere */}
      <div className="absolute inset-0 z-0" style={{
        background: "radial-gradient(ellipse 90% 70% at 50% 40%, #241c17 0%, #1A1512 55%, #0f0c0a 100%)"
      }} />

      {/* Slow warm orb — mouse reactive */}
      <div ref={orbRef} className="absolute pointer-events-none z-0" style={{
        top: "20%", left: "30%",
        width: "720px", height: "720px",
        background: "radial-gradient(circle, rgba(183,123,87,0.11) 0%, rgba(183,123,87,0.03) 50%, transparent 72%)",
        filter: "blur(70px)",
        animation: "floatOrb 18s ease-in-out infinite",
      }} />

      {/* Secondary cool-dark orb */}
      <div className="absolute pointer-events-none z-0" style={{
        bottom: "15%", right: "20%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(42,33,29,0.7) 0%, transparent 70%)",
        filter: "blur(90px)",
        animation: "floatOrb 24s ease-in-out infinite reverse",
      }} />

      {/* Diagonal vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: "linear-gradient(135deg, rgba(10,8,6,0.6) 0%, transparent 40%, transparent 60%, rgba(10,8,6,0.5) 100%)"
      }} />

      {/* Mouse glow */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        background: `radial-gradient(circle 700px at ${mousePos.x}% ${mousePos.y}%, rgba(183,123,87,0.08), transparent 70%)`,
        transition: "background 0.1s ease",
      }} />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 mt-16 select-none">
        <span
          ref={taglineRef}
          className="block text-[10px] md:text-[11px] uppercase text-primary/50 mb-10 font-medium"
          style={{ letterSpacing: "0.3em" }}
        >
          Gilda Studio — Creative Digital Experience
        </span>

        <h1
          ref={titleRef}
          className="font-display font-medium tracking-tighter leading-[0.82] text-foreground"
          style={{ fontSize: "clamp(3.8rem, 11.5vw, 12rem)", perspective: "1400px" }}
        >
          <span className="block">
            {line1.map((char, i) => (
              <span key={i} className="char inline-block origin-bottom">{char}</span>
            ))}
          </span>
          <span className="block" style={{
            WebkitTextStroke: "1px rgba(246,240,232,0.13)",
            color: "transparent",
          }}>
            {line2.map((char, i) => (
              <span key={i} className="char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-11 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed"
          style={{ color: "rgba(216,197,174,0.55)", letterSpacing: "0.01em" }}
        >
          We engineer award-winning interactive experiences that blur the line between software and art.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[2]" style={{
        background: "linear-gradient(to top, #1A1512, transparent)"
      }} />

      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0) scale(1); }
          35% { transform: translate(35px,-22px) scale(1.04); }
          70% { transform: translate(-22px,16px) scale(0.97); }
        }
      `}</style>
    </section>
  );
}
