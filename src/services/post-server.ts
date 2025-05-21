// noinspection ExceptionCaughtLocallyJS

import { GetPostResponse, Post } from '@/types/post';
import { API_ERRORS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { prisma } from '@/lib/prisma';

export async function fetchPosts(): Promise<Post[] | null> {
  try {
    return await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
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

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    // This is a workaround for the fact that we can't use `cookies`
    // from "next/headers" in a client component, so we lazy load the module
    // because this is being executed in a hybrid server/client component
    const cookies = (await import('next/headers')).cookies;
    const cookieStore = await cookies();
    // Since we are fetching data from a server component, we need to get and
    // send the cookies manually so it can get the session data in the Next API route.
    const cookieString = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
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
