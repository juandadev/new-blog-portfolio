export enum CoffeeGearCategory {
  machine = 'machine',
  grinder = 'grinder',
  accessories = 'accessories',
  beans = 'beans',
}

export interface CoffeeGear {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  category: CoffeeGearCategory;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeStory {
  id: string;
  headline: string;
  intro: string;
  body: string;
  updatedAt: string;
}

export interface CoffeeJourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeePhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeData {
  gear: CoffeeGear[];
  story: CoffeeStory | null;
  journey: CoffeeJourneyMilestone[];
  photos: CoffeePhoto[];
}
