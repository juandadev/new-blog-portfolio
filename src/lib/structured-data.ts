import { SITE_CONFIG } from '@/constants/seo';
import { Post } from '@/types/post';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    jobTitle: SITE_CONFIG.author.jobTitle,
    url: SITE_CONFIG.url,
    image: SITE_CONFIG.author.image,
    email: SITE_CONFIG.author.email,
    sameAs: SITE_CONFIG.author.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.author.location.city,
      addressRegion: SITE_CONFIG.author.location.region,
      addressCountry: SITE_CONFIG.author.location.country,
    },
    knowsLanguage: ['English', 'Spanish'],
    description: SITE_CONFIG.description,
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
    },
    inLanguage: 'en-US',
  };
}

export function generateArticleSchema(post: Post) {
  const cleanTitle = post.title
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cleanTitle,
    description: post.description,
    image: post.coverImage || `${SITE_CONFIG.url}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
