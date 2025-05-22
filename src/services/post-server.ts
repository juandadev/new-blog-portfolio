// noinspection ExceptionCaughtLocallyJS

import { GetPostResponse, Post } from '@/types/post';
import { API_ERRORS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { prisma } from '@/lib/prisma';

export async function fetchPosts(): Promise<Post[] | null> {
  try {
    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      include: {
        author: {
          select: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`
    );

    if (!response.ok) {
      throw new Error(API_ERRORS.INTERNAL_SERVER_ERROR.message);
    }

    const responseData: GenericResponse<GetPostResponse> =
      await response.json();

    return responseData.data?.post || null;
  } catch (error) {
    console.error(error);

    return null;
  }
}
