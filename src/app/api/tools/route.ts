import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GetToolsResponse, Tool, ToolSchema } from '@/types/tool';
import { API_ERRORS, TOOL_SUCCESS } from '@/constants/service';
import { GenericResponse } from '@/types/service';
import { revalidatePath } from 'next/cache';

export async function GET(): Promise<
  NextResponse<GenericResponse<GetToolsResponse>>
> {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      {
        message: TOOL_SUCCESS.FETCHED.message,
        data: { tools },
      },
      { status: TOOL_SUCCESS.FETCHED.status }
    );
  } catch (error) {
    console.error('🚨 [TOOLS_GET_ALL_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<GenericResponse<Tool>>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: API_ERRORS.UNAUTHORIZED.message },
        { status: API_ERRORS.UNAUTHORIZED.status }
      );
    }

    const body = await request.json();
    const parsed = ToolSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join('. ');
      console.error('🚨 [CREATE_TOOL_ERROR]', message);

      return NextResponse.json(
        { message },
        { status: API_ERRORS.INVALID_DATA.status }
      );
    }

    const newTool = await prisma.tool.create({ data: parsed.data });
    revalidatePath('/tools');

    return NextResponse.json(
      {
        message: TOOL_SUCCESS.CREATED.message,
        data: newTool,
      },
      { status: TOOL_SUCCESS.CREATED.status }
    );
  } catch (error) {
    console.error('🚨 [TOOLS_POST_ERROR]', error);

    return NextResponse.json(
      { message: API_ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: API_ERRORS.INTERNAL_SERVER_ERROR.status }
    );
  }
}
