import { prisma } from '@/lib/prisma';
import {
  CoffeeGear,
  CoffeeStory,
  CoffeeJourneyMilestone,
  CoffeePhoto,
  CoffeeData,
} from '@/types/coffee';

export async function fetchCoffeeGear(): Promise<CoffeeGear[]> {
  try {
    const gear = await prisma.coffeeGear.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });

    return gear.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })) as CoffeeGear[];
  } catch (error) {
    console.error('Error fetching coffee gear:', error);
    return [];
  }
}

export async function fetchCoffeeStory(): Promise<CoffeeStory | null> {
  try {
    const story = await prisma.coffeeStory.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!story) {
      return null;
    }

    return {
      ...story,
      updatedAt: story.updatedAt.toISOString(),
    } as CoffeeStory;
  } catch (error) {
    console.error('Error fetching coffee story:', error);
    return null;
  }
}

export async function fetchCoffeeJourney(): Promise<CoffeeJourneyMilestone[]> {
  try {
    const milestones = await prisma.coffeeJourneyMilestone.findMany({
      orderBy: [{ year: 'desc' }, { order: 'asc' }],
    });

    return milestones.map((milestone) => ({
      ...milestone,
      createdAt: milestone.createdAt.toISOString(),
      updatedAt: milestone.updatedAt.toISOString(),
    })) as CoffeeJourneyMilestone[];
  } catch (error) {
    console.error('Error fetching coffee journey:', error);
    return [];
  }
}

export async function fetchCoffeePhotos(): Promise<CoffeePhoto[]> {
  try {
    const photos = await prisma.coffeePhoto.findMany({
      orderBy: { order: 'asc' },
    });

    return photos.map((photo) => ({
      ...photo,
      createdAt: photo.createdAt.toISOString(),
      updatedAt: photo.updatedAt.toISOString(),
    })) as CoffeePhoto[];
  } catch (error) {
    console.error('Error fetching coffee photos:', error);
    return [];
  }
}

export async function fetchCoffeeData(): Promise<CoffeeData> {
  try {
    const [gear, story, journey, photos] = await Promise.all([
      fetchCoffeeGear(),
      fetchCoffeeStory(),
      fetchCoffeeJourney(),
      fetchCoffeePhotos(),
    ]);

    return {
      gear,
      story,
      journey,
      photos,
    };
  } catch (error) {
    console.error('Error fetching coffee data:', error);
    return {
      gear: [],
      story: null,
      journey: [],
      photos: [],
    };
  }
}
