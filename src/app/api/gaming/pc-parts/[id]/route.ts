import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PCPart, PCPartUpdateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<PCPart>>> {
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
    const parsed = PCPartUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_PC_PART_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingPart = await prisma.pCPart.findUnique({
      where: { id },
    });

    if (!existingPart) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };

    const updatedPart = await prisma.pCPart.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/gaming');

    const formattedPart = {
      ...updatedPart,
      createdAt: updatedPart.createdAt.toISOString(),
      updatedAt: updatedPart.updatedAt.toISOString(),
    } as PCPart;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.PC_PART_UPDATED.message,
        data: formattedPart,
      },
      { status: GAMING_SUCCESS.PC_PART_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [PC_PART_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<PCPart>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const part = await prisma.pCPart.findUnique({
      where: { id },
    });

    if (!part) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedPart = await prisma.pCPart.delete({
      where: { id },
    });

    revalidatePath('/gaming');

    const formattedPart = {
      ...deletedPart,
      createdAt: deletedPart.createdAt.toISOString(),
      updatedAt: deletedPart.updatedAt.toISOString(),
    } as PCPart;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.PC_PART_DELETED.message,
        data: formattedPart,
      },
      { status: GAMING_SUCCESS.PC_PART_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [PC_PART_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
