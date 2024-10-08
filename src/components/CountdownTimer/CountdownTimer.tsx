import React, { useEffect, useState } from 'react';
import styles from './CountdownTimer.module.scss';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  totalSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const phaseDuration = 7 * 24 * 60 * 60; // 7 дней в секундах

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const totalMilliseconds = targetDate.getTime() - now.getTime();

      if (totalMilliseconds <= 0) {
        setTimeLeft(null);
        return;
      }

      const totalSecondsRemaining = Math.floor(totalMilliseconds / 1000);

      // Оставшееся время в текущем 7-дневном интервале
      let timeLeftInPhase = totalSecondsRemaining % phaseDuration;

      // Если остаток равен 0, то находимся на границе интервалов
      if (timeLeftInPhase === 0) {
        timeLeftInPhase = phaseDuration;
      }

      setTimeLeft({
        totalSeconds: timeLeftInPhase,
        days: Math.floor(timeLeftInPhase / (24 * 60 * 60)),
        hours: Math.floor((timeLeftInPhase / (60 * 60)) % 24),
        minutes: Math.floor((timeLeftInPhase / 60) % 60),
        seconds: timeLeftInPhase % 60,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return null;
  }

  // Дополнительные дни и отображаемые дни
  const extraDays = timeLeft.days > 7 ? timeLeft.days - 7 : 0;
  const displayDays = extraDays > 0 ? 7 : timeLeft.days;

  // Ограничение progress до 100%
  const daysProgress = Math.min((1 - displayDays / 7) * 100, 100);
  const hoursProgress = (1 - timeLeft.hours / 24) * 100;
  const minutesProgress = (1 - timeLeft.minutes / 60) * 100;
  const secondsProgress = (1 - timeLeft.seconds / 60) * 100;

  return (
      <div className={styles.countdown}>
        <div
            className={styles.circle}
            style={{ '--progress': `${daysProgress}%`, '--color': '#0062B5' } as React.CSSProperties}
        >
          <div className={styles.innerCircle}>
            <span className={styles.timeLeft}>{displayDays}</span>
            <span className={styles.timeTitle}> дней</span>
          </div>
        </div>

        {extraDays > 0 && (
            <div className={styles.extraDays}>
              +{extraDays} дней
            </div>
        )}

        <div
            className={styles.circle}
            style={{ '--progress': `${hoursProgress}%`, '--color': '#D62F0D' } as React.CSSProperties}
        >
          <div className={styles.innerCircle}>
            <span className={styles.timeLeft}>{timeLeft.hours}</span>
            <span className={styles.timeTitle}> часов</span>
          </div>
        </div>

        <div
            className={styles.circle}
            style={{ '--progress': `${minutesProgress}%`, '--color': '#FDAE47' } as React.CSSProperties}
        >
          <div className={styles.innerCircle}>
            <span className={styles.timeLeft}>{timeLeft.minutes}</span>
            <span className={styles.timeTitle}>минут</span>
          </div>
        </div>

        <div
            className={styles.circle}
            style={{ '--progress': `${secondsProgress}%`, '--color': '#51ACD8' } as React.CSSProperties}
        >
          <div className={styles.innerCircle}>
            <span className={styles.timeLeft}>{timeLeft.seconds}</span>
            <span className={styles.timeTitle}> секунд</span>
          </div>
        </div>
      </div>
  );
};

export default CountdownTimer;
