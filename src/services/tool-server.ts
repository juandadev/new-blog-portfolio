import { Tool } from '@/types/tool';
import { tools } from '@/data/tools-data';

export async function fetchTools(): Promise<Tool[] | null> {
  return tools;
}
