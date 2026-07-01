import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: 'BRAND STRATEGY',
    title: 'CocoCare — B2C Wellness Chocolate Brand',
    description:
      'Conceptualized a Blue Ocean strategy to reposition chocolate from childhood indulgence to adult self-care ritual. Designed a three-variant portfolio (Blush Balance, Orange Shield, Gut Glow) with functional ingredients, backed by perceptual mapping and a four-tier pricing architecture from ₹89 to ₹2,199.',
    link: 'View Case Study',
    image: '/images/cocoare-hero.jpg',
  },
  {
    tag: 'COMPUTATIONAL THINKING',
    title: 'KFC Service Operation Simulation',
    description:
      'Simulated end-to-end KFC outlet operations using a 100-customer dataset, modeling interarrival time, order preparation, server idle time, and waiting time. Identified bottlenecks in the queuing process and proposed data-backed recommendations to improve server utilization.',
    link: 'View Details',
    image: '/images/kfc-simulation.jpg',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      const header = section.querySelector('.section-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-offwhite py-20 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="section-header mb-12 md:mb-16" style={{ opacity: 0 }}>
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-sage">
            Selected Work
          </span>
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-normal text-charcoal leading-[1.1] tracking-[-0.02em] mt-4">
            Projects That Define Me
          </h2>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-10 md:gap-12">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group bg-offwhite border border-taupe rounded-lg overflow-hidden hover:border-gold hover:shadow-card hover:-translate-y-1 transition-all duration-400"
              style={{ opacity: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[45%_55%]">
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-gold">
                    {project.tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-medium text-charcoal leading-[1.3] tracking-[-0.01em] mt-4">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-sage leading-relaxed mt-4">
                    {project.description}
                  </p>
                  <button className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-charcoal hover:text-gold transition-colors duration-300 group/btn">
                    {project.link}
                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
