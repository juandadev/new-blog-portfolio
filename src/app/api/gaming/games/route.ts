import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Game, GameCreateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';
import {
  parsePaginationParams,
  calculatePaginationMeta,
} from '@/lib/pagination';
import { PaginatedResponse } from '@/types/pagination';

export async function GET(
  request: NextRequest
): Promise<NextResponse<GenericResponse<PaginatedResponse<Game>>>> {
  try {
    const { page, pageSize } = parsePaginationParams(
      request.nextUrl.searchParams
    );

    const [games, totalCount] = await Promise.all([
      prisma.game.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.game.count(),
    ]);

    const pagination = calculatePaginationMeta(totalCount, page, pageSize);

    const formattedGames = games.map((game) => ({
      ...game,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
    })) as Game[];

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAMES_FETCHED.message,
        data: {
          items: formattedGames,
          pagination,
        },
      },
      { status: GAMING_SUCCESS.GAMES_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMES_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<Game>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = GameCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_GAME_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    if (parsed.data.isCurrent) {
      await prisma.game.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false },
      });
    }

    const newGame = await prisma.game.create({ data: parsed.data });
    revalidatePath('/gaming');

    const formattedGame = {
      ...newGame,
      createdAt: newGame.createdAt.toISOString(),
      updatedAt: newGame.updatedAt.toISOString(),
    } as Game;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAME_CREATED.message,
        data: formattedGame,
      },
      { status: GAMING_SUCCESS.GAME_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMES_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
