'use client';
import {
  User,
  Folder,
  Wrench,
  Award,
  BrainCircuit,
  Mail,
  Github,
  Grid3x3,
} from 'lucide-react';

import Profile from '@/components/portfolio/apps/Profile';
import Projects from '@/components/portfolio/apps/Projects';
import Skills from '@/components/portfolio/apps/Skills';
import Achievements from '@/components/portfolio/apps/Achievements';
import LearningStatement from '@/components/portfolio/apps/LearningStatement';
import Contact from '@/components/portfolio/apps/Contact';
import type { App } from './types';

export type AppID =
  | 'profile'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'learning'
  | 'contact'
  | 'github'
  | 'show-apps';

export const apps: Record<AppID, App> = {
  profile: {
    id: 'profile',
    title: 'プロフィール (Profile)',
    icon: <User className="size-8 text-sky-400" />,
    content: <Profile />,
  },
  projects: {
    id: 'projects',
    title: 'プロジェクト (Projects)',
    icon: <Folder className="size-8 text-amber-500" />,
    content: <Projects />,
  },
  skills: {
    id: 'skills',
    title: 'スキル (Skills)',
    icon: <Wrench className="size-8 text-teal-400" />,
    content: <Skills />,
  },
  achievements: {
    id: 'achievements',
    title: '実績 (Achievements)',
    icon: <Award className="size-8 text-yellow-400" />,
    content: <Achievements />,
  },
  learning: {
    id: 'learning',
    title: '学習方針ジェネレーター',
    icon: <BrainCircuit className="size-8 text-purple-400" />,
    content: <LearningStatement />,
  },
  contact: {
    id: 'contact',
    title: 'お問い合わせ (Contact)',
    icon: <Mail className="size-8 text-lime-500" />,
    content: <Contact />,
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: <Github className="size-8 text-neutral-400" />,
    externalUrl: 'https://github.com/ganondorofu',
  },
  'show-apps': {
    id: 'show-apps',
    title: 'Show Applications',
    icon: <Grid3x3 className="size-7 text-rose-500" />,
  },
};
