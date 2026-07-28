'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  title?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-11-25T10:00:00',
  title = 'Upcoming Royal Wedding Countdown',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-maroon-800 text-silk-50 rounded-3xl p-8 border-2 border-gold-400/50 shadow-2xl relative overflow-hidden text-center max-w-3xl mx-auto">
      <div className="absolute top-0 right-0 p-4 text-gold-400 opacity-20 text-7xl font-serif select-none pointer-events-none">
        🪷
      </div>
      <h3 className="font-playfair text-xl md:text-2xl text-gold-300 font-semibold mb-6 tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Days', value: isMounted ? timeLeft.days : 0 },
          { label: 'Hours', value: isMounted ? timeLeft.hours : 0 },
          { label: 'Minutes', value: isMounted ? timeLeft.minutes : 0 },
          { label: 'Seconds', value: isMounted ? timeLeft.seconds : 0 },
        ].map((unit, index) => (
          <div key={index} className="bg-maroon-950/80 border border-gold-400/30 rounded-2xl p-4 md:p-5 shadow-inner">
            <div className="text-2xl md:text-4xl font-bold font-outfit text-gold-400">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm font-medium text-gold-100 uppercase tracking-widest mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
