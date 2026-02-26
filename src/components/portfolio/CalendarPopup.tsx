'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarPopupProps {
  onClose: () => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  // 0=Sun, shift to Mon-start: (0=Mon,...,6=Sun)
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'];

export default function CalendarPopup({ onClose }: CalendarPopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [time, setTime] = useState('');

  // ライブ時計
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // 外部クリックで閉じる
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    setTimeout(() => window.addEventListener('mousedown', handle), 0);
    return () => window.removeEventListener('mousedown', handle);
  }, [onClose]);

  const prevMonth = () =>
    setView((v) => {
      const m = v.month === 0 ? 11 : v.month - 1;
      const y = v.month === 0 ? v.year - 1 : v.year;
      return { year: y, month: m };
    });
  const nextMonth = () =>
    setView((v) => {
      const m = v.month === 11 ? 0 : v.month + 1;
      const y = v.month === 11 ? v.year + 1 : v.year;
      return { year: y, month: m };
    });

  const days = getDaysInMonth(view.year, view.month);
  const offset = getFirstDayOfWeek(view.year, view.month);
  const cells = Array.from({ length: offset + days }, (_, i) =>
    i < offset ? null : i - offset + 1
  );

  const isToday = (day: number) =>
    day === now.getDate() && view.month === now.getMonth() && view.year === now.getFullYear();

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-[100] mt-1 w-72 rounded-2xl border border-white/10 p-4 shadow-2xl"
      style={{ background: 'linear-gradient(180deg, #3d3846 0%, #2d2833 100%)' }}
    >
      {/* デジタル時計 */}
      <div className="mb-3 text-center font-code text-3xl font-light tracking-widest text-white">
        {time}
      </div>

      {/* 月ナビゲーション */}
      <div className="mb-2 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-white">
          {view.year}年{view.month + 1}月
        </span>
        <button
          onClick={nextMonth}
          className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {WEEKDAYS.map((d, i) => (
          <span
            key={d}
            className={cn('text-xs font-medium', i >= 5 ? 'text-[#E95420]' : 'text-white/50')}
          >
            {d}
          </span>
        ))}
      </div>

      {/* 日グリッド */}
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const col = idx % 7; // 0=Mon,...,6=Sun
          const isWeekend = col >= 5;
          return (
            <div
              key={day}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-xs mx-auto',
                isToday(day)
                  ? 'bg-[#E95420] font-bold text-white'
                  : isWeekend
                  ? 'text-[#E95420]/80'
                  : 'text-white/80'
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
