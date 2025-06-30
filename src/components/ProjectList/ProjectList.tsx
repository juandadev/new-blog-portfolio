import React from 'react';
import ProjectCard from '@/components/ProjectList/ProjectCard';

const featuredProjects = [
  {
    id: 1,
    title: 'E-commerce Dashboard',
    description:
      'Panel de administración completo para tiendas en línea con análisis en tiempo real',
    image: '/placeholder.svg?height=200&width=300',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'Aplicación de gestión de tareas con colaboración en tiempo real',
    image: '/placeholder.svg?height=200&width=300',
    techStack: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Weather Forecast PWA',
    description:
      'Aplicación web progresiva para pronóstico del clima con geolocalización',
    image: '/placeholder.svg?height=200&width=300',
    techStack: ['React', 'PWA', 'Weather API', 'Service Workers'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Blog Personal CMS',
    description: 'Sistema de gestión de contenido personalizado para blogs',
    image: '/placeholder.svg?height=200&width=300',
    techStack: ['Next.js', 'Sanity', 'TypeScript', 'Vercel'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 5,
    title: 'Crypto Portfolio Tracker',
    description:
      'Rastreador de portafolio de criptomonedas con gráficos interactivos',
    image: '/placeholder.svg?height=200&width=300',
    techStack: ['React', 'Chart.js', 'CoinGecko API', 'Redux'],
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
];

export default function ProjectList() {
  return featuredProjects.map((project) => (
    <ProjectCard key={`project-${project.id}`} project={project} />
  ));
}
