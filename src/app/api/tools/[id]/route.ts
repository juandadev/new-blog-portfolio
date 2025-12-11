import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Tool, ToolUpdateSchema } from '@/types/tool';
import { API_ERRORS, TOOL_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Tool>>> {
  try {
    const { id } = await params;

    const tool = await prisma.tool.findUnique({
      where: { id },
    });

    if (!tool) {
      console.error('🚨 [TOOL_NOT_FOUND]', id);

      return NextResponse.json(
        { message: API_ERRORS.NOT_FOUND.message },
        { status: API_ERRORS.NOT_FOUND.status }
      );
    }

    return NextResponse.json(
      {
        message: TOOL_SUCCESS.FETCHED.message,
        data: tool,
      },
      { status: TOOL_SUCCESS.FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [TOOL_GET_ONE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: Context
): Promise<NextResponse<GenericResponse<Tool>>> {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      console.error('🚨 [TOOL_PATCH_UNAUTHORIZED]');

      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = ToolUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [TOOL_PATCH_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const updated = await prisma.tool.update({
      where: { id },
      data: parsed.data,
    });
    revalidatePath('/tools');

    return NextResponse.json(
      {
        message: TOOL_SUCCESS.UPDATED.message,
        data: updated,
      },
      { status: TOOL_SUCCESS.UPDATED.status }
    );
  } catch (error) {
    console.error('🚨 [TOOL_PATCH_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
): Promise<NextResponse<GenericResponse<Tool>>> {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      console.error('🚨 [TOOL_DELETE_UNAUTHORIZED]');

      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const deleted = await prisma.tool.delete({ where: { id } });
    revalidatePath('/tools');

    return NextResponse.json(
      {
        message: TOOL_SUCCESS.DELETED.message,
        data: deleted,
      },
      { status: TOOL_SUCCESS.DELETED.status }
    );
  } catch (error) {
    console.error('🚨 [TOOL_DELETE_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
