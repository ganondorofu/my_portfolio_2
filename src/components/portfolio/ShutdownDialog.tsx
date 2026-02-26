'use client';

import {
  AlertDialog,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { Moon, RotateCcw, Power, X } from 'lucide-react';

interface ShutdownDialogProps {
  onClose: () => void;
  onShutdown: () => void;
}

export default function ShutdownDialog({ onClose, onShutdown }: ShutdownDialogProps) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent
        className="max-w-xs border-none p-0 shadow-2xl sm:rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, #3d3846 0%, #2d2833 100%)',
        }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <h2 className="text-sm font-semibold text-white">電源オフ</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 60秒メッセージ (Ubuntu 風の説明) */}
        <p className="px-5 pt-4 text-center text-sm text-white/60">
          60秒後に自動的にシャットダウンします
        </p>

        {/* アクションボタン (Ubuntu GNOME スタイル) */}
        <div className="flex justify-center gap-6 px-5 py-6">
          {/* サスペンド */}
          <button
            onClick={onClose}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
              <Moon className="size-6 text-white" />
            </div>
            <span className="text-xs text-white/80">サスペンド</span>
          </button>

          {/* 再起動 */}
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
              <RotateCcw className="size-6 text-white" />
            </div>
            <span className="text-xs text-white/80">再起動</span>
          </button>

          {/* 電源オフ */}
          <button
            onClick={() => {
              onShutdown();
              onClose();
            }}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-[#e01b24] transition-colors group-hover:bg-[#f44336]">
              <Power className="size-6 text-white" />
            </div>
            <span className="text-xs text-white/80">電源オフ</span>
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
