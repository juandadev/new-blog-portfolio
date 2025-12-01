import { z } from 'zod';

export enum GameStatus {
  PLAYING = 'PLAYING',
  BACKLOG = 'BACKLOG',
  COMPLETED = 'COMPLETED',
}

export const GameSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  cover: z.string().url(),
  platform: z.string().min(1),
  status: z.nativeEnum(GameStatus),
  isCurrent: z.boolean().default(false),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GameCreateSchema = GameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const GameUpdateSchema = GameCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export type Game = z.infer<typeof GameSchema>;

export const PCPartSchema = z.object({
  id: z.string().uuid(),
  component: z.string().min(1),
  name: z.string().min(1),
  notes: z.string().optional(),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PCPartCreateSchema = PCPartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PCPartUpdateSchema = PCPartCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export type PCPart = z.infer<typeof PCPartSchema>;

export const PCBuildStorySchema = z.object({
  id: z.string().uuid(),
  story: z.string().min(1),
  updatedAt: z.string(),
});

export const PCBuildStoryUpdateSchema = z.object({
  story: z.string().min(1),
});

export type PCBuildStory = z.infer<typeof PCBuildStorySchema>;

export const ConsoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  image: z.string().url(),
  story: z.string().min(1),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ConsoleCreateSchema = ConsoleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ConsoleUpdateSchema = ConsoleCreateSchema.partial().extend({
  id: z.string().uuid(),
});

export type Console = z.infer<typeof ConsoleSchema>;

export const GamingPhotoSchema = z.object({
  id: z.string().uuid(),
  src: z.string().url(),
  alt: z.string().min(1),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GamingPhotoCreateSchema = GamingPhotoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const GamingPhotoUpdateSchema = GamingPhotoCreateSchema.partial().extend(
  {
    id: z.string().uuid(),
  }
);

export type GamingPhoto = z.infer<typeof GamingPhotoSchema>;

export interface GamingData {
  currentGame: Game | null;
  gameBacklog: Game[];
  pcBuild: PCPart[];
  pcBuildStory: PCBuildStory | null;
  consoles: Console[];
  gamingPhotos: GamingPhoto[];
}
