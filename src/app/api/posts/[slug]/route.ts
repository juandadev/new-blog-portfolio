import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { GenericPostResponse, GetPostResponse, postSchema } from '@/types/post';
import { GenericResponse } from '@/types/service';
import { API_ERRORS, POST_SUCCESS } from '@/constants/service';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<GenericResponse<GetPostResponse>>> {
  try {
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

    if (!post || post.status === 'ARCHIVED')
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );

    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return NextResponse.json(
      {
        message: POST_SUCCESS.FETCHED_ONE.message,
        data: { post },
      },
      { status: POST_SUCCESS.FETCHED_ONE.status }
    );
  } catch (error) {
    console.error('🚨 [POST_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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
      console.error('🚨 [PATCH_POST_ERROR]', parsedBody.error.errors);

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

    // For the sake of simplicity, I'm using the slug as the post ID
    const { slug } = await params;
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(slug) },
      include: { author: true },
    });

    if (!existingPost) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const isAdmin = session.user.role === 'ADMIN';
    const isAuthor = existingPost.authorId === user.id;

    if (!isAdmin || !isAuthor) {
      return NextResponse.json(
        { message: API_ERRORS.FORBIDDEN.message },
        { status: API_ERRORS.FORBIDDEN.status }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        ...parsedBody.data,
      },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${updatedPost.slug}`);
    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return NextResponse.json(
      {
        message: POST_SUCCESS.UPDATED.message,
        data: { post: updatedPost },
      },
      { status: POST_SUCCESS.UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [PATCH_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
