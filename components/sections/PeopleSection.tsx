'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PeopleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !labelsRef.current) return;

    const labels = labelsRef.current.querySelectorAll('[data-label]');

    gsap.set([textRef.current, labels], { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
    });

    tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .to(
        labels,
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
        0.4
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const labels = ['Faculty', 'Students', 'Society'];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-16"
    >
      <h2
        ref={textRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl mb-16"
      >
        A department is more than its classrooms.
      </h2>

      <div
        ref={labelsRef}
        className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center"
      >
        {labels.map((label) => (
          <p
            key={label}
            data-label
            className="text-lg md:text-xl text-blue-300 font-mono tracking-widest uppercase"
          >
            {label}
          </p>
        ))}
      </div>
    </section>
  );
}
