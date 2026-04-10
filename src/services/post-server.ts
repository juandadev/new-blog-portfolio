import { Post } from '@/types/post';
import { PaginationMeta } from '@/types/pagination';
import { calculatePaginationMeta } from '@/lib/pagination';
import { getAllPosts, getPostBySlug, getAllSlugs } from '@/lib/mdx';

export interface FetchPostsResult {
  posts: Post[];
  pagination?: PaginationMeta;
}

export async function fetchPosts(paginationParams?: {
  page?: number;
  pageSize?: number;
}): Promise<FetchPostsResult | null> {
  try {
    const page = paginationParams?.page;
    const pageSize = paginationParams?.pageSize;

    if (page != null && pageSize != null) {
      const { posts, totalCount } = getAllPosts(page, pageSize);
      const pagination = calculatePaginationMeta(totalCount, page, pageSize);
      return { posts, pagination };
    }

    const { posts } = getAllPosts();
    return { posts };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchSlugs(): Promise<string[] | null> {
  try {
    return getAllSlugs();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    return getPostBySlug(slug);
  } catch (error) {
    console.error(error);
    return null;
  }
}
