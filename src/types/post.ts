import { User } from '@/types/user';

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
