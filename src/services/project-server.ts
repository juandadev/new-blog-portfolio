import { PreviewProject, Project } from '@/types/project';
import { projects } from '@/data/projects-data';

export async function fetchProjects(
  withLimit: boolean
): Promise<PreviewProject[] | null> {
  const sorted = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return b.featured ? 1 : -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const limited = withLimit ? sorted.slice(0, 2) : sorted;

  return limited.map(
    ({
      id,
      name,
      slug,
      shortDescription,
      technologies,
      demoUrl,
      githubUrl,
      coverImage,
      featured,
      date,
    }) => ({
      id,
      name,
      slug,
      shortDescription,
      technologies,
      demoUrl,
      githubUrl,
      coverImage,
      featured,
      date,
    })
  );
}

export async function fetchProjectSlugs(): Promise<string[] | null> {
  return projects.map((p) => p.slug);
}

export async function fetchProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}
