'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrgTier } from './OrgTier';
import teamData from '@/data/team.json';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  tier: 'core' | 'senior' | 'junior' | 'volunteer';
  image: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

gsap.registerPlugin(ScrollTrigger);

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Get all tier containers in order
    const tiers = contentRef.current.querySelectorAll('[data-tier]');

    gsap.set(tiers, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });

    // Animate each tier in sequence
    tiers.forEach((tier, index) => {
      tl.to(tier, { opacity: 1, duration: 0.6 }, index * 0.3);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const grouped = (teamData as TeamMember[]).reduce(
    (acc, member) => {
      const tier = member.tier;
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(member);
      return acc;
    },
    {} as Record<string, TeamMember[]>
  );

  const tierOrder: Array<'core' | 'senior' | 'junior' | 'volunteer'> = [
    'core',
    'senior',
    'junior',
    'volunteer',
  ];
  const tierLabels = {
    core: 'Leadership',
    senior: 'Senior Executives',
    junior: 'Junior Members',
    volunteer: 'Volunteers',
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our Team
          </h2>
          <p className="text-lg text-slate-400">
            Meet the brilliant minds behind BLITZ
          </p>
        </div>

        <div ref={contentRef} className="space-y-20">
          {tierOrder.map((tier) => (
            grouped[tier] && (
              <div key={tier} data-tier>
                <OrgTier
                  tier={tier}
                  members={grouped[tier]}
                  tierLabel={tierLabels[tier]}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
