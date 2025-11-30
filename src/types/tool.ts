import { z } from 'zod';
import { PaginatedResponse } from '@/types/pagination';

export const ToolSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  icon: z.string().min(1).max(10).nullish(),
  url: z.string().url(),
});

export const ToolUpdateSchema = ToolSchema.extend({
  id: z.string().uuid(),
});

export type Tool = z.infer<typeof ToolUpdateSchema>;

export type GetToolsResponse = PaginatedResponse<Tool>;
