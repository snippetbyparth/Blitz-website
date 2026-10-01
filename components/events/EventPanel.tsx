import type { EventItem } from './EventsRail';
import type { CSSProperties } from 'react';

interface EventPanelProps {
  event: EventItem;
  index: number;
}

export function EventPanel({ event, index }: EventPanelProps) {
  const number = String(index + 1).padStart(3, '0');

  return (
    <article
      className="events-panel"
      style={{
        '--event-index': index,
        '--event-stack-offset': `${index * 52}px`,
      } as CSSProperties}
    >
      <div className="events-panel-inner">
        <p className="events-panel-number">N°{number}</p>

        <div className="events-panel-content">
          <h3>{event.title}</h3>
          <p className="events-panel-description">{event.description}</p>

          <dl className="events-panel-details">
            <div>
              <dt>Date</dt>
              <dd>{event.date}</dd>
            </div>
            {event.location && (
              <div>
                <dt>Location</dt>
                <dd>{event.location}</dd>
              </div>
            )}
          </dl>

          {event.additionalInfo && (
            <p className="events-panel-info">{event.additionalInfo}</p>
          )}
        </div>
      </div>
    </article>
  );
}
