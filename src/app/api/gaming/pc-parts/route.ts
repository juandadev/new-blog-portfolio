import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PCPart, PCPartCreateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<NextResponse<GenericResponse<PCPart[]>>> {
  try {
    const parts = await prisma.pCPart.findMany({
      orderBy: { order: 'asc' },
    });

    const formattedParts = parts.map((part) => ({
      ...part,
      createdAt: part.createdAt.toISOString(),
      updatedAt: part.updatedAt.toISOString(),
    })) as PCPart[];

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.PC_PARTS_FETCHED.message,
        data: formattedParts,
      },
      { status: GAMING_SUCCESS.PC_PARTS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [PC_PARTS_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<PCPart>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = PCPartCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_PC_PART_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newPart = await prisma.pCPart.create({ data: parsed.data });
    revalidatePath('/gaming');

    const formattedPart = {
      ...newPart,
      createdAt: newPart.createdAt.toISOString(),
      updatedAt: newPart.updatedAt.toISOString(),
    } as PCPart;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.PC_PART_CREATED.message,
        data: formattedPart,
      },
      { status: GAMING_SUCCESS.PC_PART_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [PC_PARTS_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
