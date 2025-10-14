// noinspection ExceptionCaughtLo

import { prisma } from '@/lib/prisma';
import { Tool } from '@/types/tool';

export async function fetchTools(): Promise<Tool[] | null> {
  try {
    return await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error(error);

    return null;
  }
}
