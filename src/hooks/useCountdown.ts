import { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/event';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasPassed: boolean;
}

export function useCountdown(targetIso: string = EVENT_CONFIG.targetDateTimeIso): CountdownTime {
  const calculateTimeLeft = (): CountdownTime => {
    const target = new Date(targetIso).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasPassed: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      hasPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIso]);

  return timeLeft;
}
