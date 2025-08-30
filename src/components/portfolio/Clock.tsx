'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleDateString('ja-JP', {
          month: 'long',
          day: 'numeric',
        }) +
          ' ' +
          now.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
          })
      );
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!dateTime) {
    return <div className="w-48" />; // Placeholder for initial render
  }

  return <div>{dateTime}</div>;
}
