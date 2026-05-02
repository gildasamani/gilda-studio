import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 78%" } }
    );
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        delay: 0.15 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputCls = [
    "w-full bg-transparent rounded-xl px-5 py-4 text-sm tracking-wide focus:outline-none transition-all duration-400",
    "placeholder:text-[rgba(216,197,174,0.22)] text-[rgba(246,240,232,0.85)]",
    "border border-[rgba(255,255,255,0.07)]",
    "focus:border-[rgba(183,123,87,0.45)] focus:shadow-[0_0_0_1px_rgba(183,123,87,0.15),0_0_28px_rgba(183,123,87,0.06)]",
  ].join(" ");

  const labelCls = "text-[10px] uppercase tracking-[0.2em] block mb-2" ;

  return (
    <section id="contact" className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 85%, rgba(183,123,87,0.065), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-7" style={{ color: "rgba(183,123,87,0.5)" }}>Start a Conversation</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.85] mb-7" style={{ fontSize: "clamp(2.5rem,7vw,6.5rem)" }}>
            Let's Create<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.16)", color: "transparent" }}>Something</span>
            <br />Unforgettable
          </h2>
          <p className="text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(216,197,174,0.48)" }}>
            Every great experience starts with a single question. What's yours?
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl p-16 text-center border" style={{
            background: "rgba(42,33,29,0.3)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(183,123,87,0.18)",
            boxShadow: "0 0 60px rgba(183,123,87,0.06)",
          }}>
            <div className="w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-6"
              style={{ borderColor: "rgba(183,123,87,0.4)", boxShadow: "0 0 30px rgba(183,123,87,0.18)" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="rgba(183,123,87,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl mb-3" style={{ color: "rgba(246,240,232,0.9)" }}>Message received.</h3>
            <p className="text-sm" style={{ color: "rgba(216,197,174,0.5)" }}>We'll be in touch soon — expect something thoughtful.</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 md:p-12 border"
            style={{
              background: "rgba(26,21,18,0.55)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>Name</label>
                <input required type="text" placeholder="Your full name" className={inputCls} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>Email</label>
                <input required type="email" placeholder="you@domain.com" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>
                  Website <span className="normal-case tracking-normal" style={{ color: "rgba(216,197,174,0.22)" }}>(optional)</span>
                </label>
                <input type="url" placeholder="https://yoursite.com" className={inputCls} />
              </div>
              <div>
                <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>Project Type</label>
                <select required className={inputCls + " appearance-none cursor-pointer"} defaultValue="">
                  <option value="" disabled>Select a direction</option>
                  <option value="website">New Website Build</option>
                  <option value="redesign">Website Redesign</option>
                  <option value="wordpress">WordPress Development</option>
                  <option value="experience">Digital Experience</option>
                  <option value="ui">UI Implementation</option>
                  <option value="other">Something Else</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>Estimated Budget</label>
              <select required className={inputCls + " appearance-none cursor-pointer"} defaultValue="">
                <option value="" disabled>Investment range</option>
                <option value="2-5k">$2k – $5k</option>
                <option value="5-15k">$5k – $15k</option>
                <option value="15-40k">$15k – $40k</option>
                <option value="40k+">$40k+</option>
              </select>
            </div>

            <div className="mb-10">
              <label className={labelCls} style={{ color: "rgba(216,197,174,0.38)" }}>Your Vision</label>
              <textarea
                required
                rows={5}
                placeholder="Describe what you want to build. What should it feel like? What should it do? What makes it different?"
                className={inputCls + " resize-none leading-relaxed"}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative px-12 py-[14px] rounded-full text-sm uppercase tracking-[0.2em] overflow-hidden border transition-all duration-500"
                style={{ borderColor: "rgba(183,123,87,0.38)", color: "rgba(183,123,87,0.9)" }}
              >
                <span className="relative z-10 group-hover:text-background transition-colors duration-400">
                  Start a Conversation
                </span>
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                  style={{ background: "rgba(183,123,87,1)", zIndex: 0 }} />
              </button>
            </div>
          </form>
        )}

        <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(216,197,174,0.3)" }}>© 2025 Reframe Studio</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {["Twitter", "Instagram", "Dribbble"].map(s => (
              <a key={s} href="#" className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: "rgba(216,197,174,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(183,123,87,0.7)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(216,197,174,0.3)")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
