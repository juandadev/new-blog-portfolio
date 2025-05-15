import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { GetPostResponse } from '@/types/post';
import { GenericResponse } from '@/types/service';
import { API_ERRORS, POST_SUCCESS } from '@/constants/service';
import { getAuthSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<GenericResponse<GetPostResponse>>> {
  const session = await getAuthSession();
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          profilePicture: true,
        },
      },
    },
  });

  if (!post)
    return NextResponse.json(
      { message: API_ERRORS.NOT_FOUND.message },
      { status: API_ERRORS.NOT_FOUND.status }
    );

  if (
    post.status === 'ARCHIVED' &&
    (session?.user.id !== post.authorId || session?.user?.role !== 'ADMIN')
  ) {
    return NextResponse.json(
      { message: API_ERRORS.FORBIDDEN.message },
      { status: API_ERRORS.FORBIDDEN.status }
    );
  }

  return NextResponse.json(
    {
      message: POST_SUCCESS.FETCHED_ONE.message,
      data: { post },
    },
    { status: POST_SUCCESS.FETCHED_ONE.status }
  );
}
