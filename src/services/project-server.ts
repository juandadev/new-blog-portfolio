import { PreviewProject, Project } from '@/types/project';
import { prisma } from '@/lib/prisma';

export async function fetchProjects(
  withLimit: boolean
): Promise<PreviewProject[] | null> {
  try {
    const limitOption = withLimit ? { take: 5 } : {};

    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { date: 'desc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        shortDescription: true,
        technologies: true,
        demoUrl: true,
        githubUrl: true,
        coverImage: true,
        featured: true,
      },
      ...limitOption,
    });
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function fetchProjectSlugs(): Promise<string[] | null> {
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true },
    });

    return projects.map((project) => project.slug);
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    // TODO: Handle this properly with API routes
    if (!project) {
      throw new Error('Project not found');
    }

    // @ts-expect-error I don't want to cast the Date type of supabase schema to string
    return project;
  } catch (error) {
    console.error(error);

    return null;
  }
}
