import React from 'react';
import ProjectCard from '@/components/ProjectList/ProjectCard';
import { fetchProjects } from '@/services/project-server';
import { Typography } from '@/components/Typography/Typography';
import ProjectItem from '@/components/ProjectList/ProjectItem';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  withLimit?: boolean;
  type?: 'card' | 'list';
}

export default async function ProjectList({
  withLimit = false,
  type = 'card',
}: ProjectListProps) {
  const projects = await fetchProjects(withLimit);

  if (!projects || projects.length === 0) {
    return <Typography>No projects found</Typography>;
  }

  return (
    <div
      className={cn(
        type === 'card'
          ? 'grid grid-cols-1 gap-8 md:grid-cols-2'
          : 'flex flex-col gap-16'
      )}
    >
      {projects.map((project, index) =>
        type === 'card' ? (
          <ProjectCard key={`project-${project.id}`} project={project} />
        ) : (
          <ProjectItem
            key={`project-${project.id}`}
            project={project}
            index={index}
          />
        )
      )}
    </div>
  );
}
