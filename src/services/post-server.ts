// noinspection ExceptionCaughtLocallyJS

import { Post } from '@/types/post';
import { prisma } from '@/lib/prisma';
import { PaginationParams, PaginationMeta } from '@/types/pagination';
import { calculatePaginationMeta } from '@/lib/pagination';

export interface FetchPostsResult {
  posts: Post[];
  pagination: PaginationMeta;
}

export async function fetchPosts(
  paginationParams?: PaginationParams
): Promise<FetchPostsResult | null> {
  try {
    const page = paginationParams?.page || 1;
    const pageSize = paginationParams?.pageSize || 10;

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        include: {
          author: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.post.count({
        where: { status: 'PUBLISHED' },
      }),
    ]);

    const pagination = calculatePaginationMeta(totalCount, page, pageSize);

    return {
      // @ts-expect-error I don't want to cast the Date type of supabase schema to string
      posts,
      pagination,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function fetchSlugs(): Promise<string[] | null> {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true },
    });

    return posts.map((post) => post.slug);
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });

    if (!post) return null;

    return post as unknown as Post;
  } catch (error) {
    console.error(error);

    return null;
  }
}
