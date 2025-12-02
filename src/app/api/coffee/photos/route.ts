import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CoffeePhoto, CoffeePhotoCreateSchema } from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<CoffeePhoto[]>>
> {
  try {
    const photos = await prisma.coffeePhoto.findMany({
      orderBy: { order: 'asc' },
    });

    const formattedPhotos = photos.map((photo) => ({
      ...photo,
      createdAt: photo.createdAt.toISOString(),
      updatedAt: photo.updatedAt.toISOString(),
    })) as CoffeePhoto[];

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.PHOTOS_FETCHED.message,
        data: formattedPhotos,
      },
      { status: COFFEE_SUCCESS.PHOTOS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_PHOTOS_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<CoffeePhoto>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = CoffeePhotoCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_COFFEE_PHOTO_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newPhoto = await prisma.coffeePhoto.create({ data: parsed.data });
    revalidatePath('/coffee');

    const formattedPhoto = {
      ...newPhoto,
      createdAt: newPhoto.createdAt.toISOString(),
      updatedAt: newPhoto.updatedAt.toISOString(),
    } as CoffeePhoto;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.PHOTO_CREATED.message,
        data: formattedPhoto,
      },
      { status: COFFEE_SUCCESS.PHOTO_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_PHOTO_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
