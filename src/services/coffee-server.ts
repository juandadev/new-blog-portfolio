import {
  CoffeeGear,
  CoffeeStory,
  CoffeeJourneyMilestone,
  CoffeeData,
} from '@/types/coffee';
import {
  coffeeGear,
  coffeeStory,
  coffeeJourney,
  coffeeData,
} from '@/data/coffee-data';

export async function fetchCoffeeGear(): Promise<CoffeeGear[]> {
  return coffeeGear;
}

export async function fetchCoffeeStory(): Promise<CoffeeStory | null> {
  return coffeeStory;
}

export async function fetchCoffeeJourney(): Promise<CoffeeJourneyMilestone[]> {
  return coffeeJourney;
}

export async function fetchCoffeeData(): Promise<CoffeeData> {
  return coffeeData;
}
