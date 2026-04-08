import { GamingData } from '@/types/gaming';
import { gamingData } from '@/data/gaming-data';

export async function fetchGamingData(): Promise<GamingData> {
  return gamingData;
}
