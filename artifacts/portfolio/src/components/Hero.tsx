import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const titleChars = titleRef.current?.querySelectorAll(".char");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 3.5, ease: "power2.inOut", delay: 0.3 }
    ).fromTo(
      taglineRef.current,
      { y: 20, opacity: 0, letterSpacing: "0.6em" },
      { y: 0, opacity: 1, letterSpacing: "0.3em", duration: 1.4 },
      "-=2.5"
    ).fromTo(
      titleChars || [],
      { y: 130, opacity: 0, rotateX: -75, transformOrigin: "bottom center" },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 1.7 },
      "-=0.9"
    ).fromTo(
      subtitleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });

      if (titleRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 20;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 16;
        gsap.to(titleRef.current, {
          x: xMove,
          y: yMove,
          duration: 1.6,
          ease: "power2.out",
        });
      }

      if (videoRef.current) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 12;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 8;
        gsap.to(videoRef.current, {
          x: xMove,
          y: yMove,
          duration: 2.5,
          ease: "power1.out",
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
      {/* Cinematic background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          style={{ filter: "blur(2px) brightness(0.28) saturate(0.7)" }}
          poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-with-crema-close-up-4882-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-smoke-rising-from-incense-2889-large.mp4" type="video/mp4" />
        </video>
        {/* Cinematic vignette & overlays */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(26,21,18,0.45) 0%, rgba(26,21,18,0.88) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(26,21,18,0.7) 0%, rgba(26,21,18,0.1) 40%, rgba(26,21,18,0.1) 60%, rgba(26,21,18,0.9) 100%)"
        }} />
      </div>

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, rgba(183,123,87,0.09), transparent 72%)`,
          transition: "background 0.12s ease",
        }}
      />

      {/* Ambient warm orb */}
      <div
        className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(183,123,87,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "floatOrb 16s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-20 select-none">
        <span
          ref={taglineRef}
          className="block text-[10px] md:text-xs uppercase text-primary/60 mb-10 font-medium"
          style={{ letterSpacing: "0.3em" }}
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
          <span
            className="block"
            style={{
              WebkitTextStroke: "1px rgba(246,240,232,0.16)",
              color: "transparent",
            }}
          >
            {line2.map((char, i) => (
              <span key={i} className="char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-10 text-base md:text-lg text-muted-foreground/70 font-light max-w-lg mx-auto leading-relaxed tracking-wide"
        >
          We engineer award-winning interactive experiences that blur the line between software and art.
        </p>
      </div>

      {/* Subtle bottom fade — no text */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to top, rgba(26,21,18,1), transparent)" }}
      />

      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0) scale(1); }
          40% { transform: translate(40px,-25px) scale(1.05); }
          70% { transform: translate(-25px,18px) scale(0.96); }
        }
      `}</style>
    </section>
  );
}
