export enum CoffeeGearCategory {
  machine = 'machine',
  grinder = 'grinder',
  accessories = 'accessories',
  beans = 'beans',
}

export interface CoffeeGear {
  name: string;
  brand: string;
  description: string;
  image: string;
  category: CoffeeGearCategory;
}

export interface CoffeeStory {
  headline: string;
  intro: string;
  body: string;
}

export interface CoffeeJourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export interface CoffeeData {
  gear: CoffeeGear[];
  story: CoffeeStory | null;
  journey: CoffeeJourneyMilestone[];
}
