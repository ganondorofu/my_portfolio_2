'use server';
import {
  User,
  Folder,
  Wrench,
  Award,
  Mail,
  Github,
  Grid3x3,
} from 'lucide-react';
import type { App } from './types';

export type AppID =
  | 'profile'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'contact'
  | 'github'
  | 'show-apps';

export const apps: Record<AppID, App> = {
  profile: {
    id: 'profile',
    title: 'プロフィール (Profile)',
    icon: <User className="size-10 text-sky-400" />,
  },
  projects: {
    id: 'projects',
    title: 'プロジェクト (Projects)',
    icon: <Folder className="size-10 text-amber-500" />,
  },
  skills: {
    id: 'skills',
    title: 'スキル (Skills)',
    icon: <Wrench className="size-10 text-teal-400" />,
  },
  achievements: {
    id: 'achievements',
    title: '実績 (Achievements)',
    icon: <Award className="size-10 text-yellow-400" />,
  },
  contact: {
    id: 'contact',
    title: 'お問い合わせ (Contact)',
    icon: <Mail className="size-10 text-lime-500" />,
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: <Github className="size-10 text-neutral-400" />,
    externalUrl: 'https://github.com/ganondorofu',
  },
  'show-apps': {
    id: 'show-apps',
    title: 'Show Applications',
    icon: <Grid3x3 className="size-9 text-rose-500" />,
  },
};
