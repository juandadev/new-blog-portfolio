import { z } from 'zod';
import { GenericResponse } from '@/types/service';
import {
  CoffeeGear,
  CoffeeGearCreateSchema,
  CoffeeGearUpdateSchema,
  CoffeeStory,
  CoffeeStoryUpdateSchema,
  CoffeeJourneyMilestone,
  CoffeeJourneyMilestoneCreateSchema,
  CoffeeJourneyMilestoneUpdateSchema,
  CoffeePhoto,
  CoffeePhotoCreateSchema,
  CoffeePhotoUpdateSchema,
} from '@/types/coffee';
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

export async function getCoffeeGear(
  paginationParams?: PaginationParams
): Promise<GenericResponse<PaginatedResponse<CoffeeGear>>> {
  try {
    const params = new URLSearchParams();
    if (paginationParams) {
      params.set('page', paginationParams.page.toString());
      params.set('pageSize', paginationParams.pageSize.toString());
    }

    const url = `${BASE_URL}/api/coffee/gear${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url);
    return handleResponse<PaginatedResponse<CoffeeGear>>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeeGearItem(
  id: string
): Promise<GenericResponse<CoffeeGear>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/gear/${id}`);
    return handleResponse<CoffeeGear>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCoffeeGear(
  gearData: z.infer<typeof CoffeeGearCreateSchema>
): Promise<GenericResponse<CoffeeGear>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/gear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gearData),
    });
    return handleResponse<CoffeeGear>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCoffeeGear(
  gearId: string,
  gearData: Partial<z.infer<typeof CoffeeGearUpdateSchema>>
): Promise<GenericResponse<CoffeeGear>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/gear/${gearId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gearData),
    });
    return handleResponse<CoffeeGear>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCoffeeGear(
  gearId: string
): Promise<GenericResponse<CoffeeGear>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/gear/${gearId}`, {
      method: 'DELETE',
    });
    return handleResponse<CoffeeGear>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeeStory(): Promise<
  GenericResponse<CoffeeStory | null>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/story`);
    return handleResponse<CoffeeStory | null>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCoffeeStory(
  storyData: z.infer<typeof CoffeeStoryUpdateSchema>
): Promise<GenericResponse<CoffeeStory>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/story`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });
    return handleResponse<CoffeeStory>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeeJourney(): Promise<
  GenericResponse<CoffeeJourneyMilestone[]>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/journey`);
    return handleResponse<CoffeeJourneyMilestone[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeeJourneyMilestone(
  id: string
): Promise<GenericResponse<CoffeeJourneyMilestone>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/journey/${id}`);
    return handleResponse<CoffeeJourneyMilestone>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCoffeeJourneyMilestone(
  milestoneData: z.infer<typeof CoffeeJourneyMilestoneCreateSchema>
): Promise<GenericResponse<CoffeeJourneyMilestone>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/journey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(milestoneData),
    });
    return handleResponse<CoffeeJourneyMilestone>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCoffeeJourneyMilestone(
  milestoneId: string,
  milestoneData: Partial<z.infer<typeof CoffeeJourneyMilestoneUpdateSchema>>
): Promise<GenericResponse<CoffeeJourneyMilestone>> {
  try {
    console.log(milestoneId);
    const response = await fetch(
      `${BASE_URL}/api/coffee/journey/${milestoneId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      }
    );
    return handleResponse<CoffeeJourneyMilestone>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCoffeeJourneyMilestone(
  milestoneId: string
): Promise<GenericResponse<CoffeeJourneyMilestone>> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/coffee/journey/${milestoneId}`,
      {
        method: 'DELETE',
      }
    );
    return handleResponse<CoffeeJourneyMilestone>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeePhotos(): Promise<
  GenericResponse<CoffeePhoto[]>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/photos`);
    return handleResponse<CoffeePhoto[]>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCoffeePhoto(
  id: string
): Promise<GenericResponse<CoffeePhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/photos/${id}`);
    return handleResponse<CoffeePhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCoffeePhoto(
  photoData: z.infer<typeof CoffeePhotoCreateSchema>
): Promise<GenericResponse<CoffeePhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    return handleResponse<CoffeePhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCoffeePhoto(
  photoId: string,
  photoData: Partial<z.infer<typeof CoffeePhotoUpdateSchema>>
): Promise<GenericResponse<CoffeePhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/photos/${photoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    return handleResponse<CoffeePhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCoffeePhoto(
  photoId: string
): Promise<GenericResponse<CoffeePhoto>> {
  try {
    const response = await fetch(`${BASE_URL}/api/coffee/photos/${photoId}`, {
      method: 'DELETE',
    });
    return handleResponse<CoffeePhoto>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
