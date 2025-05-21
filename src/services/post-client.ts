// noinspection ExceptionCaughtLocallyJS

import { GenericPostResponse, GetPostsResponse, Post } from '@/types/post';
import { GenericResponse } from '@/types/service';

export async function createPost(
  postData: Partial<Omit<Post, 'author'>>
): Promise<GenericResponse<GenericPostResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<GenericPostResponse>;
  }
}

export async function updatePost(
  postData: Partial<Omit<Post, 'author'>>
): Promise<GenericResponse<GenericPostResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postData.slug}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<GenericPostResponse>;
  }
}

export async function getPosts(): Promise<GenericResponse<GetPostsResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<GetPostsResponse>;
  }
}
