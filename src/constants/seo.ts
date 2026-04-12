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

/** Static Open Graph / Twitter preview image (public/). */
export const DEFAULT_OG_IMAGE_PATH = '/juanda_og.png' as const;

export const defaultOgImageUrl = `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE_PATH}`;
