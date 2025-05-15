import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { GetPostsResponse } from '@/types/post';
import { GenericResponse } from '@/types/service';
import { POST_SUCCESS } from '@/constants/service';

export async function GET(): Promise<
  NextResponse<GenericResponse<GetPostsResponse>>
> {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      author: {
        select: {
          name: true,
          profilePicture: true,
        },
      },
    },
  });

  return NextResponse.json(
    {
      message: POST_SUCCESS.FETCHED_MANY.message,
      data: { posts },
    },
    { status: POST_SUCCESS.FETCHED_MANY.status }
  );
}
