// noinspection ExceptionCaughtLocallyJS

import { GenericResponse } from '@/types/service';
import { GetToolsResponse, Tool } from '@/types/tool';
import { ToolFormData } from '@/components/ToolForm/ToolForm';
import { PaginationParams } from '@/types/pagination';

export async function getTools(
  paginationParams?: PaginationParams
): Promise<GenericResponse<GetToolsResponse>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<GetToolsResponse>;
  }
}

export async function getTool(id: string): Promise<Tool> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools/${id}`
    );
    const responseData: GenericResponse<Tool> = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData.data as Tool;
  } catch (error) {
    console.error(error);

    return error as Tool;
  }
}

export async function createTool(
  toolData: ToolFormData
): Promise<GenericResponse<Tool>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Tool>;
  }
}

export async function updateTool(
  toolId: string,
  toolData: ToolFormData
): Promise<GenericResponse<Tool>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools/${toolId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Tool>;
  }
}

export async function deleteTool(
  toolId: string
): Promise<GenericResponse<Tool>> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tools/${toolId}`,
      {
        method: 'DELETE',
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    console.error(error);

    return error as GenericResponse<Tool>;
  }
}
