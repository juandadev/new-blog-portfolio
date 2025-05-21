import { User } from '@/types/user';
import { z } from 'zod';

export interface Post {
  id: number;
  title: string;
  slug: string;
  publishedAt: Date;
  coverImage: string | null;
  originalPostUrl: string | null;
  tags: string[];
  description: string;
  content: string;
  status: PostStatus;
  author: Pick<User, 'name' | 'profilePicture'>;
  createdAt: Date;
  updatedAt: Date;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface GetPostsResponse {
  posts: Post[];
}

export interface GetPostResponse {
  post: Post;
}

export interface GenericPostResponse {
  post: Omit<Post, 'author' | 'createdAt' | 'updatedAt'>;
}

export const postSchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  slug: z.string().min(1, { message: 'El slug es requerido' }),
  publishedAt: z
    .string()
    .min(1, { message: 'La fecha de creación es requerida' }),
  coverImage: z.string().optional(),
  originalPostUrl: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  content: z.string().min(1, { message: 'El contenido es requerido' }),
});
