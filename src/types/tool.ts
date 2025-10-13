import { z } from 'zod';

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

export interface GetToolsResponse {
  tools: Tool[];
}
