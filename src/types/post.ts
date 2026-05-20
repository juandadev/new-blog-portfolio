import type { ComponentType } from 'react';

export interface PostMetadata {
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: string | null;
  originalPostUrl: string | null;
  tags: string[];
  description: string;
}

export interface Post {
  Component: ComponentType;
  coverImage: string | null;
  description: string;
  lastModified: string;
  originalPostUrl: string | null;
  publishedAt: string;
  readTime: number;
  slug: string;
  tags: string[];
  title: string;
  wordCount: number;
}
