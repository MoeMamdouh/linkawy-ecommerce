// ──────────────────────────────────────────────
// FlashSaleSection — Countdown Timer Hook
// ──────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';

interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

/**
 * Live countdown timer hook.
 * @param endTime — target timestamp in ms
 */
export const useFlashSaleTimer = (endTime: number): CountdownTime => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    isExpired: false,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00', isExpired: true });
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
        isExpired: false,
      });
    };

    calculate();
    intervalRef.current = setInterval(calculate, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [endTime]);

  return timeLeft;
};
