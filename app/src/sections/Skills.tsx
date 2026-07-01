import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: 'Financial Modelling',
    description: 'Building DCF and comparative valuation models for equity research',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 36L18 24L26 32L42 16" />
        <path d="M30 16H42V28" />
      </svg>
    ),
  },
  {
    title: 'Equity Research',
    description: 'Deep-dive company analysis, industry dynamics, competitive positioning',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" />
        <path d="M32 32L42 42" />
      </svg>
    ),
  },
  {
    title: 'Bloomberg Terminal',
    description: 'Familiarized with institutional-grade market data and analytics platforms',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="10" width="32" height="28" rx="2" />
        <path d="M8 18H40" />
        <path d="M16 14H20" />
        <path d="M12 26H20" />
        <path d="M12 32H16" />
        <path d="M22 26H30" />
        <path d="M22 32H36" />
      </svg>
    ),
  },
  {
    title: 'MS Excel Advanced',
    description: 'Complex financial modeling, data analysis, and visualization',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="2" />
        <path d="M6 16H42" />
        <path d="M16 6V42" />
        <path d="M12 26L14 26" />
        <path d="M12 32L18 32" />
        <path d="M20 26H28" />
        <path d="M20 32H34" />
      </svg>
    ),
  },
  {
    title: 'Derivatives',
    description: 'NISM Series VIII certified — equity futures, options, and risk management',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8,36 16,20 24,28 40,8" />
        <polyline points="32,8 40,8 40,16" />
      </svg>
    ),
  },
  {
    title: 'Valuation',
    description: 'Intrinsic valuation through DCF and relative valuation methodologies',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="16" height="20" rx="1" />
        <rect x="26" y="6" width="16" height="36" rx="1" />
        <path d="M10 18H18" />
        <path d="M30 18H38" />
        <path d="M30 28H38" />
        <path d="M30 34H34" />
      </svg>
    ),
  },
  {
    title: 'Negotiation',
    description: 'Strategic negotiation frameworks for business and financial contexts',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="14" r="6" />
        <circle cx="32" cy="14" r="6" />
        <path d="M8 36C8 30 12 26 16 26C20 26 22 28 24 30C26 28 28 26 32 26C36 26 40 30 40 36" />
      </svg>
    ),
  },
  {
    title: 'PowerPoint',
    description: 'Compelling investor presentations and research report design',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="32" rx="2" />
        <path d="M4 16H44" />
        <path d="M20 12H28" />
        <circle cx="14" cy="28" r="6" />
        <path d="M26 24H38" />
        <path d="M26 30H34" />
        <path d="M26 34H30" />
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

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

      // Cards stagger
      const cardItems = cards.querySelectorAll('.skill-card');
      gsap.fromTo(
        cardItems,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-cream py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="section-header text-center mb-12 md:mb-16">
          <span
            className="block text-xs font-medium uppercase tracking-[0.08em] text-sage"
            style={{ opacity: 0 }}
          >
            Expertise
          </span>
          <h2
            className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-charcoal leading-[1.1] tracking-[-0.02em] mt-4"
            style={{ opacity: 0 }}
          >
            What I Bring to the Table
          </h2>
          <p
            className="text-base md:text-lg text-sage mt-4 max-w-lg mx-auto"
            style={{ opacity: 0 }}
          >
            A blend of financial acumen, analytical tools, and strategic thinking
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="skill-card group bg-offwhite border border-taupe rounded-xl p-8 text-center hover:border-gold hover:shadow-card hover:-translate-y-1 transition-all duration-400"
              style={{ opacity: 0 }}
            >
              <div className="flex justify-center">{skill.icon}</div>
              <h3 className="text-base font-semibold text-charcoal mt-5">
                {skill.title}
              </h3>
              <p className="text-sm text-sage mt-2 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
