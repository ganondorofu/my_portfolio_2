import type { CSSProperties } from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface UbuntuAppIconProps {
  icon: keyof typeof LucideIcons;
  iconBg?: [string, string];
  size?: number;
  className?: string;
}

/**
 * Ubuntu Yaru スタイルのアプリアイコン。
 * 角丸正方形のグラデーション背景に白いアイコンを重ねて描画する。
 */
export function UbuntuAppIcon({
  icon,
  iconBg = ['#4A4A4A', '#2D2D2D'],
  size = 56,
  className,
}: UbuntuAppIconProps) {
  const LucideIcon = LucideIcons[icon] as React.ComponentType<{
    className?: string;
    style?: CSSProperties;
  }>;
  if (!LucideIcon) return null;

  // Yaru アイコンは正方形の約 22% を border-radius にする
  const borderRadius = Math.round(size * 0.22);
  const iconSize = Math.round(size * 0.52);

  return (
    <div
      className={cn('flex flex-shrink-0 items-center justify-center', className)}
      style={{
        width: size,
        height: size,
        borderRadius,
        background: `linear-gradient(145deg, ${iconBg[0]}, ${iconBg[1]})`,
        boxShadow: [
          '0 4px 12px rgba(0,0,0,0.45)',
          'inset 0 1px 0 rgba(255,255,255,0.15)',
          'inset 0 -1px 0 rgba(0,0,0,0.2)',
        ].join(', '),
      }}
    >
      <LucideIcon
        className="text-white drop-shadow-sm"
        style={{ width: iconSize, height: iconSize }}
      />
    </div>
  );
}
