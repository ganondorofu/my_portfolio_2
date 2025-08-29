'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!time) {
    return <div className="w-12" />; // Placeholder for initial render
  }

  return <div>{time}</div>;
}
