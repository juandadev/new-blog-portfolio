export interface Project {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  technologies: string[];
  applicationType: ApplicationType;
  demoUrl: string;
  githubUrl: string;
  postTitle: string;
  date: string;
  coverImage: string;
  content: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PreviewProject = Omit<
  Project,
  | 'content'
  | 'createdAt'
  | 'updatedAt'
  | 'applicationType'
  | 'date'
  | 'postTitle'
>;

export type ApplicationType =
  | 'WEB'
  | 'IOS'
  | 'DESKTOP'
  | 'ANDROID'
  | 'CLI'
  | 'LIBRARY'
  | 'OTHER';
