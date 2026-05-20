import fs from 'fs';
import path from 'path';
import { cache } from 'react';

import { postModules } from '@/content/post-registry';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const wordsPerMinute = 200;

function getPlainTextFromMdx(source: string): string {
  return source
    .replace(/export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};/, ' ')
    .replace(/^import\s+.+;$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#__*`>~-]/g, ' ');
}

function getWordCount(source: string): number {
  const text = getPlainTextFromMdx(source).trim();

  if (!text) {
    return 0;
  }

  return text.split(/\s+/).length;
}

function toPost(module: (typeof postModules)[number]): Post {
  const filePath = path.join(postsDirectory, module.filename);
  const source = fs.readFileSync(filePath, 'utf8');
  const fileStats = fs.statSync(filePath);
  const wordCount = getWordCount(source);

  return {
    ...module.metadata,
    Component: module.Component,
    lastModified: fileStats.mtime.toISOString(),
    readTime: Math.max(1, Math.ceil(wordCount / wordsPerMinute)),
    wordCount,
  };
}

export const getAllPosts = cache((): Post[] => {
  return postModules
    .map((module) => toPost(module))
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
