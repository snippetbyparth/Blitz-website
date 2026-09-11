'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy-load 3D canvas with SSR disabled
const BlitzLogo3DCanvas = dynamic(
  () => import('./BlitzLogo3d').then((mod) => ({ default: mod.BlitzLogo3DCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="text-slate-400">Loading 3D scene...</div>
      </div>
    ),
  }
);

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  showFallback?: boolean;
}

export function HeroSection({ showFallback = false }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkReducedMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    // Set initial value
    checkReducedMotion();
    
    // Listen for changes
    mediaQuery.addEventListener('change', checkReducedMotion);

    // Check viewport size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      mediaQuery.removeEventListener('change', checkReducedMotion);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!textContainerRef.current || prefersReducedMotion || !sectionRef.current) {
      return;
    }

    // Text elements for animation
    const textElements = textContainerRef.current.querySelectorAll('[data-text]');
    if (textElements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom center',
        scrub: false,
        pin: true,
        pinSpacing: false,
        onLeave: () => {
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
          }
        },
        onEnter: () => {
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.3 });
          }
        },
      },
    });

    const text1 = textElements[0];
    const text2 = textElements[1];
    const text3 = textElements[2];
    const subtitle = textElements[3];

    // Initial state
    gsap.set([text1, text2, text3, subtitle], { opacity: 0, y: 20 });

    // Sequence
    tl.to(text1, { opacity: 1, y: 0, duration: 1 }, 0)
      .to(text1, { opacity: 1, duration: 1 }, 1.5) // Hold
      .to(text1, { opacity: 0, duration: 0.8 }, 2.5) // Fade out

      .to(text2, { opacity: 1, y: 0, duration: 1 }, 2.5) // Fade in while text1 fades
      .to(text2, { opacity: 1, duration: 1 }, 3.5) // Hold
      .to(text2, { opacity: 0, duration: 0.8 }, 4.5) // Fade out

      .to(text3, { opacity: 1, y: 0, duration: 1 }, 4.5) // Fade in
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, 4.8)
      .to([text3, subtitle], { opacity: 1, duration: 2 }, 5.5); // Hold final

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  // Scroll indicator animation
  useEffect(() => {
    if (!scrollIndicatorRef.current || prefersReducedMotion) {
      return;
    }

    const chevron = scrollIndicatorRef.current.querySelector('[data-chevron]');
    if (!chevron) return;

    gsap.to(chevron, {
      y: 4,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900"
    >
      {/* Background 3D Canvas or Fallback */}
      {!isMobile && !prefersReducedMotion && !showFallback ? (
        <div
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        >
          <BlitzLogo3DCanvas autoRotate={true} />
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero/placeholder.svg"
            alt="BLITZ Hero Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
      )}

      {/* Text Content */}
      <div
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Computer Science */}
        <h1
          data-text
          className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wide"
        >
          COMPUTER SCIENCE
        </h1>

        {/* University Info */}
        <h2
          data-text
          className="text-3xl md:text-5xl font-semibold text-blue-300 mb-8"
        >
          KESHAV MAHAVIDYALAYA
          <br />
          UNIVERSITY OF DELHI
        </h2>

        {/* BLITZ */}
        <h3
          data-text
          className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 mb-4"
        >
          BLITZ
        </h3>

        {/* Subtitle */}
        <p
          data-text
          className="text-lg md:text-2xl text-slate-300 font-light tracking-widest"
        >
          Computer Science Departmental Society
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70"
      >
        <p className="text-xs md:text-sm text-slate-400 font-mono uppercase tracking-wider">
          Scroll Down to Access Department
        </p>
        <div
          className="w-0.5 h-12 bg-gradient-to-b from-blue-400 to-transparent"
          data-chevron
        />
        <svg
          className="w-5 h-5 text-blue-400 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 pointer-events-none" />
    </section>
  );
}
