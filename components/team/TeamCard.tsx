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
    <div className="team-card">
      <div className="team-card-image">
        <Image
          src={image}
          alt={name}
          fill
          sizes="104px"
          className="object-cover"
        />
      </div>
      <h3 className="team-card-name">
        {name}
      </h3>
      <p className="team-card-position">
        {position}
      </p>
      {bio && <p className="team-card-bio">{bio}</p>}

      {/* Social Links */}
      {(linkedin || github || instagram) && (
        <div className="team-card-links">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-card-link"
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
              className="team-card-link"
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
              className="team-card-link"
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
