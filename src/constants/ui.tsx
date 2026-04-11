import TwitterIcon from '@/icons/TwitterIcon';
import GitHubIcon from '@/icons/GitHubIcon';
import React from 'react';
import { NavItem } from '@/types';
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
