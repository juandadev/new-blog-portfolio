// noinspection ExceptionCaughtLocallyJS

import { GenericResponse } from '@/types/service';
import {
  CreateSubscriberResponse,
  Subscriber,
  GetSubscribersResponse,
  SubscriberStatsResponse,
} from '@/types/subscriber';
import { PaginationParams } from '@/types/pagination';
import { SubscriberFilterParams } from '@/types/filtering';

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
    return error as GenericResponse<CreateSubscriberResponse>;
  }
}

export async function getSubscribers(
  paginationParams?: PaginationParams,
  filterParams?: SubscriberFilterParams
): Promise<GenericResponse<GetSubscribersResponse>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    if (filterParams) {
      if (filterParams.search) {
        params.set('search', filterParams.search);
      }
      if (filterParams.status && filterParams.status !== 'all') {
        params.set('status', filterParams.status);
      }
      if (filterParams.verified && filterParams.verified !== 'all') {
        params.set('verified', filterParams.verified);
      }
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers${
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

    return error as GenericResponse<GetSubscribersResponse>;
  }
}

export async function getSubscriberStats(): Promise<
  GenericResponse<SubscriberStatsResponse>
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers/stats`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<SubscriberStatsResponse>;
  }
}

export async function getSubscriber(
  id: number
): Promise<GenericResponse<Subscriber>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers/${id}`
    );
    const responseData: GenericResponse<Subscriber> = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Subscriber>;
  }
}

export async function updateSubscriber(
  id: number,
  data: { status?: 'SUBSCRIBED' | 'UNSUBSCRIBED'; email?: string }
): Promise<GenericResponse<Subscriber>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Subscriber>;
  }
}

export async function deleteSubscriber(
  id: number
): Promise<GenericResponse<Subscriber>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribers/${id}`,
      {
        method: 'DELETE',
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Subscriber>;
  }
}
