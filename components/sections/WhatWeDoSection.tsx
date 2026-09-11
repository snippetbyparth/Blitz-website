'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Concept {
  title: 'LEARN' | 'BUILD' | 'COMPETE' | 'EXPLORE' | 'CONNECT';
  items: string[];
  color: string;
}

const concepts: Concept[] = [
  {
    title: 'LEARN',
    items: [
      'Workshops',
      'Seminars',
      'Technical Sessions',
      'Guest Lectures',
      'Skill Development',
    ],
    color: 'from-blue-600 to-blue-500',
  },
  {
    title: 'BUILD',
    items: [
      'Hackathons',
      'Project Development',
      'Collaboration',
      'Innovation Labs',
      'Open Source',
    ],
    color: 'from-cyan-600 to-cyan-500',
  },
  {
    title: 'COMPETE',
    items: [
      'Coding Contests',
      'Case Competitions',
      'Hackathon Participation',
      'Tournament Events',
      'Team Challenges',
    ],
    color: 'from-indigo-600 to-indigo-500',
  },
  {
    title: 'EXPLORE',
    items: [
      'Research Papers',
      'Emerging Technologies',
      'Tech Trends',
      'Industry Insights',
      'Career Paths',
    ],
    color: 'from-purple-600 to-purple-500',
  },
  {
    title: 'CONNECT',
    items: [
      'Networking Events',
      'Alumni Meets',
      'Industry Partnerships',
      'Social Activities',
      'Community Building',
    ],
    color: 'from-pink-600 to-pink-500',
  },
];

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !itemsRef.current)
      return;

    const items = itemsRef.current.querySelectorAll('[data-item]');

    gsap.set([titleRef.current, items], { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    // Cycle through concepts
    concepts.forEach((concept, index) => {
      const startProgress = index / concepts.length;
      const endProgress = (index + 1) / concepts.length;

      // Fade in title
      tl.to(
        titleRef.current,
        { opacity: 1, duration: 0.2 },
        startProgress
      );

      // Update title text (via data attribute)
      tl.call(
        () => {
          if (titleRef.current) {
            titleRef.current.textContent = concept.title;
            (titleRef.current as HTMLHeadingElement).dataset.concept = concept.title;
          }
        },
        [],
        startProgress + 0.05
      );

      // Fade in items
      tl.to(
        items,
        { opacity: 0, duration: 0.15 },
        startProgress + 0.08
      );

      // Update items
      tl.call(
        () => {
          items.forEach((item, idx) => {
            const text = concept.items[idx] || '';
            item.textContent = text;
          });
        },
        [],
        startProgress + 0.1
      );

      tl.to(
        items,
        { opacity: 1, stagger: 0.05, duration: 0.3 },
        startProgress + 0.12
      );

      // Hold
      tl.to({}, {}, startProgress + 0.7);

      // Fade out title
      tl.to(
        titleRef.current,
        { opacity: 0, duration: 0.2 },
        endProgress - 0.1
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-20"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-lg md:text-xl text-slate-400 uppercase tracking-widest mb-8">
          Our Mission
        </h2>

        <div className="mb-16">
          <h3
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-12"
          >
            LEARN
          </h3>

          <div
            ref={itemsRef}
            className="space-y-4"
          >
            {concepts[0].items.map((item, idx) => (
              <p
                key={idx}
                data-item
                className="text-xl md:text-2xl text-slate-300 font-light"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm uppercase tracking-widest">
          Scroll to explore what we do
        </p>
      </div>
    </section>
  );
}
