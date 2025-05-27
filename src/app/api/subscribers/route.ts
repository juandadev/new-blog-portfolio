import { NextRequest, NextResponse } from 'next/server';
import { GenericResponse } from '@/types/service';
import { CreateSubscriberResponse } from '@/types/subscriber';
import {
  API_ERRORS,
  SUBSCRIBER_ERRORS,
  SUBSCRIBER_SUCCESS,
} from '@/constants/service';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest
): Promise<NextResponse<GenericResponse<CreateSubscriberResponse>>> {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          message: API_ERRORS.INVALID_DATA.message,
        },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    // Check if the verified and subscribed user count exceeds the limit of 100
    const subscriberCount = await prisma.subscriber.count({
      where: {
        status: 'SUBSCRIBED',
        verified: true,
      },
    });

    if (subscriberCount >= 100) {
      return NextResponse.json(
        {
          message: SUBSCRIBER_ERRORS.LIMIT_EXCEEDED.message,
        },
        { status: SUBSCRIBER_ERRORS.LIMIT_EXCEEDED.status }
      );
    }

    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (subscriber && subscriber.status === 'UNSUBSCRIBED') {
      const updatedSubscriber = await prisma.subscriber.update({
        where: { email },
        data: {
          status: 'SUBSCRIBED',
          unsubscribedAt: null,
        },
      });

      return NextResponse.json(
        {
          message: SUBSCRIBER_SUCCESS.SUBSCRIBED.message,
          data: {
            subscriber: updatedSubscriber,
          },
        },
        { status: SUBSCRIBER_SUCCESS.SUBSCRIBED.status }
      );
    }

    if (subscriber) {
      return NextResponse.json(
        {
          message: SUBSCRIBER_ERRORS.DUPLICATE.message,
        },
        { status: SUBSCRIBER_ERRORS.DUPLICATE.status }
      );
    }

    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.CREATED.message,
        data: {
          subscriber: newSubscriber,
        },
      },
      { status: SUBSCRIBER_SUCCESS.CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [POST_CREATE_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
