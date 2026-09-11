'use client';

import Image from 'next/image';

export interface EventCardProps {
  name: string;
  category: string;
  date: string;
  description: string;
  poster: string;
  registrationLink?: string;
  detailsLink?: string;
}

export function EventCard({
  name,
  category,
  date,
  description,
  poster,
  registrationLink,
  detailsLink,
}: EventCardProps) {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex-shrink-0 w-80 bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Poster Image */}
      <div className="relative w-full h-48 bg-slate-700">
        <Image
          src={poster}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs md:text-sm font-mono text-blue-400 uppercase tracking-wide">
            {category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {formattedDate}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-white mb-3">{name}</h3>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Links */}
        <div className="flex gap-3">
          {detailsLink && (
            <a
              href={detailsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors text-center"
            >
              Details
            </a>
          )}
          {registrationLink && (
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors text-center"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
