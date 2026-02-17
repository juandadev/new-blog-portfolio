import { prisma } from '@/lib/prisma';
import { VaultProject, VaultStory, VaultData } from '@/types/vault';

export async function fetchVaultProjects(): Promise<VaultProject[]> {
  try {
    const projects = await prisma.vaultProject.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    return projects.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })) as VaultProject[];
  } catch (error) {
    console.error('Error fetching vault projects:', error);
    return [];
  }
}

export async function fetchVaultStory(): Promise<VaultStory | null> {
  try {
    const story = await prisma.vaultStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!story) {
      return null;
    }

    return {
      ...story,
      updatedAt: story.updatedAt.toISOString(),
    } as VaultStory;
  } catch (error) {
    console.error('Error fetching vault story:', error);
    return null;
  }
}

export async function fetchVaultData(): Promise<VaultData> {
  try {
    const [story, projects] = await Promise.all([
      fetchVaultStory(),
      fetchVaultProjects(),
    ]);

    return { story, projects };
  } catch (error) {
    console.error('Error fetching vault data:', error);
    return { story: null, projects: [] };
  }
}
