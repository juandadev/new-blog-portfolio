import { z } from 'zod';
import { GenericResponse } from '@/types/service';
import { PromoBanner, PromoBannerUpdateSchema, AIModel } from '@/types/banner';

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

export async function getPromoBanner(): Promise<
  GenericResponse<PromoBanner | null>
> {
  try {
    const response = await fetch(`${BASE_URL}/api/banner`, {
      cache: 'no-store',
    });
    return handleResponse<PromoBanner | null>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePromoBanner(
  bannerData: z.infer<typeof PromoBannerUpdateSchema>
): Promise<GenericResponse<PromoBanner>> {
  try {
    const response = await fetch(`${BASE_URL}/api/banner`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bannerData),
    });
    return handleResponse<PromoBanner>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadBannerImage(
  file: File
): Promise<GenericResponse<{ url: string }>> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/api/banner/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<{ url: string }>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function enhanceBannerText(
  text: string,
  model: AIModel
): Promise<GenericResponse<{ enhancedText: string }>> {
  try {
    const response = await fetch(`${BASE_URL}/api/banner/enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model }),
    });
    return handleResponse<{ enhancedText: string }>(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
