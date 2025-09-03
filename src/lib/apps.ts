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
    icon: 'User',
    iconColor: 'text-sky-400',
  },
  projects: {
    id: 'projects',
    title: 'プロジェクト (Projects)',
    icon: 'Folder',
    iconColor: 'text-amber-500',
  },
  history: {
    id: 'history',
    title: '更新履歴 (History)',
    icon: 'GitCommitHorizontal',
    iconColor: 'text-green-400',
  },
  skills: {
    id: 'skills',
    title: 'スキル (Skills)',
    icon: 'Wrench',
    iconColor: 'text-teal-400',
  },
  achievements: {
    id: 'achievements',
    title: '実績 (Achievements)',
    icon: 'Award',
    iconColor: 'text-yellow-400',
  },
  contact: {
    id: 'contact',
    title: 'お問い合わせ (Contact)',
    icon: 'Mail',
    iconColor: 'text-lime-500',
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: 'Github',
    iconColor: 'text-neutral-400',
    externalUrl: 'https://github.com/ganondorofu',
  },
  'show-apps': {
    id: 'show-apps',
    title: 'Show Applications',
    icon: 'Grid3x3',
    iconColor: 'text-rose-500',
  },
};
