import TwitterIcon from '@/icons/TwitterIcon';
import GitHubIcon from '@/icons/GitHubIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import React from 'react';
import { ArchiveIcon, BadgeCheckIcon, FileClockIcon } from 'lucide-react';
import { badgeVariants } from '@/components/ui/Badge';
import { PostStatus } from '@/types/post';
import type { VariantProps } from 'class-variance-authority';
import { ApplicationType } from '@/types/project';
import YoutubeIcon from '@/icons/YoutubeIcon';
import { NavItem } from '@/types';

export const V0_LINK = 'https://v0.dev/pricing?via=juan-daniel-martinez';

export const BUY_ME_A_COFFEE_LINK = 'https://buymeacoffee.com/juandadotdev';

export const LOGIN_ERRORS = {
  NO_INVITATION: 'No se ha encontrado una invitación para esta cuenta',
  INACTIVE: 'Tu cuenta está inactiva, por favor contacta al administrador',
  DEFAULT: 'Error desconocido, por favor intenta más tarde',
};

export type LoginErrorKey = keyof typeof LOGIN_ERRORS;

export const SOCIAL_MEDIA_LINKS = [
  {
    href: 'https://x.com/juandadotdev',
    label: 'Twitter',
    icon: () => <TwitterIcon size={16} />,
  },
  {
    href: 'https://github.com/juandadev',
    label: 'Github',
    icon: () => <GitHubIcon size={16} />,
  },
  {
    href: 'https://www.linkedin.com/in/juandadev/',
    label: 'Linkedin',
    icon: () => <LinkedinIcon size={16} />,
  },
  {
    href: 'https://www.youtube.com/@juandadotdev',
    label: 'Youtube',
    icon: () => <YoutubeIcon size={16} />,
  },
];

export const POST_STATUS: Record<
  PostStatus,
  {
    label: string;
    icon: React.ReactNode;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  DRAFT: { label: 'Borrador', icon: <FileClockIcon />, variant: 'secondary' },
  PUBLISHED: {
    label: 'Publicado',
    icon: <BadgeCheckIcon />,
    variant: 'success',
  },
  ARCHIVED: { label: 'Archivado', icon: <ArchiveIcon />, variant: 'warning' },
};

export const PROJECT_APPLICATION_TYPE: Record<
  ApplicationType,
  {
    label: string;
    emoji: string;
    color: { bg: string; text: string; hover: string };
  }
> = {
  WEB: {
    label: 'Aplicación Web',
    emoji: '🌐',
    color: {
      bg: 'bg-cyan-100 dark:bg-cyan-900',
      text: 'text-cyan-800 dark:text-cyan-100',
      hover: 'hover:bg-cyan-200 dark:hover:bg-cyan-800',
    },
  },
  IOS: {
    label: 'Aplicación iOS',
    emoji: '🍎',
    color: {
      bg: 'bg-sky-100 dark:bg-sky-900',
      text: 'text-sky-800 dark:text-sky-100',
      hover: 'hover:bg-sky-200 dark:hover:bg-sky-800',
    },
  },
  ANDROID: {
    label: 'Aplicación Android',
    emoji: '🤖',
    color: {
      bg: 'bg-lime-100 dark:bg-lime-900',
      text: 'text-lime-800 dark:text-lime-100',
      hover: 'hover:bg-lime-200 dark:hover:bg-lime-800',
    },
  },
  DESKTOP: {
    label: 'Aplicación de Escritorio',
    emoji: '🖥️',
    color: {
      bg: 'bg-indigo-100 dark:bg-indigo-900',
      text: 'text-indigo-800 dark:text-indigo-100',
      hover: 'hover:bg-indigo-200 dark:hover:bg-indigo-800',
    },
  },
  CLI: {
    label: 'Interfaz de Línea de Comandos',
    emoji: '💻',
    color: {
      bg: 'bg-rose-100 dark:bg-rose-900',
      text: 'text-rose-800 dark:text-rose-100',
      hover: 'hover:bg-rose-200 dark:hover:bg-rose-800',
    },
  },
  LIBRARY: {
    label: 'Librería o Paquete',
    emoji: '📦',
    color: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-800 dark:text-purple-100',
      hover: 'hover:bg-purple-200 dark:hover:bg-purple-800',
    },
  },
  OTHER: {
    label: 'Otro Tipo de Proyecto',
    emoji: '🧩',
    color: {
      bg: 'bg-zinc-100 dark:bg-zinc-900',
      text: 'text-zinc-800 dark:text-zinc-100',
      hover: 'hover:bg-zinc-200 dark:hover:bg-zinc-800',
    },
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'home', href: '/', index: '01' },
  {
    label: 'blog',
    href: '/blog',
    index: '02',
    text: 'Thoughts, tutorials, and deep dives into software engineering, and everything in between.',
  },
  {
    label: 'v0 labs',
    href: '/tools',
    index: '03',
    text: "A collection of experiments, v0-labs, and side projects I've built using v0. This is where I vibe-code ideas into reality. From quick utilities to full-blown apps.",
  },
  {
    label: 'setup',
    href: '/setup',
    index: '04',
    text: "The v0-labs and gear I use for remote work and side projects. This space has evolved over years of iteration. Here's what stuck.",
  },
  {
    label: 'gaming',
    href: '/gaming',
    index: '05',
    text: 'My gaming corner. Current plays, the eternal backlog, hardware setup, and occasional thoughts on games I love.',
  },
  {
    label: 'coffee',
    href: '/coffee',
    index: '06',
    text: "A software engineer's analog escape. Former barista turned home enthusiast, building a tiny coffee sanctuary one upgrade at a time.",
  },
];
