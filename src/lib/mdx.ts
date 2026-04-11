import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

interface PostFrontmatter {
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: string;
  originalPostUrl: string;
  tags: string[];
  description: string;
  author: {
    name: string;
    profilePicture: string;
  };
}

function getPostFiles(): string[] {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

function parsePostFile(filename: string, index: number): Post {
  const filePath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  /**
   * TODO: I don't see any reason to re-map the post data, most of it are fields that made sense when stored in a
   * database, but not anymore, we need to get rid of this nonesense mapping and use the post data as it is. We should
   * just leave the `createdAt` because it is relevant for the original published date.
   */
  return {
    id: index + 1,
    title: frontmatter.title,
    slug: frontmatter.slug,
    publishedAt: frontmatter.publishedAt,
    coverImage: frontmatter.coverImage || null,
    originalPostUrl: frontmatter.originalPostUrl || null,
    tags: frontmatter.tags || [],
    description: frontmatter.description,
    content,
    status: 'PUBLISHED',
    authorId: 1,
    author: frontmatter.author || {
      name: 'Juan Daniel Martínez',
      profilePicture: 'https://avatars.githubusercontent.com/u/38818606?v=4',
    },
    views: 0,
    createdAt: frontmatter.publishedAt,
    updatedAt: frontmatter.publishedAt,
  };
}

export function getAllPosts(
  page?: number,
  pageSize?: number
): { posts: Post[]; totalCount: number } {
  const files = getPostFiles();
  const allPosts = files
    .map((file, index) => parsePostFile(file, index))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  const totalCount = allPosts.length;

  // TODO: Remove this pagination logic, we are no longer using this anywhere so it is useless
  if (page && pageSize) {
    const start = (page - 1) * pageSize;
    return { posts: allPosts.slice(start, start + pageSize), totalCount };
  }

  return { posts: allPosts, totalCount };
}

export function getPostBySlug(slug: string): Post | null {
  const files = getPostFiles();

  for (let i = 0; i < files.length; i++) {
    const post = parsePostFile(files[i], i);

    if (post.slug === slug) return post;
  }

  return null;
}

export function getAllSlugs(): string[] {
  const files = getPostFiles();
  return files.map((file, index) => parsePostFile(file, index).slug);
}
