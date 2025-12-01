import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Game, GameUpdateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Game>>> {
  try {
    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const formattedGame = {
      ...game,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
    } as Game;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAME_FETCHED.message,
        data: formattedGame,
      },
      { status: GAMING_SUCCESS.GAME_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [GAME_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<Game>>> {
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
    const parsed = GameUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_GAME_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingGame = await prisma.game.findUnique({
      where: { id },
    });

    if (!existingGame) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    if (parsed.data.isCurrent && !existingGame.isCurrent) {
      await prisma.game.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      });
    }

    const updateData = { ...parsed.data };

    const updatedGame = await prisma.game.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/gaming');

    const formattedGame = {
      ...updatedGame,
      createdAt: updatedGame.createdAt.toISOString(),
      updatedAt: updatedGame.updatedAt.toISOString(),
    } as Game;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAME_UPDATED.message,
        data: formattedGame,
      },
      { status: GAMING_SUCCESS.GAME_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [GAME_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Game>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
    });

    if (!game) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedGame = await prisma.game.delete({
      where: { id },
    });

    revalidatePath('/gaming');

    const formattedGame = {
      ...deletedGame,
      createdAt: deletedGame.createdAt.toISOString(),
      updatedAt: deletedGame.updatedAt.toISOString(),
    } as Game;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAME_DELETED.message,
        data: formattedGame,
      },
      { status: GAMING_SUCCESS.GAME_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [GAME_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
