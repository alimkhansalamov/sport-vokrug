import React from 'react';
import styles from './EventCard.module.scss';
import { Event } from '../../types/Event';
import { formatEventDate } from '../../utils/dateUtils';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

interface EventCardProps {
  event: Event;
  isCurrent?: boolean;
  showTimer?: boolean;
  hasBackground?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isCurrent = false, showTimer = false, hasBackground = true }) => {
  const formattedDate = formatEventDate(event.dt_start, event.dt_end);

  const now = new Date();
  const eventStartDate = new Date(event.dt_start);
  const eventEndDate = new Date(event.dt_end);

  // Check if the event is happening now
  const isOngoing = now >= eventStartDate && now <= eventEndDate;

  return (
      <div className={`${styles.eventCard} ${!hasBackground ? styles.noBackground : ''}`}>
        <div className={styles.dateAndTitle}>
          <div className={`${styles.date} ${isCurrent ? '' : styles.smallerDate}`}>{formattedDate}</div>
          <div className={`${styles.title} ${isCurrent ? '' : styles.smallerTitle}`}>{event.title}</div>
        </div>

        {showTimer && (
            <>
              {isOngoing ? (
                  <div className={styles.status}>
                    <div className={styles.statusNow}>Идет сейчас</div>
                  </div>
              ) : (
                  <CountdownTimer targetDate={eventStartDate} />
              )}
            </>
        )}
      </div>
  );
};

export default EventCard;
