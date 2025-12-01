import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GamingPhoto, GamingPhotoUpdateSchema } from '@/types/gaming';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<GamingPhoto>>> {
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
    const parsed = GamingPhotoUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_GAMING_PHOTO_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingPhoto = await prisma.gamingPhoto.findUnique({
      where: { id },
    });

    if (!existingPhoto) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updateData = { ...parsed.data };

    const updatedPhoto = await prisma.gamingPhoto.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/gaming');

    const formattedPhoto = {
      ...updatedPhoto,
      createdAt: updatedPhoto.createdAt.toISOString(),
      updatedAt: updatedPhoto.updatedAt.toISOString(),
    } as GamingPhoto;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAMING_PHOTO_UPDATED.message,
        data: formattedPhoto,
      },
      { status: GAMING_SUCCESS.GAMING_PHOTO_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMING_PHOTO_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<GamingPhoto>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const photo = await prisma.gamingPhoto.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedPhoto = await prisma.gamingPhoto.delete({
      where: { id },
    });

    revalidatePath('/gaming');

    const formattedPhoto = {
      ...deletedPhoto,
      createdAt: deletedPhoto.createdAt.toISOString(),
      updatedAt: deletedPhoto.updatedAt.toISOString(),
    } as GamingPhoto;

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.GAMING_PHOTO_DELETED.message,
        data: formattedPhoto,
      },
      { status: GAMING_SUCCESS.GAMING_PHOTO_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [GAMING_PHOTO_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
