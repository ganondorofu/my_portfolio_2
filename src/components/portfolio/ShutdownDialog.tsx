'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ShutdownDialogProps {
  onClose: () => void;
  onShutdown: () => void;
}

export default function ShutdownDialog({ onClose, onShutdown }: ShutdownDialogProps) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent className="bg-zinc-800 text-white border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-lg">
            シャットダウンしますか？
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-zinc-400 pt-2">
            すべてのアプリケーションが終了します。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex w-full items-center justify-center gap-4">
          <AlertDialogCancel asChild>
            <Button
              variant="secondary"
              className="h-12 flex-1 rounded-lg bg-zinc-700 text-base hover:bg-zinc-600"
              onClick={onClose}
            >
              キャンセル
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="h-12 flex-1 rounded-lg bg-red-600 text-base hover:bg-red-700"
              onClick={() => {
                onShutdown();
                onClose();
              }}
            >
              シャットダウン
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
