import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

function getPostFiles(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

function parsePostFile(filename: string): Post {
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: data.slug,
    publishedAt: data.publishedAt,
    coverImage: data.coverImage || null,
    originalPostUrl: data.originalPostUrl || null,
    tags: data.tags || [],
    description: data.description,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map((file) => parsePostFile(file))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  const files = getPostFiles();

  for (const file of files) {
    const post = parsePostFile(file);

    if (post.slug === slug) return post;
  }

  return null;
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((file) => {
    const filePath = path.join(postsDirectory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return data.slug;
  });
}
