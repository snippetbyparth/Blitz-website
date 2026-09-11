'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TeamCard } from './TeamCard';
import type { TeamCardProps } from './TeamCard';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember extends TeamCardProps {
  id: string;
}

interface OrgTierProps {
  tier: 'core' | 'senior' | 'junior' | 'volunteer';
  members: TeamMember[];
  tierLabel: string;
}

export function OrgTier({ tier, members, tierLabel }: OrgTierProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('[data-team-card]');
    const label = labelRef.current;

    gsap.set([label, cards], { opacity: 0, y: 20 });

    return () => {
      // Animation will be coordinated by parent component
    };
  }, []);

  const getGridClass = () => {
    switch (tier) {
      case 'core':
        return 'grid-cols-1 md:grid-cols-3 gap-8';
      case 'senior':
        return 'grid-cols-2 md:grid-cols-5 gap-6';
      case 'junior':
        return 'grid-cols-2 md:grid-cols-3 gap-6';
      case 'volunteer':
        return 'grid-cols-2 md:grid-cols-5 gap-6';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div className="w-full mb-16">
      <div
        ref={labelRef}
        className="text-center mb-8"
      >
        <h3 className="text-2xl md:text-3xl font-mono text-blue-300 uppercase tracking-widest">
          {tierLabel}
        </h3>
      </div>

      <div className={`grid ${getGridClass()} place-items-center`}>
        {members.map((member) => (
          <div key={member.id} data-team-card>
            <TeamCard
              name={member.name}
              position={member.position}
              image={member.image}
              bio={member.bio}
              linkedin={member.linkedin}
              github={member.github}
              instagram={member.instagram}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
