'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  'Programming',
  'Data',
  'Systems',
  'AI',
  'Mathematics',
  'Web',
  'Networks',
  'Emerging Tech',
];

interface NodePosition {
  x: number;
  y: number;
  id: string;
  label: string;
}

export function DepartmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const svg = svgRef.current;
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 150;

    // Calculate positions for outer nodes
    const nodePositions: NodePosition[] = [
      { x: centerX, y: centerY, id: 'center', label: 'COMPUTER SCIENCE' },
    ];

    areas.forEach((area, index) => {
      const angle = (index / areas.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodePositions.push({ x, y, id: `node-${index}`, label: area });
    });

    // Create center node
    const centerNode = svg.querySelector('[data-node="center"]');
    if (centerNode) {
      gsap.set(centerNode, { opacity: 0, scale: 0.5 });
    }

    // Create outer nodes and lines
    const outerNodes = svg.querySelectorAll('[data-node]:not([data-node="center"])');
    const lines = svg.querySelectorAll('line');

    gsap.set([outerNodes, lines], { opacity: 0 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    // Animate center node first
    tl.to(centerNode, { opacity: 1, scale: 1, duration: 0.5 }, 0);

    // Stagger outer nodes and lines
    tl.to(
      outerNodes,
      { opacity: 1, stagger: 0.08, duration: 0.4 },
      0.3
    );

    tl.to(
      lines,
      { opacity: 0.6, strokeDashoffset: 0, stagger: 0.08, duration: 0.4 },
      0.3
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 py-16"
    >
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The Department
          </h2>
          <p className="text-lg text-slate-400">
            Computer Science encompasses many disciplines
          </p>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          className="w-full max-w-4xl h-auto border border-blue-500/20 rounded-lg bg-slate-800/50"
        >
          {/* Center Node */}
          <g data-node="center">
            <circle
              cx="400"
              cy="300"
              r="45"
              fill="#3b82f6"
              className="drop-shadow-lg"
            />
            <text
              x="400"
              y="305"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-bold fill-white pointer-events-none select-none"
              fontSize="12"
            >
              CS
            </text>
          </g>

          {/* Outer Nodes and Lines */}
          {areas.map((area, index) => {
            const angle = (index / areas.length) * Math.PI * 2;
            const radius = 150;
            const x = 400 + radius * Math.cos(angle);
            const y = 300 + radius * Math.sin(angle);

            return (
              <g key={`node-group-${index}`}>
                <line
                  x1="400"
                  y1="300"
                  x2={x}
                  y2={y}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  className="opacity-60"
                />
                <g data-node={`node-${index}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="35"
                    fill="#1e40af"
                    className="hover:fill-blue-400 transition-colors cursor-pointer drop-shadow-lg"
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-semibold fill-white pointer-events-none select-none"
                    fontSize="11"
                  >
                    {area.split(' ')[0]}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
