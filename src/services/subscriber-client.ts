// noinspection ExceptionCaughtLocallyJS

import { GenericResponse } from '@/types/service';
import { CreateSubscriberResponse } from '@/types/subscriber';

export async function subscribeEmail(
  email: string
): Promise<GenericResponse<CreateSubscriberResponse>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<CreateSubscriberResponse>;
  }
}
