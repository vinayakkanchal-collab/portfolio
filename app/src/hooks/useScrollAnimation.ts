import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  triggerStart?: string;
  stagger?: number;
  childrenSelector?: string;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      triggerStart = 'top 80%',
      stagger = 0.1,
      childrenSelector,
      delay = 0,
    } = options;

    const targets = childrenSelector
      ? element.querySelectorAll(childrenSelector)
      : element;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        from,
        {
          ...to,
          delay,
          stagger: childrenSelector ? stagger : 0,
          scrollTrigger: {
            trigger: element,
            start: triggerStart,
            toggleActions: 'play none none none',
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useCountUp(
  endValue: number,
  duration: number = 2,
  decimals: number = 0
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          const obj = { value: 0 };
          gsap.to(obj, {
            value: endValue,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              if (element) {
                element.textContent =
                  decimals > 0
                    ? obj.value.toFixed(decimals)
                    : Math.round(obj.value).toString();
              }
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [endValue, duration, decimals]);

  return ref;
}
