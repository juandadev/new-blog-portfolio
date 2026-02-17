import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VaultProject, VaultProjectCreateSchema } from '@/types/vault';
import { API_ERRORS, VAULT_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';
import {
  parsePaginationParams,
  calculatePaginationMeta,
} from '@/lib/pagination';
import { PaginatedResponse } from '@/types/pagination';

export async function GET(
  request: NextRequest
): Promise<NextResponse<GenericResponse<PaginatedResponse<VaultProject>>>> {
  try {
    const { page, pageSize } = parsePaginationParams(
      request.nextUrl.searchParams
    );

    const [projects, totalCount] = await Promise.all([
      prisma.vaultProject.findMany({
        orderBy: [{ category: 'asc' }, { order: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.vaultProject.count(),
    ]);

    const pagination = calculatePaginationMeta(totalCount, page, pageSize);

    const formattedProjects = projects.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })) as VaultProject[];

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.PROJECTS_FETCHED.message,
        data: {
          items: formattedProjects,
          pagination,
        },
      },
      { status: VAULT_SUCCESS.PROJECTS_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_PROJECTS_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<VaultProject>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = VaultProjectCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_VAULT_PROJECT_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newProject = await prisma.vaultProject.create({ data: parsed.data });
    revalidatePath('/vault');

    const formattedProject = {
      ...newProject,
      createdAt: newProject.createdAt.toISOString(),
      updatedAt: newProject.updatedAt.toISOString(),
    } as VaultProject;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.PROJECT_CREATED.message,
        data: formattedProject,
      },
      { status: VAULT_SUCCESS.PROJECT_CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_PROJECTS_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
