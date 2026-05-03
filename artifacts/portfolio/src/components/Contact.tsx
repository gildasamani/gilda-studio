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
        scrollTrigger: { trigger: formRef.current, start: "top 82%" }, delay: 0.15 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
    fontSize: "0.875rem",
    letterSpacing: "0.01em",
    color: "rgba(246,240,232,0.92)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    caretColor: "rgba(183,123,87,1)",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(183,123,87,0.55)";
    e.currentTarget.style.boxShadow = "0 0 0 1px rgba(183,123,87,0.2), 0 0 28px rgba(183,123,87,0.08)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
    e.currentTarget.style.boxShadow = "none";
  };

  const labelStyle: React.CSSProperties = { color: "rgba(216,197,174,0.72)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: "0.5rem" };

  return (
    <section id="contact" className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 50% 85%, rgba(183,123,87,0.07), transparent)"
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-[0.32em] block mb-7" style={{ color: "rgba(183,123,87,0.65)" }}>Start a Conversation</span>
          <h2 className="font-display font-medium tracking-tight leading-[0.85] mb-7" style={{ fontSize: "clamp(2.5rem,7vw,6.5rem)" }}>
            Let's Create<br />
            <span style={{ WebkitTextStroke: "1px rgba(246,240,232,0.16)", color: "transparent" }}>Something</span>
            <br />Unforgettable
          </h2>
          <p className="text-base font-light max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(216,197,174,0.62)" }}>
            Every great experience starts with a single question. What's yours?
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl p-16 text-center border" style={{
            background: "rgba(42,33,29,0.5)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(183,123,87,0.22)",
            boxShadow: "0 0 60px rgba(183,123,87,0.08)",
          }}>
            <div className="w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-6"
              style={{ borderColor: "rgba(183,123,87,0.45)", boxShadow: "0 0 30px rgba(183,123,87,0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="rgba(183,123,87,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-2xl mb-3" style={{ color: "rgba(246,240,232,0.92)" }}>Message received.</h3>
            <p className="text-sm" style={{ color: "rgba(216,197,174,0.62)" }}>We'll be in touch soon — expect something thoughtful.</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 md:p-12 border"
            style={{
              background: "rgba(26,21,18,0.75)",
              backdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label style={labelStyle}>Name</label>
                <input required type="text" placeholder="Your full name"
                  style={{ ...inputBase, color: "rgba(246,240,232,0.92)" }}
                  className="placeholder-[rgba(216,197,174,0.38)]"
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input required type="email" placeholder="you@domain.com"
                  style={{ ...inputBase }}
                  className="placeholder-[rgba(216,197,174,0.38)]"
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label style={labelStyle}>
                  Website <span style={{ color: "rgba(216,197,174,0.38)", fontSize: 10, letterSpacing: "0.02em", textTransform: "none" }}>(optional)</span>
                </label>
                <input type="url" placeholder="https://yoursite.com"
                  style={{ ...inputBase }}
                  className="placeholder-[rgba(216,197,174,0.38)]"
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={labelStyle}>Project Type</label>
                <select required defaultValue=""
                  style={{ ...inputBase, appearance: "none", cursor: "pointer", color: "rgba(246,240,232,0.92)", background: "rgba(255,255,255,0.055)" }}
                  onFocus={handleFocus} onBlur={handleBlur}>
                  <option value="" disabled style={{ background: "#1A1512", color: "rgba(216,197,174,0.5)" }}>Select a direction</option>
                  <option value="website" style={{ background: "#1A1512" }}>New Website Build</option>
                  <option value="redesign" style={{ background: "#1A1512" }}>Website Redesign</option>
                  <option value="wordpress" style={{ background: "#1A1512" }}>WordPress Development</option>
                  <option value="experience" style={{ background: "#1A1512" }}>Digital Experience</option>
                  <option value="ui" style={{ background: "#1A1512" }}>UI Implementation</option>
                  <option value="other" style={{ background: "#1A1512" }}>Something Else</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label style={labelStyle}>Estimated Budget</label>
              <select required defaultValue=""
                style={{ ...inputBase, appearance: "none", cursor: "pointer", color: "rgba(246,240,232,0.92)", background: "rgba(255,255,255,0.055)" }}
                onFocus={handleFocus} onBlur={handleBlur}>
                <option value="" disabled style={{ background: "#1A1512", color: "rgba(216,197,174,0.5)" }}>Investment range</option>
                <option value="2-5k" style={{ background: "#1A1512" }}>$2k – $5k</option>
                <option value="5-15k" style={{ background: "#1A1512" }}>$5k – $15k</option>
                <option value="15-40k" style={{ background: "#1A1512" }}>$15k – $40k</option>
                <option value="40k+" style={{ background: "#1A1512" }}>$40k+</option>
              </select>
            </div>

            <div className="mb-10">
              <label style={labelStyle}>Your Vision</label>
              <textarea
                required rows={5}
                placeholder="Describe what you want to build. What should it feel like? What should it do? What makes it different?"
                style={{ ...inputBase, resize: "none", lineHeight: "1.7" }}
                className="placeholder-[rgba(216,197,174,0.38)]"
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative px-12 py-4 rounded-full text-sm uppercase tracking-[0.2em] overflow-hidden border transition-all duration-500 font-medium"
                style={{ borderColor: "rgba(183,123,87,0.45)", color: "rgba(183,123,87,0.95)" }}
              >
                <span className="relative z-10 group-hover:text-[#1A1512] transition-colors duration-400">
                  Start a Conversation
                </span>
                <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full"
                  style={{ background: "rgba(183,123,87,1)", zIndex: 0 }} />
              </button>
            </div>
          </form>
        )}

        <div className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(216,197,174,0.38)" }}>© 2025 Reframe Studio</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            {["Twitter", "Instagram", "Dribbble"].map(s => (
              <a key={s} href="#" className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: "rgba(216,197,174,0.38)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(183,123,87,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(216,197,174,0.38)")}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
