import React from 'react';
import ProjectCard from '@/components/ProjectList/ProjectCard';

const featuredProjects = [
  {
    id: 1,
    title: 'Pokémon Stats',
    description:
      'Aplicación web para visualizar el tipo y detalles de la cadena evolutiva de un Pokémon, además de una gráfica interactiva para comparar debilidades y fortalezas entre tipos.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/projects/pokemon-stats/cover.webp',
    techStack: ['React', 'Next.js', 'Bootstrap', 'PokéAPI'],
    demoUrl: 'https://pokemonstats.vercel.app/',
    githubUrl: 'https://github.com/juandadev/pokemonstats',
    featured: true,
  },
];

export default function ProjectList() {
  return featuredProjects.map((project) => (
    <ProjectCard key={`project-${project.id}`} project={project} />
  ));
}
