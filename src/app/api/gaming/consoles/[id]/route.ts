import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Console, ConsoleUpdateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<Console>>> {
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
    const parsed = ConsoleUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_CONSOLE_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingConsole = await prisma.console.findUnique({
      where: { id },
    });

    if (!existingConsole) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };
    delete updateData.id;

    const updatedConsole = await prisma.console.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/gaming');

    const formattedConsole = {
      ...updatedConsole,
      createdAt: updatedConsole.createdAt.toISOString(),
      updatedAt: updatedConsole.updatedAt.toISOString(),
    } as Console;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.CONSOLE_UPDATED.message,
        data: formattedConsole,
      },
      { status: GAMING_SUCCESS.CONSOLE_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [CONSOLE_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Console>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const console = await prisma.console.findUnique({
      where: { id },
    });

    if (!console) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedConsole = await prisma.console.delete({
      where: { id },
    });

    revalidatePath('/gaming');

    const formattedConsole = {
      ...deletedConsole,
      createdAt: deletedConsole.createdAt.toISOString(),
      updatedAt: deletedConsole.updatedAt.toISOString(),
    } as Console;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.CONSOLE_DELETED.message,
        data: formattedConsole,
      },
      { status: GAMING_SUCCESS.CONSOLE_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [CONSOLE_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
