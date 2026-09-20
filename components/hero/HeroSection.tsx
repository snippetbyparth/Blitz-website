'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DepartmentMarquee } from './DepartmentMarquee';
import { IntroductionCopy } from './IntroductionCopy';
import { NavBar } from '../shared/NavBar';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !logoRef.current) return;

    const logo = logoRef.current;
    const initialLogoTop = window.innerHeight * 0.414;
    const navbarLogoTop = 37;
    const context = gsap.context(() => {
      gsap.set(logo, { xPercent: -50, yPercent: -50 });
      gsap.to(logo, {
        y: -(initialLogoTop - navbarLogoTop),
        scale: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="introduction">
      <NavBar logoRef={logoRef} />
      <DepartmentMarquee />
      <IntroductionCopy />
    </section>
  );
}
