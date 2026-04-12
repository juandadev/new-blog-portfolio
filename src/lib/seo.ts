import type { Metadata } from 'next';
import {
  DEFAULT_OG_IMAGE_PATH,
  defaultOgImageUrl,
  SITE_CONFIG,
} from '@/constants/seo';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
}

export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_CONFIG.url;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;

  return new URL(pathOrUrl, SITE_CONFIG.url).toString();
}

export function sanitizeTitle(title: string): string {
  return title
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .trim();
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE_PATH,
  type = 'website',
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
      images: [imageUrl],
    },
  };
}

export function getDefaultOgImageUrl(): string {
  return defaultOgImageUrl;
}
