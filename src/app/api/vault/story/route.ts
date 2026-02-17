import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VaultStory, VaultStoryUpdateSchema } from '@/types/vault';
import { API_ERRORS, VAULT_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<VaultStory | null>>
> {
  try {
    const story = await prisma.vaultStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!story) {
      return NextResponse.json(
        {
          message: VAULT_SUCCESS.STORY_FETCHED.message,
          data: null,
        },
        { status: VAULT_SUCCESS.STORY_FETCHED.status }
      );
    }

    const formattedStory = {
      ...story,
      updatedAt: story.updatedAt.toISOString(),
    } as VaultStory;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.STORY_FETCHED.message,
        data: formattedStory,
      },
      { status: VAULT_SUCCESS.STORY_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_STORY_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request
): Promise<NextResponse<GenericResponse<VaultStory>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = VaultStoryUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_VAULT_STORY_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingStory = await prisma.vaultStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    let updatedStory;

    if (existingStory) {
      updatedStory = await prisma.vaultStory.update({
        where: { id: existingStory.id },
        data: parsed.data,
      });
    } else {
      updatedStory = await prisma.vaultStory.create({
        data: parsed.data,
      });
    }

    revalidatePath('/vault');

    const formattedStory = {
      ...updatedStory,
      updatedAt: updatedStory.updatedAt.toISOString(),
    } as VaultStory;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.STORY_UPDATED.message,
        data: formattedStory,
      },
      { status: VAULT_SUCCESS.STORY_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_STORY_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
