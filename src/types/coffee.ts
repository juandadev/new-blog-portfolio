import { z } from 'zod';

export enum CoffeeGearCategory {
  machine = 'machine',
  grinder = 'grinder',
  accessories = 'accessories',
  beans = 'beans',
}

export const CoffeeGearSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  category: z.nativeEnum(CoffeeGearCategory),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CoffeeGearCreateSchema = CoffeeGearSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CoffeeGearUpdateSchema = CoffeeGearCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export type CoffeeGear = z.infer<typeof CoffeeGearSchema>;

export const CoffeeStorySchema = z.object({
  id: z.string().uuid(),
  headline: z.string().min(1),
  intro: z.string().min(1),
  body: z.string().min(1),
  updatedAt: z.string(),
});

export const CoffeeStoryUpdateSchema = z.object({
  headline: z.string().min(1),
  intro: z.string().min(1),
  body: z.string().min(1),
});

export type CoffeeStory = z.infer<typeof CoffeeStorySchema>;

export const CoffeeJourneyMilestoneSchema = z.object({
  id: z.string().uuid(),
  year: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CoffeeJourneyMilestoneCreateSchema =
  CoffeeJourneyMilestoneSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const CoffeeJourneyMilestoneUpdateSchema =
  CoffeeJourneyMilestoneCreateSchema.partial().extend({
    id: z.string().uuid(),
  });

export type CoffeeJourneyMilestone = z.infer<
  typeof CoffeeJourneyMilestoneSchema
>;

export const CoffeePhotoSchema = z.object({
  id: z.string().uuid(),
  src: z.string().url(),
  alt: z.string().min(1),
  caption: z.string().optional(),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CoffeePhotoCreateSchema = CoffeePhotoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CoffeePhotoUpdateSchema = CoffeePhotoCreateSchema.partial().extend(
  {
    id: z.string().uuid(),
  }
);

export type CoffeePhoto = z.infer<typeof CoffeePhotoSchema>;

export interface CoffeeData {
  gear: CoffeeGear[];
  story: CoffeeStory | null;
  journey: CoffeeJourneyMilestone[];
  photos: CoffeePhoto[];
}
