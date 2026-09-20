'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventCard } from './EventCard';
import eventsData from '@/data/events.json';

gsap.registerPlugin(ScrollTrigger);

export function EventsRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll('[data-event-card]');

    if (cards.length === 0) return;

    // Calculate total scroll distance needed
    const cardWidth = 320 + 16; // card width + gap
    const totalWidth = cards.length * cardWidth;
    const scrollDistance = totalWidth - window.innerWidth * 0.9;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: `+=${Math.max(scrollDistance, 400)}`,
        scrub: 1,
        markers: false,
        pin: true,
      },
    });

    tl.to(container, {
      x: -Math.max(scrollDistance, 0),
      duration: 1,
      ease: 'none',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (eventsData.length === 0) {
    return (
      <section
        ref={sectionRef}
        id="events"
        className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <p className="text-slate-400">No events scheduled</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-20"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Events
          </h2>
          <p className="text-lg text-slate-400">
            Scroll horizontally to explore upcoming events
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-hidden"
        >
          {eventsData.map((event, index) => (
            <div key={event.id || index} data-event-card>
              <EventCard
                name={event.name}
                category={event.category}
                date={event.date}
                description={event.description}
                poster={event.poster}
                registrationLink={event.registrationLink}
                detailsLink={event.detailsLink}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
