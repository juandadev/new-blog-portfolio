import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Console, ConsoleCreateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<NextResponse<GenericResponse<Console[]>>> {
  try {
    const consoles = await prisma.console.findMany({
      orderBy: { order: 'asc' },
    });

    const formattedConsoles = consoles.map((console) => ({
      ...console,
      createdAt: console.createdAt.toISOString(),
      updatedAt: console.updatedAt.toISOString(),
    })) as Console[];

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.CONSOLES_FETCHED.message,
        data: formattedConsoles,
      },
      { status: GAMING_SUCCESS.CONSOLES_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [CONSOLES_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<Console>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = ConsoleCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_CONSOLE_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newConsole = await prisma.console.create({ data: parsed.data });
    revalidatePath('/gaming');

    const formattedConsole = {
      ...newConsole,
      createdAt: newConsole.createdAt.toISOString(),
      updatedAt: newConsole.updatedAt.toISOString(),
    } as Console;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.CONSOLE_CREATED.message,
        data: formattedConsole,
      },
      { status: GAMING_SUCCESS.CONSOLE_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [CONSOLES_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
