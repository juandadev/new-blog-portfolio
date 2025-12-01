// noinspection ExceptionCaughtLocallyJS

import { GenericPostResponse, GetPostsResponse } from '@/types/post';
import { GenericResponse } from '@/types/service';
import { PostFormData } from '@/components/PostForm/PostForm';
import { PaginationParams } from '@/types/pagination';

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

export async function archivePost(
  postId: number
): Promise<GenericResponse<GenericPostResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'ARCHIVED' }),
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

export async function getPosts(
  paginationParams?: PaginationParams
): Promise<GenericResponse<GetPostsResponse>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url);
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
