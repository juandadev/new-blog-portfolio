import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  CoffeeJourneyMilestone,
  CoffeeJourneyMilestoneUpdateSchema,
} from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeJourneyMilestone>>> {
  try {
    const { id } = await params;

    const milestone = await prisma.coffeeJourneyMilestone.findUnique({
      where: { id },
    });

    if (!milestone) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const formattedMilestone = {
      ...milestone,
      createdAt: milestone.createdAt.toISOString(),
      updatedAt: milestone.updatedAt.toISOString(),
    } as CoffeeJourneyMilestone;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.JOURNEY_FETCHED.message,
        data: formattedMilestone,
      },
      { status: COFFEE_SUCCESS.JOURNEY_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_JOURNEY_MILESTONE_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeJourneyMilestone>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = CoffeeJourneyMilestoneUpdateSchema.safeParse({
      ...body,
      id,
    });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_COFFEE_JOURNEY_MILESTONE_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingMilestone = await prisma.coffeeJourneyMilestone.findUnique({
      where: { id },
    });

    if (!existingMilestone) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };

    const updatedMilestone = await prisma.coffeeJourneyMilestone.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/coffee');

    const formattedMilestone = {
      ...updatedMilestone,
      createdAt: updatedMilestone.createdAt.toISOString(),
      updatedAt: updatedMilestone.updatedAt.toISOString(),
    } as CoffeeJourneyMilestone;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.JOURNEY_MILESTONE_UPDATED.message,
        data: formattedMilestone,
      },
      { status: COFFEE_SUCCESS.JOURNEY_MILESTONE_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_JOURNEY_MILESTONE_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeJourneyMilestone>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const milestone = await prisma.coffeeJourneyMilestone.findUnique({
      where: { id },
    });

    if (!milestone) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedMilestone = await prisma.coffeeJourneyMilestone.delete({
      where: { id },
    });

    revalidatePath('/coffee');

    const formattedMilestone = {
      ...deletedMilestone,
      createdAt: deletedMilestone.createdAt.toISOString(),
      updatedAt: deletedMilestone.updatedAt.toISOString(),
    } as CoffeeJourneyMilestone;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.JOURNEY_MILESTONE_DELETED.message,
        data: formattedMilestone,
      },
      { status: COFFEE_SUCCESS.JOURNEY_MILESTONE_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_JOURNEY_MILESTONE_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
