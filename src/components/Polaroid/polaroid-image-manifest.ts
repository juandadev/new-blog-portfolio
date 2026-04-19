export type PolaroidPlaceholderEffect = 'blur' | 'pixelate';

export interface PolaroidImageVariant {
  height: number;
  width: number;
}

export interface PolaroidExpandedImageVariant extends PolaroidImageVariant {
  src: string;
}

export interface PolaroidImageManifestEntry {
  alt: string;
  blurDataURL: string;
  expanded: PolaroidExpandedImageVariant;
  placeholderEffect?: PolaroidPlaceholderEffect;
  preview: PolaroidImageVariant;
}

export const polaroidImageManifest = {
  'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-standard-1776624802665.webp':
    {
      alt: 'Juan Martinez',
      blurDataURL:
        'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAABQAQCdASoMABAADMDOJaAABHQAAPmrfl3L3OrweEwC/b2JptRNCWeOJHo6GRs7LHAAAA==',
      expanded: {
        width: 488,
        height: 650,
        src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-highres-1776624802665.webp',
      },
      placeholderEffect: 'blur',
      preview: {
        width: 187,
        height: 250,
      },
    },
} satisfies Record<string, PolaroidImageManifestEntry>;

export type PolaroidImageManifestKey = keyof typeof polaroidImageManifest;
