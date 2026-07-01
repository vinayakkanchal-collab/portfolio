import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    number: '01',
    title: 'National Finalist — IIT Delhi Case Competition',
    description:
      'Selected among the top 16 teams from over 1,600 participating teams nationwide, demonstrating strategic problem-solving under pressure.',
  },
  {
    number: '02',
    title: 'Member — Financial Analytics, The Finance Club, IIM Jammu',
    description:
      'Preparing equity research reports with DCF modeling and relative valuation, tracking market trends and presenting insights to the club.',
  },
  {
    number: '03',
    title: 'Three Professional Certifications',
    description:
      'Financial Markets from Yale University, Valuation & Financial Analysis from NSE Academy, and NISM Series VIII — Equity Derivatives from SEBI.',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      const header = section.querySelector('.section-header');
      if (header) {
        gsap.fromTo(
          header.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Achievement items
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Number count-up effect
        const numEl = item.querySelector('.achievement-number');
        if (numEl) {
          ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                numEl,
                { opacity: 0, scale: 0.8 },
                { opacity: 0.3, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
              );
            },
            once: true,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="bg-charcoal py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="section-header text-center mb-12 md:mb-16">
          <span
            className="block text-xs font-medium uppercase tracking-[0.08em] text-gold"
            style={{ opacity: 0 }}
          >
            Milestones
          </span>
          <h2
            className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-cream leading-[1.1] tracking-[-0.02em] mt-4"
            style={{ opacity: 0 }}
          >
            Key Achievements
          </h2>
        </div>

        {/* Achievements List */}
        <div className="flex flex-col">
          {achievements.map((achievement, i) => (
            <div
              key={achievement.number}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-6 md:gap-10 py-8 md:py-10">
                {/* Number */}
                <span
                  className="achievement-number font-mono text-[48px] md:text-[72px] text-gold leading-none flex-shrink-0 w-16 md:w-24"
                  style={{ opacity: 0 }}
                >
                  {achievement.number}
                </span>

                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                  <h3 className="text-lg md:text-2xl font-semibold text-cream leading-[1.3]">
                    {achievement.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#A0A8A0] leading-relaxed mt-3 max-w-2xl">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              {i < achievements.length - 1 && (
                <div className="w-full h-px bg-cream/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
