export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  coverImage: string | null;
  originalPostUrl: string | null;
  tags: string[];
  description: string;
  content: string;
}
