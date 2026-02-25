import type { App } from './types';

export type AppID =
  | 'profile'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'contact'
  | 'history'
  | 'github'
  | 'show-apps';

export const apps: Record<AppID, App> = {
  profile: {
    id: 'profile',
    title: 'プロフィール (Profile)',
    // Ubuntu ターミナルのダーク・オーバージン
    icon: 'Terminal',
    iconBg: ['#5C2D72', '#300A24'],
  },
  projects: {
    id: 'projects',
    title: 'プロジェクト (Projects)',
    // Nautilus (ファイルマネージャ) のブルー系
    icon: 'FolderOpen',
    iconBg: ['#3584E4', '#1565C0'],
  },
  skills: {
    id: 'skills',
    title: 'スキル (Skills)',
    // GNOME Settings のウォームグレー
    icon: 'Settings2',
    iconBg: ['#767677', '#3D3D3D'],
  },
  achievements: {
    id: 'achievements',
    title: '実績 (Achievements)',
    // トロフィー → アンバー〜オレンジ
    icon: 'Trophy',
    iconBg: ['#FFA726', '#E65100'],
  },
  history: {
    id: 'history',
    title: '更新履歴 (History)',
    // バージョン管理 → グリーン系
    icon: 'History',
    iconBg: ['#4CAF50', '#1B5E20'],
  },
  contact: {
    id: 'contact',
    title: 'お問い合わせ (Contact)',
    // Thunderbird / メール → 深いブルー
    icon: 'Mail',
    iconBg: ['#42A5F5', '#0D47A1'],
  },
  github: {
    id: 'github',
    title: 'GitHub',
    // GitHub ダークテーマ
    icon: 'Github',
    iconBg: ['#444D56', '#1C2128'],
    externalUrl: 'https://github.com/ganondorofu',
  },
  'show-apps': {
    id: 'show-apps',
    title: 'Show Applications',
    // Ubuntu パープル
    icon: 'Grid3x3',
    iconBg: ['#9C27B0', '#4A1942'],
  },
};
