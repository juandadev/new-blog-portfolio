import { NextRequest, NextResponse } from 'next/server';
import { GenericResponse } from '@/types/service';
import { prisma } from '@/lib/prisma';
import { API_ERRORS, POST_SUCCESS } from '@/constants/service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<GenericResponse<null>>> {
  try {
    const { slug } = await params;

    const isProd = process.env.NODE_ENV === 'production';
    const isBot = request.headers.get('X-Bot-Detected') === 'true';

    if (isProd && !isBot) {
      await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
      });
    }

    return NextResponse.json(
      {
        message: POST_SUCCESS.VIEWS_UPDATED.message,
        data: null,
      },
      { status: POST_SUCCESS.VIEWS_UPDATED.status }
    );
  } catch (error) {
    console.error('[POST_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
