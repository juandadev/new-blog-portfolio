import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GamingPhoto, GamingPhotoCreateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<GamingPhoto[]>>
> {
  try {
    const photos = await prisma.gamingPhoto.findMany({
      orderBy: { order: 'asc' },
    });

    const formattedPhotos = photos.map((photo) => ({
      ...photo,
      createdAt: photo.createdAt.toISOString(),
      updatedAt: photo.updatedAt.toISOString(),
    })) as GamingPhoto[];

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAMING_PHOTOS_FETCHED.message,
        data: formattedPhotos,
      },
      { status: GAMING_SUCCESS.GAMING_PHOTOS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMING_PHOTOS_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<GamingPhoto>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = GamingPhotoCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_GAMING_PHOTO_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newPhoto = await prisma.gamingPhoto.create({ data: parsed.data });
    revalidatePath('/gaming');

    const formattedPhoto = {
      ...newPhoto,
      createdAt: newPhoto.createdAt.toISOString(),
      updatedAt: newPhoto.updatedAt.toISOString(),
    } as GamingPhoto;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAMING_PHOTO_CREATED.message,
        data: formattedPhoto,
      },
      { status: GAMING_SUCCESS.GAMING_PHOTO_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMING_PHOTOS_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
