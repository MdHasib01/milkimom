import { useState, useEffect } from 'react';

// Helper to get current Date object in Dhaka Time
const getDhakaTime = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false
  });
  
  const parts = formatter.formatToParts(new Date());
  const val = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
  
  return new Date(val('year'), val('month') - 1, val('day'), val('hour'), val('minute'), val('second'));
};

let globalTimeLeft = { h: 0, m: 0, s: 0 };
const listeners: Array<(val: { h: number, m: number, s: number }) => void> = [];
let timerInterval: NodeJS.Timeout | null = null;

const startGlobalTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    const currentDhaka = getDhakaTime();
    const endOfDay = new Date(currentDhaka.getFullYear(), currentDhaka.getMonth(), currentDhaka.getDate(), 23, 59, 59, 999);
    
    const remainingMs = endOfDay.getTime() - currentDhaka.getTime();

    if (remainingMs <= 0) {
      globalTimeLeft = { h: 0, m: 0, s: 0 };
    } else {
      globalTimeLeft = {
        h: Math.floor((remainingMs / (1000 * 60 * 60)) % 24),
        m: Math.floor((remainingMs / 1000 / 60) % 60),
        s: Math.floor((remainingMs / 1000) % 60)
      };
    }
    
    listeners.forEach(listener => listener(globalTimeLeft));
  }, 1000);
};

export const useCountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number } | null>(globalTimeLeft.h !== 0 || globalTimeLeft.m !== 0 || globalTimeLeft.s !== 0 ? globalTimeLeft : null);

  useEffect(() => {
    if (!timerInterval) {
      const currentDhaka = getDhakaTime();
      const endOfDay = new Date(currentDhaka.getFullYear(), currentDhaka.getMonth(), currentDhaka.getDate(), 23, 59, 59, 999);
      const remainingMs = endOfDay.getTime() - currentDhaka.getTime();
      
      if (remainingMs > 0) {
        globalTimeLeft = {
          h: Math.floor((remainingMs / (1000 * 60 * 60)) % 24),
          m: Math.floor((remainingMs / 1000 / 60) % 60),
          s: Math.floor((remainingMs / 1000) % 60)
        };
        setTimeLeft(globalTimeLeft);
      }
      startGlobalTimer();
    }
    
    const listener = (newTime: { h: number, m: number, s: number }) => setTimeLeft(newTime);
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []);

  return timeLeft;
};
