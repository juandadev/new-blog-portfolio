import { prisma } from '@/lib/prisma';
import {
  Game,
  PCPart,
  PCBuildStory,
  Console,
  GamingPhoto,
  GamingData,
} from '@/types/gaming';

export async function fetchCurrentGame(): Promise<Game | null> {
  try {
    const game = await prisma.game.findFirst({
      where: { isCurrent: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!game) {
      return null;
    }

    return {
      ...game,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
    } as Game;
  } catch (error) {
    console.error('Error fetching current game:', error);
    return null;
  }
}

export async function fetchGameBacklog(): Promise<Game[]> {
  try {
    const games = await prisma.game.findMany({
      where: { status: 'BACKLOG' },
      orderBy: { createdAt: 'desc' },
    });

    return games.map((game) => ({
      ...game,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
    })) as Game[];
  } catch (error) {
    console.error('Error fetching game backlog:', error);
    return [];
  }
}

export async function fetchPCParts(): Promise<PCPart[]> {
  try {
    const parts = await prisma.pCPart.findMany({
      orderBy: { order: 'asc' },
    });

    return parts.map((part) => ({
      ...part,
      createdAt: part.createdAt.toISOString(),
      updatedAt: part.updatedAt.toISOString(),
    })) as PCPart[];
  } catch (error) {
    console.error('Error fetching PC parts:', error);
    return [];
  }
}

export async function fetchPCBuildStory(): Promise<PCBuildStory | null> {
  try {
    const story = await prisma.pCBuildStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!story) {
      return null;
    }

    return {
      ...story,
      updatedAt: story.updatedAt.toISOString(),
    } as PCBuildStory;
  } catch (error) {
    console.error('Error fetching PC build story:', error);
    return null;
  }
}

export async function fetchConsoles(): Promise<Console[]> {
  try {
    const consoles = await prisma.console.findMany({
      orderBy: { order: 'asc' },
    });

    return consoles.map((console) => ({
      ...console,
      createdAt: console.createdAt.toISOString(),
      updatedAt: console.updatedAt.toISOString(),
    })) as Console[];
  } catch (error) {
    console.error('Error fetching consoles:', error);
    return [];
  }
}

export async function fetchGamingPhotos(): Promise<GamingPhoto[]> {
  try {
    const photos = await prisma.gamingPhoto.findMany({
      orderBy: { order: 'asc' },
    });

    return photos.map((photo) => ({
      ...photo,
      createdAt: photo.createdAt.toISOString(),
      updatedAt: photo.updatedAt.toISOString(),
    })) as GamingPhoto[];
  } catch (error) {
    console.error('Error fetching gaming photos:', error);
    return [];
  }
}

export async function fetchGamingData(): Promise<GamingData> {
  try {
    const [
      currentGame,
      gameBacklog,
      pcBuild,
      pcBuildStory,
      consoles,
      gamingPhotos,
    ] = await Promise.all([
      fetchCurrentGame(),
      fetchGameBacklog(),
      fetchPCParts(),
      fetchPCBuildStory(),
      fetchConsoles(),
      fetchGamingPhotos(),
    ]);

    return {
      currentGame,
      gameBacklog,
      pcBuild,
      pcBuildStory,
      consoles,
      gamingPhotos,
    };
  } catch (error) {
    console.error('Error fetching gaming data:', error);
    return {
      currentGame: null,
      gameBacklog: [],
      pcBuild: [],
      pcBuildStory: null,
      consoles: [],
      gamingPhotos: [],
    };
  }
}
