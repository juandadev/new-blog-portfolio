import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from './shared';

export const homePolaroidImages = {
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
