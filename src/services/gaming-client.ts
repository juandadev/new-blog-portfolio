import { z } from 'zod';
import { GenericResponse } from '@/types/service';
import {
  Game,
  GameCreateSchema,
  GameUpdateSchema,
  PCPart,
  PCPartCreateSchema,
  PCPartUpdateSchema,
  PCBuildStory,
  PCBuildStoryUpdateSchema,
  Console,
  ConsoleCreateSchema,
  ConsoleUpdateSchema,
  GamingPhoto,
  GamingPhotoCreateSchema,
  GamingPhotoUpdateSchema,
} from '@/types/gaming';
import { PaginatedResponse } from '@/types/pagination';
import { PaginationParams } from '@/types/pagination';

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

export async function getGames(
  paginationParams?: PaginationParams
): Promise<GenericResponse<PaginatedResponse<Game>>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    const url = `${BASE_URL}/api/gaming/games${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url);
    return handleResponse<PaginatedResponse<Game>>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getGame(id: string): Promise<GenericResponse<Game>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/games/${id}`);
    return handleResponse<Game>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createGame(
  gameData: z.infer<typeof GameCreateSchema>
): Promise<GenericResponse<Game>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    return handleResponse<Game>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateGame(
  gameId: string,
  gameData: Partial<z.infer<typeof GameUpdateSchema>>
): Promise<GenericResponse<Game>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/games/${gameId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    return handleResponse<Game>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteGame(
  gameId: string
): Promise<GenericResponse<Game>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/games/${gameId}`, {
      method: 'DELETE',
    });
    return handleResponse<Game>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPCParts(): Promise<GenericResponse<PCPart[]>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-parts`);
    return handleResponse<PCPart[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPCPart(
  partData: z.infer<typeof PCPartCreateSchema>
): Promise<GenericResponse<PCPart>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-parts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partData),
    });
    return handleResponse<PCPart>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePCPart(
  partId: string,
  partData: Partial<z.infer<typeof PCPartUpdateSchema>>
): Promise<GenericResponse<PCPart>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-parts/${partId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partData),
    });
    return handleResponse<PCPart>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePCPart(
  partId: string
): Promise<GenericResponse<PCPart>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-parts/${partId}`, {
      method: 'DELETE',
    });
    return handleResponse<PCPart>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPCBuildStory(): Promise<
  GenericResponse<PCBuildStory | null>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-build-story`);
    return handleResponse<PCBuildStory | null>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePCBuildStory(
  storyData: z.infer<typeof PCBuildStoryUpdateSchema>
): Promise<GenericResponse<PCBuildStory>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/pc-build-story`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });
    return handleResponse<PCBuildStory>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getConsoles(): Promise<GenericResponse<Console[]>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/consoles`);
    return handleResponse<Console[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createConsole(
  consoleData: z.infer<typeof ConsoleCreateSchema>
): Promise<GenericResponse<Console>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/consoles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consoleData),
    });
    return handleResponse<Console>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateConsole(
  consoleId: string,
  consoleData: Partial<z.infer<typeof ConsoleUpdateSchema>>
): Promise<GenericResponse<Console>> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/gaming/consoles/${consoleId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consoleData),
      }
    );
    return handleResponse<Console>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteConsole(
  consoleId: string
): Promise<GenericResponse<Console>> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/gaming/consoles/${consoleId}`,
      {
        method: 'DELETE',
      }
    );
    return handleResponse<Console>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getGamingPhotos(): Promise<
  GenericResponse<GamingPhoto[]>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/photos`);
    return handleResponse<GamingPhoto[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createGamingPhoto(
  photoData: z.infer<typeof GamingPhotoCreateSchema>
): Promise<GenericResponse<GamingPhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    return handleResponse<GamingPhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateGamingPhoto(
  photoId: string,
  photoData: Partial<z.infer<typeof GamingPhotoUpdateSchema>>
): Promise<GenericResponse<GamingPhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/photos/${photoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    return handleResponse<GamingPhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteGamingPhoto(
  photoId: string
): Promise<GenericResponse<GamingPhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/gaming/photos/${photoId}`, {
      method: 'DELETE',
    });
    return handleResponse<GamingPhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadImage(
  file: File
): Promise<GenericResponse<{ url: string }>> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/api/gaming/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<{ url: string }>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
