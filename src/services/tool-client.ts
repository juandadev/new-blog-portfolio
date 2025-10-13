// noinspection ExceptionCaughtLocallyJS

import { GenericResponse } from '@/types/service';
import { GetToolsResponse } from '@/types/tool';

export async function getTools(): Promise<GenericResponse<GetToolsResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<GetToolsResponse>;
  }
}

// export async function createTool(
//   postData: PostFormData
// ): Promise<GenericResponse<GenericPostResponse>> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       }
//     );
//     const responseData = await response.json();
//
//     if (!response.ok) {
//       throw new Error(responseData.message);
//     }
//
//     return responseData;
//   } catch (error) {
//     console.error(error);
//
//     return error as GenericResponse<GenericPostResponse>;
//   }
// }
//
// export async function updateTool(
//   postId: number,
//   postData: PostFormData
// ): Promise<GenericResponse<GenericPostResponse>> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
//       {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       }
//     );
//     const responseData = await response.json();
//
//     if (!response.ok) {
//       throw new Error(responseData.message);
//     }
//
//     return responseData;
//   } catch (error) {
//     console.error(error);
//
//     return error as GenericResponse<GenericPostResponse>;
//   }
// }
