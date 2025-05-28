import { NextRequest, NextResponse } from 'next/server';
import { GenericResponse } from '@/types/service';
import { API_ERRORS, SUBSCRIBER_SUCCESS } from '@/constants/service';
import { CreateSubscriberResponse } from '@/types/subscriber';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'node:crypto';
import { sendSubscriberInvitation } from '@/services/newsletter';

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

    const subscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        {
          message: API_ERRORS.NOT_FOUND.message,
        },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const token = randomBytes(32).toString('hex');
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.subscriber.update({
      where: { email },
      data: {
        token,
        tokenExpiresAt,
      },
    });

    await sendSubscriberInvitation({ email, token });

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.INVITATION_SENT.message,
        data: {
          subscriber: {
            ...subscriber,
            token,
            tokenExpiresAt,
          },
        },
      },
      { status: SUBSCRIBER_SUCCESS.INVITATION_SENT.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_INVITATION_CREATE_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
