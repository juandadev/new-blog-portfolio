export interface PostAuthor {
  name: string;
  profilePicture: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: string | null;
  originalPostUrl: string | null;
  tags: string[];
  description: string;
  content: string;
  status: PostStatus;
  authorId: number;
  author: PostAuthor;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
