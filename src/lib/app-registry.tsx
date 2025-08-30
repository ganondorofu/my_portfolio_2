'use client';
import type { ComponentType } from 'react';
import Profile from '@/components/portfolio/apps/Profile';
import Projects from '@/components/portfolio/apps/Projects';
import Skills from '@/components/portfolio/apps/Skills';
import Achievements from '@/components/portfolio/apps/Achievements';
import Contact from '@/components/portfolio/apps/Contact';
import type { AppID } from './apps';

export const appRegistry: Record<AppID, ComponentType> = {
  profile: Profile,
  projects: Projects,
  skills: Skills,
  achievements: Achievements,
  contact: Contact,
  github: () => null, // No content for external link
  'show-apps': () => null, // No content for this action
};
