import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from './shared';

export const homePolaroidImages = {
  juanda2022_1: {
    alt: 'GDL Cathedral',
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAwAQCdASoLABAADMDOJQAAjoAA/kmOAVsrSdkv/OvFmQY2sMeqyMUiF+LbvywAAAA=',
    expanded: {
      width: 433,
      height: 650,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/IMG_4395-highres-1779243045782.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 167,
      height: 250,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/IMG_4395-standard-1779243045782.webp',
    },
  },
  juanda2022_2: {
    alt: "Juanda's profile picture in 2022",
    blurDataURL:
      'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAQCdASoLABAADMDOJYwABHQAAP7V188at+zK3+eWfbihb/7Npr/9m2qludZp9ugLIDMrWV9dHAAA',
    expanded: {
      width: 433,
      height: 650,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/c2a5e5e3-5ab7-4692-8b01-35c7bc48dbbc-highres-1779243826268.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 167,
      height: 250,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/c2a5e5e3-5ab7-4692-8b01-35c7bc48dbbc-standard-1779243826268.webp',
    },
  },
  globant2022: {
    alt: 'Globant GDL Office',
    blurDataURL:
      'data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAABQAQCdASoLABAADMDOJagABP2AAP7epCf76Ae2GJDUwIac2g7Jxh06MZwpVqjgAAA=',
    expanded: {
      width: 433,
      height: 650,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/IMG_4095-highres-1779243710144.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 167,
      height: 250,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/IMG_4095-standard-1779243710144.webp',
    },
  },
  juanda2025: {
    alt: "Juanda's profile picture in 2025",
    aspectRatio: '187/250',
    blurDataURL: defaultPolaroidBlurDataURL,
    expanded: {
      width: 488,
      height: 650,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-highres-1776624802665.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 187,
      height: 250,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-standard-1776624802665.webp',
    },
  },
  platziConf2026: {
    alt: 'Juanda in Platzi Conf 2026',
    blurDataURL:
      'data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACwAgCdASoYABAAP83W4mY/tK4nMAgD8DmJQAASsQAA/uVZjtxz7E9kZ286PtEnAEEZbJWhQI6GiaqeNgAAAA==',
    expanded: {
      width: 973,
      height: 650,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/DSC05385-highres-1779162396541.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 374,
      height: 250,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/DSC05385-standard-1779162396541.webp',
    },
  },
} satisfies Record<string, PolaroidImageManifestEntry>;
