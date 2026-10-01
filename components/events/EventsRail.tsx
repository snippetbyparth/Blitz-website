'use client';

import eventsData from '@/data/events.json';
import { EventPanel } from './EventPanel';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  additionalInfo?: string;
  image?: string;
}

export function EventsRail() {
  const events = eventsData as EventItem[];

  return (
    <section id="events" className="events-section">
      <div className="events-heading">
        <p>BLITZ / EVENTS</p>
        <h2>Events</h2>
      </div>

      {events.length > 0 ? (
        <div className="events-stack">
          {events.map((event, index) => (
            <EventPanel key={event.id} event={event} index={index} />
          ))}
        </div>
      ) : (
        <p className="events-empty">No events scheduled</p>
      )}
    </section>
  );
}
