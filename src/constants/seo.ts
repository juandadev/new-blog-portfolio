export const SITE_CONFIG = {
  url: 'https://juanda.dev',
  name: 'Juanda.dev',
  title: 'Juan Martinez - Frontend Developer',
  description:
    'Frontend developer focused on React and Next.js, v0 ambassador, sharing knowledge on X/Twitter (@juandadotdev). Based in Mexico. Available for part-time contractor work remote.',
  locale: 'en_US',
  twitterHandle: '@juandadotdev',
  author: {
    name: 'Juan Martinez',
    jobTitle: 'Frontend Developer',
    email: 'juanda.martinezn@gmail.com',
    image: 'https://juanda.dev/juan.webp',
    sameAs: [
      'https://x.com/juandadotdev',
      'https://github.com/juandadev',
      'https://www.linkedin.com/in/juandadev/',
      'https://www.youtube.com/@juandadotdev',
    ],
    location: {
      city: 'Zapopan',
      region: 'Jalisco',
      country: 'Mexico',
    },
  },
} as const;

export const OG_DESIGN = {
  background: '#010105',
  headingColor: '#F0ECFA',
  textColor: '#A896B8',
  accentColor: '#E066A3',
  width: 1200,
  height: 630,
} as const;

export const PAGE_SEO = {
  home: {
    title: 'Juan Martinez',
    description:
      'Frontend Developer focused on React & Next.js. v0 Ambassador. Building for the web.',
  },
  tools: {
    title: 'v0 Labs',
    description:
      'Experiments and projects built with v0 by Vercel. Vibe-coding ideas into reality.',
  },
  setup: {
    title: 'My Setup',
    description: 'The tools and gear I use for remote work and side projects.',
  },
  gaming: {
    title: 'Gaming Corner',
    description:
      'Current plays, the eternal backlog, hardware setup, and games I love.',
  },
  coffee: {
    title: 'Coffee',
    description:
      'Former barista turned home enthusiast. Building a tiny coffee sanctuary.',
  },
  newsletter: {
    title: 'Newsletter',
    description:
      'Web dev tips, React & Next.js insights delivered to your inbox.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How we handle your data with privacy-first analytics.',
  },
  blog: {
    title: 'Blog',
    description: 'Articles about React, Next.js, and frontend engineering.',
  },
  vault: {
    title: 'The Vault',
    description:
      'An archive of design work from my Figma days. Production projects, concepts, experiments and cancelled work.',
  },
} as const;
