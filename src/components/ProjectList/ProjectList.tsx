import React from 'react';
import ProjectCard from '@/components/ProjectList/ProjectCard';
import { fetchProjects } from '@/services/project-server';
import { Typography } from '@/components/Typography/Typography';

interface ProjectListProps {
  withLimit?: boolean;
}

export default async function ProjectList({
  withLimit = false,
}: ProjectListProps) {
  const projects = await fetchProjects(withLimit);

  if (!projects || projects.length === 0) {
    return <Typography>No projects found</Typography>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={`project-${project.id}`} project={project} />
      ))}
    </div>
  );
}
