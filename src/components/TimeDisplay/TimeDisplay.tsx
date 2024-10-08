import React, { useEffect, useState } from 'react';
import styles from './TimeDisplay.module.scss';

interface TimeDisplayProps {
  noEvents?: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ noEvents = false }) => {
  const [time, setTime] = useState<string>('');
  const [dayMonth, setDayMonth] = useState<string>('');
  const [weekday, setWeekday] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const day = now.getDate();
      const month = now.toLocaleDateString('ru-RU', { month: 'long' });
      const weekdayString = now.toLocaleDateString('ru-RU', { weekday: 'long' });
      const dateString = `${day} ${month} · ${weekdayString}`;

      const dayMonthString = `${day} ${month}`;

      setTime(timeString);
      setDayMonth(dayMonthString);
      setWeekday(weekdayString);
      setDate(dateString);
    };

    updateTimeAndDate();

    const interval = setInterval(() => {
      updateTimeAndDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <>
        {noEvents ? (
            <div className={styles.noEventsContainer}>
              <div className={styles.time}>{time}</div>
              <div className={styles.date}>
                <div className={styles.dayMonth}>{dayMonth}</div>
                <div className={styles.weekday}>{weekday}</div>
              </div>
            </div>
        ) : (
            <div className={styles.container}>
              <div className={styles.time}>{time}</div>
              <div className={styles.date}>{date}</div>
            </div>
        )}
      </>
  );
};

export default TimeDisplay;
