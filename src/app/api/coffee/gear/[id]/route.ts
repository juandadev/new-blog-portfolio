import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CoffeeGear, CoffeeGearUpdateSchema } from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeGear>>> {
  try {
    const { id } = await params;

    const gear = await prisma.coffeeGear.findUnique({
      where: { id },
    });

    if (!gear) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const formattedGear = {
      ...gear,
      createdAt: gear.createdAt.toISOString(),
      updatedAt: gear.updatedAt.toISOString(),
    } as CoffeeGear;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.GEAR_FETCHED.message,
        data: formattedGear,
      },
      { status: COFFEE_SUCCESS.GEAR_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_GEAR_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeGear>>> {
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
    const parsed = CoffeeGearUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_COFFEE_GEAR_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingGear = await prisma.coffeeGear.findUnique({
      where: { id },
    });

    if (!existingGear) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };

    const updatedGear = await prisma.coffeeGear.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/coffee');

    const formattedGear = {
      ...updatedGear,
      createdAt: updatedGear.createdAt.toISOString(),
      updatedAt: updatedGear.updatedAt.toISOString(),
    } as CoffeeGear;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.GEAR_UPDATED.message,
        data: formattedGear,
      },
      { status: COFFEE_SUCCESS.GEAR_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_GEAR_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeeGear>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const gear = await prisma.coffeeGear.findUnique({
      where: { id },
    });

    if (!gear) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedGear = await prisma.coffeeGear.delete({
      where: { id },
    });

    revalidatePath('/coffee');

    const formattedGear = {
      ...deletedGear,
      createdAt: deletedGear.createdAt.toISOString(),
      updatedAt: deletedGear.updatedAt.toISOString(),
    } as CoffeeGear;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.GEAR_DELETED.message,
        data: formattedGear,
      },
      { status: COFFEE_SUCCESS.GEAR_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_GEAR_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
