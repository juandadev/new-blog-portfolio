import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  CoffeeJourneyMilestone,
  CoffeeJourneyMilestoneCreateSchema,
} from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<CoffeeJourneyMilestone[]>>
> {
  try {
    const milestones = await prisma.coffeeJourneyMilestone.findMany({
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    });

    const formattedMilestones = milestones.map((milestone) => ({
      ...milestone,
      createdAt: milestone.createdAt.toISOString(),
      updatedAt: milestone.updatedAt.toISOString(),
    })) as CoffeeJourneyMilestone[];

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.JOURNEY_FETCHED.message,
        data: formattedMilestones,
      },
      { status: COFFEE_SUCCESS.JOURNEY_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_JOURNEY_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<CoffeeJourneyMilestone>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = CoffeeJourneyMilestoneCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_COFFEE_JOURNEY_MILESTONE_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newMilestone = await prisma.coffeeJourneyMilestone.create({
      data: parsed.data,
    });
    revalidatePath('/coffee');

    const formattedMilestone = {
      ...newMilestone,
      createdAt: newMilestone.createdAt.toISOString(),
      updatedAt: newMilestone.updatedAt.toISOString(),
    } as CoffeeJourneyMilestone;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.JOURNEY_MILESTONE_CREATED.message,
        data: formattedMilestone,
      },
      { status: COFFEE_SUCCESS.JOURNEY_MILESTONE_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_JOURNEY_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
