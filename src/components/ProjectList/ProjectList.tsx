import React from 'react';
import ProjectCard from '@/components/ProjectList/ProjectCard';
import { fetchProjects } from '@/services/project-server';
import { Heading } from '@/components/ui/Heading';

interface ProjectListProps {
  withLimit?: boolean;
}

export default async function ProjectList({
  withLimit = false,
}: ProjectListProps) {
  const projects = await fetchProjects(withLimit);

  if (!projects || projects.length === 0) {
    return <Heading level={2}>No projects found</Heading>;
  }

  return projects.map((project) => (
    <ProjectCard key={`project-${project.id}`} project={project} />
  ));
}
