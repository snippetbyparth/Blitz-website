'use client';

import { useEffect, useRef, useState } from 'react';
import eventsData from '@/data/events.json';

interface HighlightEvent {
  id: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  additionalInfo?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function HighlightsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const getMaxScroll = () => scroller.scrollWidth - scroller.clientWidth;

    const animateScroll = () => {
      const distance = targetScrollRef.current - scroller.scrollLeft;
      if (Math.abs(distance) < 0.5) {
        scroller.scrollLeft = targetScrollRef.current;
        animationFrameRef.current = null;
        return;
      }

      scroller.scrollLeft += distance * 0.14;
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    };

    const handleWheel = (event: WheelEvent) => {
      const maxScroll = getMaxScroll();
      if (maxScroll <= 0 || event.deltaY === 0) return;

      const multiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      const nextScroll = clamp(
        targetScrollRef.current + event.deltaY * multiplier,
        0,
        maxScroll,
      );

      if (nextScroll === targetScrollRef.current) return;

      event.preventDefault();
      targetScrollRef.current = nextScroll;
      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      }
    };

    const syncTargetToScroll = () => {
      if (animationFrameRef.current === null) {
        targetScrollRef.current = scroller.scrollLeft;
      }
    };

    targetScrollRef.current = scroller.scrollLeft;
    scroller.addEventListener('wheel', handleWheel, { passive: false });
    scroller.addEventListener('scroll', syncTargetToScroll, { passive: true });

    return () => {
      scroller.removeEventListener('wheel', handleWheel);
      scroller.removeEventListener('scroll', syncTargetToScroll);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const scroller = scrollerRef.current;
      if (!scroller || scroller.contains(event.target as Node)) return;
      setExpandedId(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const events = eventsData as HighlightEvent[];

  return (
    <section id="highlights" className="highlights-section">
      <div className="highlights-layout">
        <header className="highlights-heading">
          <div>
            <p className="highlights-label">BLITZ / HIGHLIGHTS</p>
            <h2>Highlights</h2>
          </div>
          <p className="highlights-cue">Scroll to explore</p>
        </header>

        <div ref={scrollerRef} className="highlights-scroller">
          <div className="highlights-track">
            {events.map((event, index) => {
              const number = String(index + 1).padStart(2, '0');
              const isExpanded = expandedId === event.id;

              return (
                <article
                  key={event.id}
                  className={`highlights-card${isExpanded ? ' is-expanded' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`${event.title} details`}
                  onMouseEnter={() => setExpandedId(event.id)}
                  onMouseLeave={() =>
                    setExpandedId((current) => (current === event.id ? null : current))
                  }
                  onFocus={() => setExpandedId(event.id)}
                  onBlur={() =>
                    setExpandedId((current) => (current === event.id ? null : current))
                  }
                  onClick={() =>
                    setExpandedId((current) => (current === event.id ? null : event.id))
                  }
                >
                  <div className="highlights-card-surface">
                    <div className="highlights-card-header">
                      <p className="highlights-card-number">{number}</p>
                    </div>

                    <div className="highlights-card-main">
                      <h3>{event.title}</h3>
                      <div className="highlights-card-meta-wrap">
                        {event.date && <p className="highlights-card-meta">{event.date}</p>}
                        {event.location && (
                          <p className="highlights-card-meta">{event.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="highlights-card-details">
                      {event.description && (
                        <p className="highlights-card-description">{event.description}</p>
                      )}

                      {(event.date || event.location || event.additionalInfo) && (
                        <dl className="highlights-card-list">
                          {event.date && (
                            <div>
                              <dt>Date</dt>
                              <dd>{event.date}</dd>
                            </div>
                          )}
                          {event.location && (
                            <div>
                              <dt>Location</dt>
                              <dd>{event.location}</dd>
                            </div>
                          )}
                          {event.additionalInfo && (
                            <div>
                              <dt>Type</dt>
                              <dd>{event.additionalInfo}</dd>
                            </div>
                          )}
                        </dl>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
