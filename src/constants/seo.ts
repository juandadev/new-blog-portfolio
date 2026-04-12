export const SITE_CONFIG = {
  url: 'https://juanda.dev',
  name: 'Juanda.dev',
  title: 'Juandadev | Design Engineer based in Guadalajara',
  description:
    'Portfolio, articles, and experiments by Juan Martinez, a bilingual design engineer building polished React, Next.js, and TypeScript experiences from Guadalajara, Mexico.',
  locale: 'en_US',
  twitterHandle: '@juandadotdev',
  author: {
    name: 'Juan Martinez',
    jobTitle: 'Design Engineer',
    email: 'juanda.martinezn@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/38818606?v=4',
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

/** Static Open Graph / Twitter preview image in `public/`. */
export const DEFAULT_OG_IMAGE_PATH = '/juanda_og.png' as const;

export const defaultOgImageUrl = `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE_PATH}`;
