import { NextRequest, NextResponse } from 'next/server';
import { GenericResponse } from '@/types/service';
import { GetInvitationsResponse } from '@/types/user';
import { API_ERRORS } from '@/constants/service';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  parsePaginationParams,
  calculatePaginationMeta,
} from '@/lib/pagination';

export async function GET(
  request: NextRequest
): Promise<NextResponse<GenericResponse<GetInvitationsResponse>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        {
          message: API_ERRORS.UNAUTHORIZED.message,
        },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { page, pageSize } = parsePaginationParams(
      request.nextUrl.searchParams
    );

    const [invitations, totalCount] = await Promise.all([
      prisma.invitation.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.invitation.count(),
    ]);

    const pagination = calculatePaginationMeta(totalCount, page, pageSize);

    return NextResponse.json(
      {
        message: 'Invitations retrieved successfully',
        data: {
          items: invitations,
          pagination,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('🚨 [INVITATION_GET_ERROR]', error);

    return NextResponse.json(
      {
        message: API_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
