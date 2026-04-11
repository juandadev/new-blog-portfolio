import TwitterIcon from '@/icons/TwitterIcon';
import GitHubIcon from '@/icons/GitHubIcon';
import React from 'react';
import { ApplicationType } from '@/types/project';
import { NavItem } from '@/types';
import { VaultProjectCategory } from '@/types/vault';
import LinkedinIcon from '@/icons/LinkedinIcon';

export const V0_LINK = 'https://v0.dev/pricing?via=juan-daniel-martinez';

export const BUY_ME_A_COFFEE_LINK = 'https://buymeacoffee.com/juandadotdev';

export const SOCIAL_MEDIA_LINKS = [
  {
    href: 'https://x.com/juandadotdev',
    label: 'juandadotdev',
    icon: () => <TwitterIcon size={16} />,
  },
  {
    href: 'https://github.com/juandadev',
    label: 'juandadev',
    icon: () => <GitHubIcon size={16} />,
  },
  {
    href: 'https://www.linkedin.com/in/juandadev/',
    label: 'juandadev',
    icon: () => <LinkedinIcon size={16} />,
  },
];

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
    label: 'now',
    href: '/now',
    index: '03',
    text: "What I'm focused on right now—a short snapshot for friends who haven't caught up in a while, not a social feed.",
  },
  {
    label: 'setup',
    href: '/setup',
    index: '04',
    text: "The tools and gear I use for remote work and side projects. This space has evolved over years of iteration. Here's what stuck.",
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
  // {
  //   label: 'the vault',
  //   href: '/vault',
  //   index: '07',
  //   text: 'An archive of design work from my Figma days. From production projects, to concepts, experiments and cancelled work.',
  // },
];

export const VAULT_CATEGORY_CONFIG: Record<
  VaultProjectCategory,
  { label: string; color: { bg: string; text: string } }
> = {
  [VaultProjectCategory.web_app]: {
    label: 'Web App',
    color: { bg: 'bg-cyan-900', text: 'text-cyan-100' },
  },
  [VaultProjectCategory.mobile_app]: {
    label: 'Mobile App',
    color: { bg: 'bg-purple-900', text: 'text-purple-100' },
  },
  [VaultProjectCategory.landing_page]: {
    label: 'Landing Page',
    color: { bg: 'bg-pink-900', text: 'text-pink-100' },
  },
  [VaultProjectCategory.dashboard]: {
    label: 'Dashboard',
    color: { bg: 'bg-blue-900', text: 'text-blue-100' },
  },
  [VaultProjectCategory.ui_components]: {
    label: 'UI Components',
    color: { bg: 'bg-green-900', text: 'text-green-100' },
  },
  [VaultProjectCategory.branding]: {
    label: 'Branding',
    color: { bg: 'bg-orange-900', text: 'text-orange-100' },
  },
  [VaultProjectCategory.other]: {
    label: 'Other',
    color: { bg: 'bg-zinc-900', text: 'text-zinc-100' },
  },
};
