import { z } from 'zod';
import { GenericResponse } from '@/types/service';
import {
  VaultProject,
  VaultProjectCreateSchema,
  VaultProjectUpdateSchema,
  VaultStory,
  VaultStoryUpdateSchema,
} from '@/types/vault';
import { PaginatedResponse, PaginationParams } from '@/types/pagination';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

async function handleResponse<T>(
  response: Response
): Promise<GenericResponse<T>> {
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
}

export async function getVaultProjects(
  paginationParams?: PaginationParams
): Promise<GenericResponse<PaginatedResponse<VaultProject>>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    const url = `${BASE_URL}/api/vault/projects${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url);
    return handleResponse<PaginatedResponse<VaultProject>>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVaultProjectItem(
  id: string
): Promise<GenericResponse<VaultProject>> {
  try {
    const response = await fetch(`${BASE_URL}/api/vault/projects/${id}`);
    return handleResponse<VaultProject>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createVaultProject(
  projectData: z.infer<typeof VaultProjectCreateSchema>
): Promise<GenericResponse<VaultProject>> {
  try {
    const response = await fetch(`${BASE_URL}/api/vault/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    return handleResponse<VaultProject>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateVaultProject(
  projectId: string,
  projectData: Partial<z.infer<typeof VaultProjectUpdateSchema>>
): Promise<GenericResponse<VaultProject>> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/vault/projects/${projectId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      }
    );
    return handleResponse<VaultProject>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteVaultProject(
  projectId: string
): Promise<GenericResponse<VaultProject>> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/vault/projects/${projectId}`,
      {
        method: 'DELETE',
      }
    );
    return handleResponse<VaultProject>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVaultStory(): Promise<
  GenericResponse<VaultStory | null>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/vault/story`);
    return handleResponse<VaultStory | null>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateVaultStory(
  storyData: z.infer<typeof VaultStoryUpdateSchema>
): Promise<GenericResponse<VaultStory>> {
  try {
    const response = await fetch(`${BASE_URL}/api/vault/story`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storyData),
    });
    return handleResponse<VaultStory>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
