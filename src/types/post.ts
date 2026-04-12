export interface Post {
  title: string;
  slug: string;
  publishedAt: string;
  lastModified: string;
  coverImage: string | null;
  originalPostUrl: string | null;
  tags: string[];
  description: string;
  content: string;
}
