import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import {
  GenericPostResponse,
  GetPostsResponse,
  postSchema,
} from '@/types/post';
import { GenericResponse } from '@/types/service';
import { API_ERRORS, POST_SUCCESS } from '@/constants/service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { sendNewPostEmail } from '@/services/newsletter';

export async function GET(): Promise<
  NextResponse<GenericResponse<GetPostsResponse>>
> {
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === 'ADMIN';
    const fetchPostsOptions = isAdmin
      ? undefined
      : { where: { authorId: session!.user.id } };

    const posts = await prisma.post.findMany({
      ...fetchPostsOptions,
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    const totalViews = await prisma.post.aggregate({
      _sum: { views: true },
    });
    const totalPosts = await prisma.post.count();
    const totalPublishedPosts = await prisma.post.count({
      where: { status: 'PUBLISHED' },
    });
    const totalDraftPosts = await prisma.post.count({
      where: { status: 'DRAFT' },
    });
    const totalArchivedPosts = await prisma.post.count({
      where: { status: 'ARCHIVED' },
    });

    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return NextResponse.json(
      {
        message: POST_SUCCESS.FETCHED_MANY.message,
        data: {
          posts,
          totalViews: totalViews._sum.views || 0,
          totalPosts,
          totalPublishedPosts,
          totalDraftPosts,
          totalArchivedPosts,
        },
      },
      { status: POST_SUCCESS.FETCHED_MANY.status }
    );
  } catch (error) {
    console.error('🚨 [POST_GET_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<GenericPostResponse>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email) {
      return NextResponse.json(
        {
          message: API_ERRORS.UNAUTHORIZED.message,
        },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsedBody = postSchema.safeParse(body);

    if (!parsedBody.success) {
      console.error('🚨 [CREATE_POST_ERROR]', parsedBody.error.errors);

      const errorMessage = parsedBody.error.errors
        .map((error) => error.message)
        .join('. ');

      return NextResponse.json(
        {
          message: errorMessage,
        },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: API_ERRORS.UNAUTHORIZED.message,
        },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        ...parsedBody.data,
        authorId: user.id,
      },
    });

    if (newPost.status === 'PUBLISHED') {
      revalidatePath('/blog');
      revalidatePath('/');

      const subscribers = await prisma.subscriber.findMany({
        where: {
          verified: true,
          status: 'SUBSCRIBED',
        },
        select: {
          email: true,
        },
      });

      await Promise.allSettled(
        subscribers.map(({ email }) =>
          sendNewPostEmail({
            title: newPost.title,
            slug: newPost.slug,
            coverImage: newPost.coverImage || '',
            email,
          })
        )
      );
    }

    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return NextResponse.json(
      { message: POST_SUCCESS.CREATED.message, data: { post: newPost } },
      { status: POST_SUCCESS.CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [POST_CREATE_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
