import { NextResponse } from 'next/server';
import { GenericResponse } from '@/types/service';
import { SubscriberStatsResponse } from '@/types/subscriber';
import { API_ERRORS, SUBSCRIBER_SUCCESS } from '@/constants/service';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(): Promise<
  NextResponse<GenericResponse<SubscriberStatsResponse>>
> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          message: API_ERRORS.UNAUTHORIZED.message,
        },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const [totalCount, totalActive, totalUnsubscribed] = await Promise.all([
      prisma.subscriber.count(),
      prisma.subscriber.count({
        where: {
          status: 'SUBSCRIBED',
          verified: true,
        },
      }),
      prisma.subscriber.count({
        where: {
          status: 'UNSUBSCRIBED',
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.FETCHED_MANY.message,
        data: {
          totalSubscribers: totalCount,
          totalActive,
          totalUnsubscribed,
        },
      },
      { status: SUBSCRIBER_SUCCESS.FETCHED_MANY.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_STATS_GET_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
