import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CoffeeGear, CoffeeGearCreateSchema } from '@/types/coffee';
import { API_ERRORS, COFFEE_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';
import {
  parsePaginationParams,
  calculatePaginationMeta,
} from '@/lib/pagination';
import { PaginatedResponse } from '@/types/pagination';

export async function GET(
  request: NextRequest
): Promise<NextResponse<GenericResponse<PaginatedResponse<CoffeeGear>>>> {
  try {
    const { page, pageSize } = parsePaginationParams(
      request.nextUrl.searchParams
    );

    const [gear, totalCount] = await Promise.all([
      prisma.coffeeGear.findMany({
        orderBy: [{ category: 'asc' }, { order: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.coffeeGear.count(),
    ]);

    const pagination = calculatePaginationMeta(totalCount, page, pageSize);

    const formattedGear = gear.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })) as CoffeeGear[];

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.GEARS_FETCHED.message,
        data: {
          items: formattedGear,
          pagination,
        },
      },
      { status: COFFEE_SUCCESS.GEARS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_GEAR_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<CoffeeGear>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = CoffeeGearCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_COFFEE_GEAR_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newGear = await prisma.coffeeGear.create({ data: parsed.data });
    revalidatePath('/coffee');

    const formattedGear = {
      ...newGear,
      createdAt: newGear.createdAt.toISOString(),
      updatedAt: newGear.updatedAt.toISOString(),
    } as CoffeeGear;

    return NextResponse.json(
      {
        message: COFFEE_SUCCESS.GEAR_CREATED.message,
        data: formattedGear,
      },
      { status: COFFEE_SUCCESS.GEAR_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [COFFEE_GEAR_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
