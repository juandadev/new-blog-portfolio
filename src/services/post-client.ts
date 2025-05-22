// noinspection ExceptionCaughtLocallyJS

import { GenericPostResponse, GetPostsResponse } from '@/types/post';
import { GenericResponse } from '@/types/service';
import { PostFormData } from '@/components/PostForm/PostForm';

export async function createPost(
  postData: PostFormData
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
  postId: number,
  postData: PostFormData
): Promise<GenericResponse<GenericPostResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
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
