import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AppID } from './apps';

export interface ProfileData {
  name: string;
  title: string;
  school: string;
  affiliation: string;
  email: string;
  github: string;
  learningPolicy: {
    title: string;
    description: string;
  }[];
}

export interface Project {
  title: string;
  category: string;
  description:string;
  technologies: string[];
  status: 'Production' | 'Completed' | 'Active';
  url?: string;
  github?: string;
  image: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    icon?: LucideIcon;
    description: string;
  }[];
}

export interface Achievement {
  category: string;
  items: {
    title: string;
    details: string;
    date: string;
  }[];
}

export interface App {
  id: AppID;
  title: string;
  icon: ReactNode;
  content?: ReactNode;
  externalUrl?: string;
}
