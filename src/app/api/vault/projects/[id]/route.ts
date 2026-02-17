import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { VaultProject, VaultProjectUpdateSchema } from '@/types/vault';
import { API_ERRORS, VAULT_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<VaultProject>>> {
  try {
    const { id } = await params;

    const project = await prisma.vaultProject.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const formattedProject = {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    } as VaultProject;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.PROJECT_FETCHED.message,
        data: formattedProject,
      },
      { status: VAULT_SUCCESS.PROJECT_FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_PROJECT_GET_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<VaultProject>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = VaultProjectUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [UPDATE_VAULT_PROJECT_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const existing = await prisma.vaultProject.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const updatedProject = await prisma.vaultProject.update({
      where: { id },
      data: parsed.data,
    });

    revalidatePath('/vault');

    const formattedProject = {
      ...updatedProject,
      createdAt: updatedProject.createdAt.toISOString(),
      updatedAt: updatedProject.updatedAt.toISOString(),
    } as VaultProject;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.PROJECT_UPDATED.message,
        data: formattedProject,
      },
      { status: VAULT_SUCCESS.PROJECT_UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_PROJECT_UPDATE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<VaultProject>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const { id } = await params;

    const project = await prisma.vaultProject.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    const deletedProject = await prisma.vaultProject.delete({ where: { id } });

    revalidatePath('/vault');

    const formattedProject = {
      ...deletedProject,
      createdAt: deletedProject.createdAt.toISOString(),
      updatedAt: deletedProject.updatedAt.toISOString(),
    } as VaultProject;

    return NextResponse.json(
      {
        message: VAULT_SUCCESS.PROJECT_DELETED.message,
        data: formattedProject,
      },
      { status: VAULT_SUCCESS.PROJECT_DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [VAULT_PROJECT_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
