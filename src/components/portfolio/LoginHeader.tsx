'use client';

import { useState, useEffect } from 'react';
import { Wifi, Volume2, Power } from 'lucide-react';

export default function LoginHeader() {
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

  return (
    <header className="flex h-8 w-full shrink-0 items-center justify-between px-4 text-sm font-medium text-white/90">
      <div className="w-1/3"></div>
      <div className="w-1/3 text-center">{dateTime}</div>
      <div className="flex w-1/3 justify-end items-center gap-3">
        {/* These are decorative icons */}
        <Wifi className="h-4 w-4" />
        <Volume2 className="h-4 w-4" />
        <Power className="h-4 w-4" />
      </div>
    </header>
  );
}
