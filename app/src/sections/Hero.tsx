import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextTunnel from '@/components/TextTunnel';

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Label fade in
    tl.to(labelRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Heading words reveal
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Subheading fade in
    tl.to(
      subRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // CTAs fade in
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Social links fade in
    tl.to(
      socialRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] grid grid-cols-1 md:grid-cols-2">
      {/* Left Column - Content */}
      <div
        ref={leftRef}
        className="relative z-10 bg-cream flex flex-col justify-center px-6 md:px-12 lg:px-16 py-24 md:py-0"
      >
        <div className="max-w-xl">
          {/* Label */}
          <span
            ref={labelRef}
            className="block text-xs font-medium uppercase tracking-[0.12em] text-sage mb-6"
            style={{ opacity: 0 }}
          >
            IIM JAMMU &middot; IPM 2025-2030
          </span>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="font-display text-[40px] md:text-[56px] lg:text-[72px] font-normal text-charcoal leading-[1.05] tracking-[-0.02em]"
          >
            <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              Finance
            </span>{' '}
            <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              &amp;
            </span>
            <br />
            <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              Strategic
            </span>{' '}
            <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(40px)' }}>
              Thinking
            </span>
          </h1>

          {/* Subheading */}
          <p
            ref={subRef}
            className="mt-6 text-base md:text-lg text-sage max-w-[480px] leading-relaxed"
            style={{ opacity: 0 }}
          >
            Equity researcher. Brand strategist. National finalist at IIT Delhi.
            Building analytical models and market-ready brands.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ opacity: 0 }}
          >
            <a
              href="#projects"
              onClick={handleScrollToWork}
              className="inline-flex items-center px-8 py-3.5 bg-charcoal text-cream text-sm font-medium rounded-full hover:bg-gold hover:text-charcoal transition-all duration-400"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-3.5 border border-charcoal text-charcoal text-sm font-medium rounded-full hover:bg-charcoal hover:text-cream transition-all duration-400"
            >
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div
            ref={socialRef}
            className="mt-12 flex items-center gap-6"
            style={{ opacity: 0 }}
          >
            <a
              href="https://linkedin.com/in/vinayakkanchal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-gold" />
              LinkedIn
            </a>
            <a
              href="mailto:ipm25144@iimj.ac.in"
              className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-gold" />
              Email
            </a>
            <a
              href="tel:+918318042694"
              className="flex items-center gap-2 text-sm text-sage hover:text-charcoal transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-gold" />
              Phone
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Text Tunnel */}
      <div className="relative bg-charcoal min-h-[45vh] md:min-h-0">
        <TextTunnel />
      </div>
    </section>
  );
}
