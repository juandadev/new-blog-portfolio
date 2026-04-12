import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

const getPostFiles = cache((): string[] => {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
});

const parsePostFile = cache((filename: string): Post => {
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const fileStats = fs.statSync(filePath);

  return {
    title: data.title,
    slug: data.slug,
    publishedAt: data.publishedAt,
    lastModified: data.updatedAt || fileStats.mtime.toISOString(),
    coverImage: data.coverImage || null,
    originalPostUrl: data.originalPostUrl || null,
    tags: data.tags || [],
    description: data.description,
    content,
  };
});

export const getAllPosts = cache((): Post[] => {
  return getPostFiles()
    .map((file) => parsePostFile(file))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
});

export const getPostBySlug = cache((slug: string): Post | null => {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
});

export const getAllSlugs = cache((): string[] => {
  return getAllPosts().map((post) => post.slug);
});
