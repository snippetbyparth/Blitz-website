'use client';

import { useEffect, useRef } from 'react';
import galleryData from '@/data/gallery.json';

interface GalleryItem {
  image: string;
  title: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function GallerySection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);

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

      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
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

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-layout">
        <header className="gallery-heading">
          <div>
            <p className="gallery-label">BLITZ / GALLERY</p>
            <h2>Gallery</h2>
          </div>
          <p className="gallery-cue">Scroll to explore</p>
        </header>

        <div ref={scrollerRef} className="gallery-scroller">
          <div className="gallery-track">
            {(galleryData as GalleryItem[]).map((item, index) => (
              <figure className="gallery-item" key={item.title}>
                <div
                  className="gallery-image"
                  role="img"
                  aria-label={item.title}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
