import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Subscriber } from '@/types/subscriber';
import { API_ERRORS, SUBSCRIBER_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
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

    const subscriber = await prisma.subscriber.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subscriber) {
      console.error('🚨 [SUBSCRIBER_NOT_FOUND]', id);

      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.FETCHED_ONE.message,
        data: subscriber,
      },
      { status: SUBSCRIBER_SUCCESS.FETCHED_ONE.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_GET_ONE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<Subscriber>>> {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      console.error('🚨 [SUBSCRIBER_PATCH_UNAUTHORIZED]');

      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const subscriberId = parseInt(id);

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { id: subscriberId },
    });

    if (!existingSubscriber) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData: {
      status?: 'SUBSCRIBED' | 'UNSUBSCRIBED';
      email?: string;
      unsubscribedAt?: Date | null;
    } = {};

    if (body.status !== undefined) {
      updateData.status = body.status;
      if (body.status === 'UNSUBSCRIBED') {
        updateData.unsubscribedAt = new Date();
      } else if (body.status === 'SUBSCRIBED') {
        updateData.unsubscribedAt = null;
      }
    }

    if (body.email !== undefined && typeof body.email === 'string') {
      updateData.email = body.email.toLowerCase();
    }

    const updated = await prisma.subscriber.update({
      where: { id: subscriberId },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.UPDATED.message,
        data: updated,
      },
      { status: SUBSCRIBER_SUCCESS.UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_PATCH_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Subscriber>>> {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      console.error('🚨 [SUBSCRIBER_DELETE_UNAUTHORIZED]');

      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const subscriberId = parseInt(id);

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { id: subscriberId },
    });

    if (!existingSubscriber) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deleted = await prisma.subscriber.delete({
      where: { id: subscriberId },
    });

    return NextResponse.json(
      {
        message: SUBSCRIBER_SUCCESS.DELETED.message,
        data: deleted,
      },
      { status: SUBSCRIBER_SUCCESS.DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [SUBSCRIBER_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
