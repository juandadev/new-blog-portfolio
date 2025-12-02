import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CoffeePhoto, CoffeePhotoUpdateSchema } from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeePhoto>>> {
  try {
    const { id } = await params;

    const photo = await prisma.coffeePhoto.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const formattedPhoto = {
      ...photo,
      createdAt: photo.createdAt.toISOString(),
      updatedAt: photo.updatedAt.toISOString(),
    } as CoffeePhoto;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.PHOTOS_FETCHED.message,
        data: formattedPhoto,
      },
      { status: COFFEE_SUCCESS.PHOTOS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_PHOTO_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeePhoto>>> {
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
    const parsed = CoffeePhotoUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_COFFEE_PHOTO_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingPhoto = await prisma.coffeePhoto.findUnique({
      where: { id },
    });

    if (!existingPhoto) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };
    delete updateData.id;

    const updatedPhoto = await prisma.coffeePhoto.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/coffee');

    const formattedPhoto = {
      ...updatedPhoto,
      createdAt: updatedPhoto.createdAt.toISOString(),
      updatedAt: updatedPhoto.updatedAt.toISOString(),
    } as CoffeePhoto;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.PHOTO_UPDATED.message,
        data: formattedPhoto,
      },
      { status: COFFEE_SUCCESS.PHOTO_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_PHOTO_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<CoffeePhoto>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const photo = await prisma.coffeePhoto.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedPhoto = await prisma.coffeePhoto.delete({
      where: { id },
    });

    revalidatePath('/coffee');

    const formattedPhoto = {
      ...deletedPhoto,
      createdAt: deletedPhoto.createdAt.toISOString(),
      updatedAt: deletedPhoto.updatedAt.toISOString(),
    } as CoffeePhoto;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.PHOTO_DELETED.message,
        data: formattedPhoto,
      },
      { status: COFFEE_SUCCESS.PHOTO_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_PHOTO_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
