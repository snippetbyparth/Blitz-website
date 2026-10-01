'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  'BLITZ provides students with a platform to explore computer science beyond the classroom through workshops, seminars, competitions, technical events and other learning initiatives.',
  'The society brings together students with different interests across technology, encouraging them to learn new concepts, experiment with ideas and apply their knowledge through practical experiences. Its activities cover both foundational and emerging areas of technology, while also creating opportunities to develop logical, technical and creative thinking.',
  'Beyond technical learning, BLITZ encourages collaboration, leadership and active participation. Events and initiatives give students opportunities to work together, interact with speakers and peers, take on responsibilities, and learn through experiences outside the regular academic curriculum.',
  'With the guidance and support of the Department of Computer Science and its faculty, BLITZ continues to create an environment where students can explore their interests, develop their skills and contribute to the department\'s technical culture.',
];

function splitIntoLines(element: HTMLElement) {
  const text = element.dataset.originalText ?? element.textContent ?? '';
  element.dataset.originalText = text;
  const words = text.trim().split(/\s+/);
  const wordElements: HTMLSpanElement[] = [];

  element.textContent = '';
  words.forEach((word) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'about-line-word';
    wordElement.textContent = `${word} `;
    element.append(wordElement);
    wordElements.push(wordElement);
  });

  const lines: { words: string[]; startIndex: number }[] = [];
  let currentTop: number | undefined;
  let currentLine: string[] = [];
  let currentStartIndex = 0;

  wordElements.forEach((wordElement, index) => {
    const top = Math.round(wordElement.getBoundingClientRect().top);
    if (currentTop !== undefined && top !== currentTop) {
      lines.push({ words: currentLine, startIndex: currentStartIndex });
      currentLine = [];
      currentStartIndex = index;
    }
    currentTop = top;
    currentLine.push(wordElement.textContent?.trim() ?? '');
  });

  if (currentLine.length > 0) {
    lines.push({ words: currentLine, startIndex: currentStartIndex });
  }

  const emphasis = element.dataset.emphasis;
  const emphasisWords = emphasis?.split(/\s+/) ?? [];
  const normalizedWord = (word: string) => word.replace(/[.,]/g, '');
  const emphasisStartIndex = emphasisWords.length > 0
    ? wordElements.findIndex((_, index) =>
        emphasisWords.every(
          (emphasisWord, emphasisIndex) =>
            normalizedWord(wordElements[index + emphasisIndex]?.textContent?.trim() ?? '')
              === normalizedWord(emphasisWord),
        ),
      )
    : -1;
  element.replaceChildren(
    ...lines.map(({ words, startIndex }) => {
      const lineElement = document.createElement('span');
      const innerElement = document.createElement('span');
      lineElement.className = 'about-line';
      innerElement.className = 'about-line-inner';
      words.forEach((word, wordIndex) => {
        const globalIndex = startIndex + wordIndex;
        const isEmphasized = emphasisStartIndex >= 0
          && globalIndex >= emphasisStartIndex
          && globalIndex < emphasisStartIndex + emphasisWords.length;

        if (isEmphasized) {
          const strongElement = document.createElement('strong');
          strongElement.textContent = word;
          innerElement.append(strongElement, ' ');
        } else {
          innerElement.append(`${word} `);
        }
      });
      lineElement.append(innerElement);
      return lineElement;
    }),
  );
}

function AboutText({
  children,
  emphasis,
  className = '',
}: {
  children: string;
  emphasis?: string;
  className?: string;
}) {
  return (
    <p className={className} data-about-lines data-emphasis={emphasis}>
      {children}
    </p>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const context = gsap.context(() => {
      const textElements = gsap.utils.toArray<HTMLElement>('[data-about-lines]');
      textElements.forEach(splitIntoLines);

      const revealItems = gsap.utils.toArray<HTMLElement>('.about-line-inner');
      const fadeItems = gsap.utils.toArray<HTMLElement>('.about-line');
      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          end: 'bottom 70%',
          scrub: 0.8,
        },
      });

      gsap.set(revealItems, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
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
    <section ref={sectionRef} id="about" className="about-section home-section">
      <div className="home-layout about-layout">
        <aside className="home-meta about-meta">
          <span className="home-meta-title">BLITZ / ABOUT</span>
        </aside>

        <main className="home-content about-content">
          <header className="home-intro about-intro">
            <h1 data-about-lines>
              BLITZ is the departmental society of the Department of Computer Science at Keshav Mahavidyalaya, University of Delhi.
            </h1>
          </header>

          <div className="about-body">
            {paragraphs.map((paragraph, index) => (
              <AboutText
                key={index}
                emphasis={
                  index === 2
                    ? 'collaboration, leadership and active participation'
                    : index === 3
                      ? 'Department of Computer Science and its faculty'
                      : undefined
                }
              >
                {paragraph}
              </AboutText>
            ))}
          </div>

          <p className="about-closing" data-about-lines>
            Silicon Minds, Circuited Hearts.
          </p>
        </main>
      </div>
    </section>
  );
}
