'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

function splitIntoLines(element: HTMLElement) {
  const text = element.textContent ?? '';
  const words = text.trim().split(/\s+/);
  const wordElements: HTMLSpanElement[] = [];

  element.textContent = '';
  words.forEach((word) => {
    const wordElement = document.createElement('span');
    wordElement.className = 'intro-copy-word';
    wordElement.textContent = `${word} `;
    element.append(wordElement);
    wordElements.push(wordElement);
  });

  const lines: string[] = [];
  let currentTop: number | undefined;
  let currentLine: string[] = [];

  wordElements.forEach((wordElement) => {
    const top = wordElement.offsetTop;
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
      lineElement.className = 'intro-copy-line';
      lineElement.dataset.introLine = 'true';
      lineElement.textContent = line;
      return lineElement;
    }),
  );
}

export function IntroductionCopy() {
  const copyRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!copyRef.current) return;

    const animatedText = Array.from(
      copyRef.current.querySelectorAll<HTMLElement>('[data-intro-text]'),
    );
    animatedText.forEach(splitIntoLines);

    const lines = copyRef.current.querySelectorAll<HTMLElement>('[data-intro-line]');
    const context = gsap.context(() => {
      gsap.fromTo(
        lines,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.5 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.14,
          delay: 0.2,
        },
      );
    }, copyRef);

    return () => context.revert();
  }, []);

  return (
    <aside ref={copyRef} className="introduction-copy" aria-label="About BLITZ">
      <span className="introduction-copy-label" data-intro-text>
        V.01 / BLITZ SOCIETY
      </span>
      <p className="introduction-copy-title" data-intro-text>
        BLITZ — THE DEPARTMENTAL SOCIETY OF COMPUTER SCIENCE
      </p>
      <p className="introduction-copy-description" data-intro-text>
        A STUDENT-DRIVEN COMMUNITY BUILT TO CREATE, COLLABORATE, AND PUSH THE 
        BOUNDARIES OF COMPUTING.
      </p>
    </aside>
  );
}
