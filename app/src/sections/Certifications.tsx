import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    institution: 'YALE UNIVERSITY / COURSERA',
    name: 'Financial Markets',
    year: '2025',
  },
  {
    institution: 'NSE ACADEMY',
    name: 'Valuation & Financial Analysis',
    year: '2025',
  },
  {
    institution: 'NISM / SEBI',
    name: 'NISM Series VIII — Equity Derivatives',
    year: '2025',
  },
];

export default function Certifications() {
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
          { opacity: 0, y: 30 },
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

      // Cards animation
      const cardItems = cards.querySelectorAll('.cert-card');
      gsap.fromTo(
        cardItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-cream py-16 md:py-20 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="section-header mb-10 md:mb-12">
          <span
            className="block text-xs font-medium uppercase tracking-[0.08em] text-sage"
            style={{ opacity: 0 }}
          >
            Credentials
          </span>
          <h2
            className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-charcoal leading-[1.1] tracking-[-0.02em] mt-4"
            style={{ opacity: 0 }}
          >
            Certifications
          </h2>
        </div>

        {/* Cert Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="cert-card group bg-offwhite border border-taupe rounded-lg p-8 hover:border-gold transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-sage">
                {cert.institution}
              </span>
              <h3 className="text-lg md:text-xl font-medium text-charcoal mt-3 leading-[1.4]">
                {cert.name}
              </h3>
              <span className="text-sm text-sage mt-4 block">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
