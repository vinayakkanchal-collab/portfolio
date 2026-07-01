import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const stats = statsRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left column slides in
      gsap.fromTo(
        left,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Right column content
      const paragraphs = right.querySelectorAll('p');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats with count-up
      if (stats) {
        const statItems = stats.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stats,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Count up animation
        statItems.forEach((item) => {
          const numEl = item.querySelector('.stat-number') as HTMLElement;
          if (!numEl) return;

          const target = parseFloat(numEl.dataset.value || '0');
          const isDecimal = numEl.dataset.decimal === 'true';

          ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
              const obj = { value: 0 };
              gsap.to(obj, {
                value: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  if (isDecimal) {
                    numEl.textContent = obj.value.toFixed(2);
                  } else {
                    numEl.textContent = obj.value.toFixed(2) + '%';
                  }
                },
              });
            },
            once: true,
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-cream py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 md:gap-16">
        {/* Left Column */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-sage">
            About
          </span>
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-charcoal leading-[1.1] tracking-[-0.02em] mt-4">
            Turning Data
            <br />
            Into Decisions
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-6" />
        </div>

        {/* Right Column */}
        <div ref={rightRef}>
          <p className="text-base text-charcoal leading-relaxed">
            I'm Vinayak Kanchal, a 19-year-old Integrated Program in Management
            student at IIM Jammu. My world revolves around financial markets,
            equity research, and the art of building brands that solve real
            problems.
          </p>
          <p className="text-base text-charcoal leading-relaxed mt-6">
            From simulating KFC service operations with 100-customer datasets to
            conceptualizing CocoCare — a wellness chocolate brand targeting
            India's ₹19,000+ crore market — I bring analytical rigor and
            creative strategy to every challenge.
          </p>

          {/* Statistics */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-taupe"
          >
            <div className="stat-item">
              <span
                className="stat-number font-mono text-[32px] md:text-[48px] text-gold leading-none"
                data-value="7.12"
                data-decimal="true"
              >
                0.00
              </span>
              <p className="text-sm text-sage mt-2">CGPA at IIM Jammu</p>
            </div>
            <div className="stat-item">
              <span
                className="stat-number font-mono text-[32px] md:text-[48px] text-gold leading-none"
                data-value="96.75"
                data-decimal="false"
              >
                0.00%
              </span>
              <p className="text-sm text-sage mt-2">Class XII Score</p>
            </div>
            <div className="stat-item">
              <span
                className="stat-number font-mono text-[32px] md:text-[48px] text-gold leading-none"
                data-value="97.80"
                data-decimal="false"
              >
                0.00%
              </span>
              <p className="text-sm text-sage mt-2">Class X Score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
