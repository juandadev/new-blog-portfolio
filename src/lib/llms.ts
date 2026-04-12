import { SITE_CONFIG } from '@/constants/seo';
import { absoluteUrl } from '@/lib/seo';
import { getAllPosts } from '@/lib/mdx';

const CORE_PAGES = [
  {
    name: 'Home',
    path: '/',
    description:
      'Portfolio overview, bio, featured work, current interests, and navigation to core site sections.',
  },
  {
    name: 'Blog',
    path: '/blog',
    description:
      'Technical writing about React, Next.js, TypeScript, frontend architecture, and lessons from real projects.',
  },
  {
    name: 'Now',
    path: '/now',
    description:
      'Current focus, priorities, projects, and life update page in the now-page style.',
  },
  {
    name: 'Setup',
    path: '/setup',
    description:
      'Work-from-home desk setup, peripherals, accessories, and gear used for development and design work.',
  },
  {
    name: 'Vault',
    path: '/vault',
    description:
      'Archived Figma and design work, including legacy product explorations and prototypes.',
  },
  {
    name: 'Coffee',
    path: '/coffee',
    description:
      'Coffee gear, espresso hobby notes, and the story behind a home coffee setup.',
  },
  {
    name: 'Gaming',
    path: '/gaming',
    description:
      'Gaming setup, current games, PC build, and console collection.',
  },
] as const;

function renderPageLinks() {
  return CORE_PAGES.map(
    (page) => `- [${page.name}](${absoluteUrl(page.path)}): ${page.description}`
  ).join('\n');
}

function renderPostLinks(limit?: number) {
  const posts = getAllPosts();
  const visiblePosts =
    typeof limit === 'number' ? posts.slice(0, limit) : posts;

  return visiblePosts
    .map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`
    )
    .join('\n');
}

export function buildLlmsIndex() {
  return `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About

- Personal website and blog by ${SITE_CONFIG.author.name}.
- Focused on React, Next.js, TypeScript, frontend architecture, design engineering, and developer education.
- Based in ${SITE_CONFIG.author.location.city}, ${SITE_CONFIG.author.location.region}, ${SITE_CONFIG.author.location.country}.
- Content is primarily in English, with some Spanish writing.

## Core Pages

${renderPageLinks()}

## Recent Articles

${renderPostLinks(5)}

## Extended Index

- [Full machine-readable site guide](${absoluteUrl('/llms-full.txt')}): Complete page and article index for AI systems.`;
}

export function buildLlmsFull() {
  return `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## Site Summary

- Author: ${SITE_CONFIG.author.name}
- Role: ${SITE_CONFIG.author.jobTitle}
- Website: ${SITE_CONFIG.url}
- Primary topics: React, Next.js, TypeScript, frontend engineering, design engineering, developer tooling, personal projects
- Geographic context: ${SITE_CONFIG.author.location.city}, ${SITE_CONFIG.author.location.region}, ${SITE_CONFIG.author.location.country}

## Core Pages

${renderPageLinks()}

## Blog Articles

${renderPostLinks()}
`;
}
