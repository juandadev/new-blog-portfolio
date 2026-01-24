import { z } from 'zod';

export enum BannerVariant {
  DEFAULT = 'DEFAULT',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  PROMO = 'PROMO',
}

export enum AIModel {
  CLAUDE_37_SONNET = 'claude-3.7-sonnet',
  GPT_41 = 'gpt-4.1',
  GEMINI_25_PRO = 'gemini-2.5-pro',
}

export const PromoBannerSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  text: z
    .string()
    .min(1, 'Text is required')
    .max(120, 'Text must be 120 characters or less'),
  imageUrl: z.string().optional().nullable(),
  linkUrl: z
    .string()
    .url('Invalid URL')
    .optional()
    .or(z.literal(''))
    .nullable(),
  linkText: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  variant: z.nativeEnum(BannerVariant),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PromoBannerUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z
    .string()
    .min(1, 'Text is required')
    .max(120, 'Text must be 120 characters or less'),
  imageUrl: z.string().optional().or(z.literal('')).nullable(),
  linkUrl: z
    .string()
    .url('Invalid URL')
    .optional()
    .or(z.literal(''))
    .nullable(),
  linkText: z.string().optional().or(z.literal('')).nullable(),
  icon: z.string().optional().or(z.literal('')).nullable(),
  variant: z.nativeEnum(BannerVariant),
  enabled: z.boolean(),
});

export const EnhanceTextSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  model: z.nativeEnum(AIModel),
});

export type PromoBanner = z.infer<typeof PromoBannerSchema>;
export type PromoBannerUpdate = z.infer<typeof PromoBannerUpdateSchema>;
export type EnhanceTextRequest = z.infer<typeof EnhanceTextSchema>;
