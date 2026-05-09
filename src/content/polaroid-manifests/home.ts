import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from './shared';

export const homePolaroidImages = {
  juanMartinez: {
    alt: 'Juan Martinez',
    aspectRatio: 187 / 250,
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
} satisfies Record<string, PolaroidImageManifestEntry>;
