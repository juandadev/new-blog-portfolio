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
    let isTokenExpired = false;
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          message: API_ERRORS.INVALID_DATA.message,
        },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

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

    if (subscriber) {
      if (subscriber.status === 'UNSUBSCRIBED') {
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

      if (subscriber.verified)
        return NextResponse.json(
          {
            message: SUBSCRIBER_ERRORS.DUPLICATE.message,
          },
          { status: SUBSCRIBER_ERRORS.DUPLICATE.status }
        );

      const tokenExpirationTime = new Date(
        subscriber.tokenExpiresAt!
      ).getTime();
      isTokenExpired = tokenExpirationTime < Date.now();

      if (!isTokenExpired)
        return NextResponse.json(
          {
            message: SUBSCRIBER_ERRORS.TOKEN_STILL_VALID.message,
          },
          { status: SUBSCRIBER_ERRORS.TOKEN_STILL_VALID.status }
        );
    }

    if (!subscriber)
      await prisma.subscriber.create({
        data: {
          email: email.toLowerCase(),
        },
      });

    const invitationResponse = await fetch(
      new URL(`/api/invitations/subscriber`, request.url),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );
    const invitationResponseData = await invitationResponse.json();

    if (!invitationResponse.ok) {
      return NextResponse.json(
        {
          message:
            invitationResponseData.message ||
            API_ERRORS.INTERNAL_SERVER_ERROR.message,
        },
        { status: invitationResponse.status }
      );
    }

    const { data: newSubscriberData } = invitationResponseData;

    return NextResponse.json(
      {
        message: isTokenExpired
          ? SUBSCRIBER_SUCCESS.RESEND_INVITATION.message
          : SUBSCRIBER_SUCCESS.CREATED.message,
        data: {
          subscriber: newSubscriberData.subscriber,
        },
      },
      {
        status: isTokenExpired
          ? SUBSCRIBER_SUCCESS.RESEND_INVITATION.status
          : SUBSCRIBER_SUCCESS.CREATED.status,
      }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_CREATE_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
