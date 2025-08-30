'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const date = now.toLocaleDateString('ja-JP', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });
      const time = now.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setDateTime(`${date} ${time}`);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!dateTime) {
    return <div className="w-40" />; // Placeholder for initial render
  }

  return <div>{dateTime}</div>;
}
