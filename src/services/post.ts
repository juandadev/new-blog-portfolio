// noinspection ExceptionCaughtLocallyJS

import { GetPostResponse, GetPostsResponse, Post } from '@/types/post';
import { API_ERRORS } from '@/constants/service';
import { GenericResponse } from '@/types/service';

export async function fetchPosts(): Promise<Post[] | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
    );

    if (!response.ok) {
      throw new Error(API_ERRORS.INTERNAL_SERVER_ERROR.message);
    }

    const responseData: GenericResponse<GetPostsResponse> =
      await response.json();

    return responseData.data?.posts || [];
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`,
      { cache: 'force-cache' }
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
