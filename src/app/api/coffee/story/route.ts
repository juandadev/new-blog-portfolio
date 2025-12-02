import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CoffeeStory, CoffeeStoryUpdateSchema } from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<CoffeeStory | null>>
> {
  try {
    const story = await prisma.coffeeStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!story) {
      return NextResponse.json(
        {
          message: COFFEE_SUCCESS.STORY_FETCHED.message,
          data: null,
        },
        { status: COFFEE_SUCCESS.STORY_FETCHED.status }
      );
    }

    const formattedStory = {
      ...story,
      updatedAt: story.updatedAt.toISOString(),
    } as CoffeeStory;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.STORY_FETCHED.message,
        data: formattedStory,
      },
      { status: COFFEE_SUCCESS.STORY_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_STORY_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request
): Promise<NextResponse<GenericResponse<CoffeeStory>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = CoffeeStoryUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_COFFEE_STORY_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingStory = await prisma.coffeeStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    let updatedStory;

    if (existingStory) {
      updatedStory = await prisma.coffeeStory.update({
        where: { id: existingStory.id },
        data: parsed.data,
      });
    } else {
      updatedStory = await prisma.coffeeStory.create({
        data: parsed.data,
      });
    }

    revalidatePath('/coffee');

    const formattedStory = {
      ...updatedStory,
      updatedAt: updatedStory.updatedAt.toISOString(),
    } as CoffeeStory;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.STORY_UPDATED.message,
        data: formattedStory,
      },
      { status: COFFEE_SUCCESS.STORY_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_STORY_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
