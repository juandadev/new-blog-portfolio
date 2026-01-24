import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PromoBanner, PromoBannerUpdateSchema } from '@/types/banner';
import { API_ERRORS, BANNER_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { del } from '@vercel/blob';

export async function GET(): Promise<
  NextResponse<GenericResponse<PromoBanner | null>>
> {
  try {
    const banner = await prisma.promoBanner.findFirst({
      where: { enabled: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!banner) {
      return NextResponse.json(
        {
          message: BANNER_SUCCESS.FETCHED.message,
          data: null,
        },
        {
          status: BANNER_SUCCESS.FETCHED.status,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
          },
        }
      );
    }

    const formattedBanner = {
      ...banner,
      createdAt: banner.createdAt.toISOString(),
      updatedAt: banner.updatedAt.toISOString(),
    } as PromoBanner;

    return NextResponse.json(
      {
        message: BANNER_SUCCESS.FETCHED.message,
        data: formattedBanner,
      },
      {
        status: BANNER_SUCCESS.FETCHED.status,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('🚨 [BANNER_GET_ERROR]', error);
    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request
): Promise<NextResponse<GenericResponse<PromoBanner>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = PromoBannerUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existingBanner = await prisma.promoBanner.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (existingBanner?.imageUrl) {
      const oldImageUrl = existingBanner.imageUrl;
      const newImageUrl = parsed.data.imageUrl;

      if (oldImageUrl !== newImageUrl) {
        try {
          await del(oldImageUrl);
          console.log('🗑️ Deleted old banner image:', oldImageUrl);
        } catch (delError) {
          console.error('⚠️ Failed to delete old banner image:', delError);
        }
      }
    }

    let updatedBanner;

    if (existingBanner) {
      updatedBanner = await prisma.promoBanner.update({
        where: { id: existingBanner.id },
        data: {
          ...parsed.data,
          imageUrl: parsed.data.imageUrl || null,
          linkUrl: parsed.data.linkUrl || null,
          linkText: parsed.data.linkText || null,
          icon: parsed.data.icon || null,
        },
      });
    } else {
      updatedBanner = await prisma.promoBanner.create({
        data: {
          ...parsed.data,
          imageUrl: parsed.data.imageUrl || null,
          linkUrl: parsed.data.linkUrl || null,
          linkText: parsed.data.linkText || null,
          icon: parsed.data.icon || null,
        },
      });
    }

    const formattedBanner = {
      ...updatedBanner,
      createdAt: updatedBanner.createdAt.toISOString(),
      updatedAt: updatedBanner.updatedAt.toISOString(),
    } as PromoBanner;

    return NextResponse.json(
      {
        message: BANNER_SUCCESS.UPDATED.message,
        data: formattedBanner,
      },
      { status: BANNER_SUCCESS.UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [BANNER_UPDATE_ERROR]', error);
    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
