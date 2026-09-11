'use client';

import Image from 'next/image';

export interface TeamCardProps {
  name: string;
  position: string;
  image: string;
  bio?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export function TeamCard({
  name,
  position,
  image,
  bio,
  linkedin,
  github,
  instagram,
}: TeamCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-lg overflow-hidden bg-slate-700">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-lg md:text-xl font-display text-white mb-1">
        {name}
      </h3>
      <p className="text-sm md:text-base font-mono text-blue-400 uppercase tracking-wide mb-3">
        {position}
      </p>
      {bio && <p className="text-xs md:text-sm text-slate-300 max-w-xs mb-4">{bio}</p>}

      {/* Social Links */}
      {(linkedin || github || instagram) && (
        <div className="flex gap-3 justify-center text-xs md:text-sm">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
          )}
        </div>
      )}
    </div>
  );
}
