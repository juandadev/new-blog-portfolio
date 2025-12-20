import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Subscriber } from '@/types/subscriber';
import {
  API_ERRORS,
  SUBSCRIBER_SUCCESS,
  SUBSCRIBER_ERRORS,
} from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { randomBytes } from 'node:crypto';
import { sendSubscriberInvitation } from '@/services/newsletter';

interface Context {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Subscriber>>> {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const subscriberId = parseInt(id);
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    const subscriber = await prisma.subscriber.findUnique({
      where: { id: subscriberId },
    });

    if (!subscriber) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    if (subscriber.verified) {
      return NextResponse.json(
        { message: 'Subscriber is already verified' },
        { status: 400 }
      );
    }

    const tokenExpirationTime = new Date(subscriber.tokenExpiresAt!).getTime();
    const isTokenExpired = tokenExpirationTime < Date.now();

    if (!isTokenExpired && !force) {
      return NextResponse.json(
        {
          message: SUBSCRIBER_ERRORS.TOKEN_STILL_VALID.message,
        },
        { status: SUBSCRIBER_ERRORS.TOKEN_STILL_VALID.status }
      );
    }

    const token = randomBytes(32).toString('hex');
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.subscriber.update({
      where: { id: subscriberId },
      data: {
        token,
        tokenExpiresAt,
      },
    });

    await sendSubscriberInvitation({ email: subscriber.email, token });

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.VERIFICATION_EMAIL_RESENT.message,
        data: {
          ...subscriber,
          token,
          tokenExpiresAt,
        },
      },
      { status: SUBSCRIBER_SUCCESS.VERIFICATION_EMAIL_RESENT.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_RESEND_VERIFICATION_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
