import { z } from 'zod';

export enum VaultProjectCategory {
  web_app = 'web_app',
  mobile_app = 'mobile_app',
  landing_page = 'landing_page',
  dashboard = 'dashboard',
  ui_components = 'ui_components',
  branding = 'branding',
  other = 'other',
}

export const VaultProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().url(),
  figmaUrl: z.string().url(),
  category: z.nativeEnum(VaultProjectCategory),
  year: z.string().min(4).max(4),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const VaultProjectCreateSchema = VaultProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VaultProjectUpdateSchema =
  VaultProjectCreateSchema.partial().extend({
    id: z.string(),
  });

export type VaultProject = z.infer<typeof VaultProjectSchema>;

export const VaultStorySchema = z.object({
  id: z.string(),
  headline: z.string().min(1),
  intro: z.string().min(1),
  updatedAt: z.string(),
});

export const VaultStoryUpdateSchema = z.object({
  headline: z.string().min(1),
  intro: z.string().min(1),
});

export type VaultStory = z.infer<typeof VaultStorySchema>;

export interface VaultData {
  story: VaultStory | null;
  projects: VaultProject[];
}
