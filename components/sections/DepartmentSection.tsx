'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function splitIntoLines(element: HTMLElement) {
  const text = element.dataset.originalText ?? element.textContent ?? '';
  element.dataset.originalText = text;
  const words = text.trim().split(/\s+/);
  const wordElements: HTMLSpanElement[] = [];

  element.textContent = '';
  words.forEach((word) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'home-line-word';
    wordElement.textContent = `${word} `;
    element.append(wordElement);
    wordElements.push(wordElement);
  });

  const lines: string[] = [];
  let currentTop: number | undefined;
  let currentLine: string[] = [];

  wordElements.forEach((wordElement) => {
    const top = Math.round(wordElement.getBoundingClientRect().top);
    if (currentTop !== undefined && top !== currentTop) {
      lines.push(currentLine.join(' '));
      currentLine = [];
    }
    currentTop = top;
    currentLine.push(wordElement.textContent?.trim() ?? '');
  });

  if (currentLine.length > 0) lines.push(currentLine.join(' '));

  element.replaceChildren(
    ...lines.map((line) => {
      const lineElement = document.createElement('span');
      const innerElement = document.createElement('span');
      lineElement.className = 'home-line';
      innerElement.className = 'home-line-inner';
      innerElement.textContent = line;
      lineElement.append(innerElement);
      return lineElement;
    }),
  );
}

const focusAreas = [
  {
    number: '01',
    title: 'WORKSHOPS & SEMINARS',
    description:
      'Interactive sessions that help students explore concepts, tools and emerging areas of technology.',
  },
  {
    number: '02',
    title: 'TECHNICAL EVENTS',
    description:
      'Competitions and challenges that encourage problem-solving, logical thinking and creativity.',
  },
  {
    number: '03',
    title: 'PROJECTS & INITIATIVES',
    description:
      'Opportunities to apply technical knowledge, experiment with ideas and learn through practical experience.',
  },
  {
    number: '04',
    title: 'COMMUNITY & COLLABORATION',
    description:
      'A space for students to learn, collaborate and grow together through shared interests in computer science.',
  },
];

export function DepartmentSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      const textElements = gsap.utils.toArray<HTMLElement>('[data-home-lines]');
      textElements.forEach(splitIntoLines);

      const revealItems = gsap.utils.toArray<HTMLElement>('.home-line-inner');
      const fadeItems = gsap.utils.toArray<HTMLElement>('.home-line');
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          end: 'bottom 70%',
          scrub: 0.8,
        },
      });

      gsap.set(revealItems, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
      });

      revealTimeline.to(revealItems, {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.72,
        ease: 'power2.out',
        stagger: 0.22,
      });

      fadeItems.forEach((line) => {
        gsap.to(line, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 74px',
            end: 'top 12px',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="department" className="home-section">
      <div className="home-layout">
        <aside className="home-meta">
          <span className="home-meta-title">BLITZ / HOME</span>
        </aside>

        <div className="home-content">
          <header className="home-intro">
            <h1 data-home-lines>Silicon Minds, Circuited Hearts.</h1>
            <p data-home-lines>
              BLITZ is the departmental society of the Department of Computer
              Science at Keshav Mahavidyalaya, University of Delhi. Through
              workshops, seminars, competitions, technical events and other
              learning initiatives, BLITZ provides students with opportunities
              to explore technology, develop practical skills, and engage with
              computer science beyond the classroom.
            </p>
          </header>

          <div className="home-focus" aria-labelledby="what-we-do-title">
            <h2 id="what-we-do-title" data-home-lines>
              WHAT WE DO
            </h2>
            <div className="home-focus-list">
              {focusAreas.map((area) => (
                <article className="home-focus-item" key={area.number}>
                  <div className="home-focus-heading">
                    <span>{area.number}</span>
                    <h3 data-home-lines>{area.title}</h3>
                  </div>
                  <p data-home-lines>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
