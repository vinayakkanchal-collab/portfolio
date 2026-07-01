import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        right,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-charcoal py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left Column */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-gold">
            Get in Touch
          </span>
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-cream leading-[1.1] tracking-[-0.02em] mt-4">
            Let's Build
            <br />
            Something Together
          </h2>
          <p className="text-base md:text-lg text-[#A0A8A0] mt-6 max-w-md leading-relaxed">
            Whether it's equity research, financial modeling, or brand strategy —
            I'm always open to meaningful conversations.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 mt-10">
            <a
              href="https://linkedin.com/in/vinayakkanchal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream hover:text-gold transition-colors duration-300 group"
            >
              LinkedIn
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="mailto:ipm25144@iimj.ac.in"
              className="inline-flex items-center gap-2 text-sm text-cream hover:text-gold transition-colors duration-300 group"
            >
              Email
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="tel:+918318042694"
              className="inline-flex items-center gap-2 text-sm text-cream hover:text-gold transition-colors duration-300 group"
            >
              Phone
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right Column — Form */}
        <div
          ref={rightRef}
          className="bg-white/[0.04] border border-cream/10 rounded-xl p-8 md:p-10"
          style={{ opacity: 0 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4956A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-cream">Message Sent!</h3>
              <p className="text-[#A0A8A0] mt-2">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-[0.08em] text-[#A0A8A0] mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full h-[52px] bg-white/[0.06] border border-cream/15 rounded-lg px-4 text-cream placeholder:text-sage/60 focus:border-gold focus:outline-none transition-colors duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-[0.08em] text-[#A0A8A0] mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full h-[52px] bg-white/[0.06] border border-cream/15 rounded-lg px-4 text-cream placeholder:text-sage/60 focus:border-gold focus:outline-none transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium uppercase tracking-[0.08em] text-[#A0A8A0] mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="w-full bg-white/[0.06] border border-cream/15 rounded-lg px-4 py-3 text-cream placeholder:text-sage/60 focus:border-gold focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full h-[52px] bg-gold text-charcoal font-semibold rounded-lg hover:bg-[#D4A574] transition-colors duration-300 mt-2"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
