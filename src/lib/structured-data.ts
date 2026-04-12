import { SITE_CONFIG } from '@/constants/seo';
import { absoluteUrl, getDefaultOgImageUrl, sanitizeTitle } from '@/lib/seo';
import { Post } from '@/types/post';

const PERSON_ID = `${SITE_CONFIG.url}#person`;
const WEBSITE_ID = `${SITE_CONFIG.url}#website`;

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
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
    '@id': WEBSITE_ID,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en-US',
  };
}

interface WebPageSchemaOptions {
  title: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'ProfilePage' | 'CollectionPage';
}

export function generateWebPageSchema({
  title,
  description,
  path,
  type = 'WebPage',
}: WebPageSchemaOptions) {
  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': PERSON_ID,
    },
  };
}

interface CollectionPageSchemaItem {
  name: string;
  url: string;
  description?: string;
}

interface CollectionPageSchemaOptions extends WebPageSchemaOptions {
  items: CollectionPageSchemaItem[];
}

export function generateCollectionPageSchema({
  title,
  description,
  path,
  items,
}: CollectionPageSchemaOptions) {
  const url = absoluteUrl(path);

  return {
    ...generateWebPageSchema({
      title,
      description,
      path,
      type: 'CollectionPage',
    }),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.url,
        name: item.name,
        description: item.description,
      })),
    },
    url,
  };
}

export function generateArticleSchema(post: Post) {
  const cleanTitle = sanitizeTitle(post.title);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: cleanTitle,
    description: post.description,
    image: [getDefaultOgImageUrl()],
    datePublished: post.publishedAt,
    dateModified: post.lastModified,
    inLanguage: 'en-US',
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@id': PERSON_ID,
    },
    mainEntityOfPage: {
      '@id': `${articleUrl}#webpage`,
    },
    keywords: post.tags,
    articleSection: post.tags[0],
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    isBasedOn: post.originalPostUrl || undefined,
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
