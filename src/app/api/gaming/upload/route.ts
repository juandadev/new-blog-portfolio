import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { API_ERRORS, GAMING_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';

export async function POST(
  request: NextRequest
): Promise<NextResponse<GenericResponse<{ url: string }>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const blob = await put(file.name, file, {
      access: 'public',
      allowOverwrite: true,
    });

    return NextResponse.json(
      {
        message: GAMING_SUCCESS.IMAGE_UPLOADED.message,
        data: { url: blob.url },
      },
      { status: GAMING_SUCCESS.IMAGE_UPLOADED.status }
    );
  } catch (error) {
    console.error('🚨 [IMAGE_UPLOAD_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
