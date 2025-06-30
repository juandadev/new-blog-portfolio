import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { CalendarIcon, ExternalLinkIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import GitHubIcon from '@/icons/GitHubIcon';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';

export default function ProjectDetailPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 md:pb-12">
      <article className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              📱 Aplicación Web
            </Badge>
            <Heading level={1}>
              Pokémon Stats: Una pokédex pensada para jugadores casuales
            </Heading>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Avatar className={'rounded-full'}>
                  <AvatarImage src="https://github.com/juandadev.png" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <Typography preset={9}>Juan Daniel Martínez</Typography>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon size={16} />
                <Typography preset={9}>Diciembre 2021</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link
                href="https://pokemonstats.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Ver Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/juandadev/pokemonstats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-2 h-4 w-4" />
                Ver Código
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <Image
            src="https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/projects/pokemon-stats/cover.webp"
            alt="Prototipo de TaskFlow mostrando el dashboard principal con lista de proyectos y tareas"
            width={800}
            height={400}
            className="w-full rounded-xl border border-gray-200 object-cover"
          />
          <Typography preset={9} className="text-center italic">
            Vista principal de PokémonStats
          </Typography>
        </div>
        <div className="prose prose-gray max-w-none">
          <Heading level={2} className="mb-4">
            Resumen del Proyecto
          </Heading>
          <Typography>
            TaskFlow es una aplicación web completa para la gestión de proyectos
            y tareas, desarrollada como parte de mi proceso de aprendizaje en
            desarrollo full-stack. El proyecto nació de la necesidad de crear
            una herramienta que combinara la simplicidad de uso con
            funcionalidades robustas para equipos pequeños y medianos.
          </Typography>
          <Typography>
            Durante el desarrollo de esta aplicación, enfrenté diversos desafíos
            técnicos que me permitieron profundizar en conceptos como
            autenticación, manejo de estado global, optimización de rendimiento
            y arquitectura de componentes. Cada obstáculo se convirtió en una
            oportunidad de aprendizaje que documenté meticulosamente.
          </Typography>
        </div>
        <div className="rounded-xl bg-gray-50 p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Stack Tecnológico
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Frontend</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Zustand</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Backend</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Node.js</li>
                <li>• Express</li>
                <li>• JWT Auth</li>
                <li>• Bcrypt</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Base de Datos</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• PostgreSQL</li>
                <li>• Prisma ORM</li>
                <li>• Redis Cache</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Deploy</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Vercel</li>
                <li>• Railway</li>
                <li>• GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="prose prose-gray max-w-none">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Proceso de Desarrollo
          </h2>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            1. Investigación y Planificación
          </h3>
          <p className="leading-relaxed text-gray-700">
            El proyecto comenzó con un análisis exhaustivo de herramientas
            existentes como Trello, Asana y Notion. Identifiqué las
            funcionalidades core que debía implementar y creé wireframes
            detallados para cada vista de la aplicación.
          </p>
          <div className="my-6">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Wireframes y mockups del proceso de diseño de TaskFlow"
              width={600}
              height={300}
              className="w-full rounded-lg border border-gray-200"
            />
            <p className="mt-2 text-center text-sm text-gray-600 italic">
              Wireframes iniciales y evolución del diseño de la interfaz
            </p>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            2. Arquitectura y Configuración
          </h3>
          <p className="leading-relaxed text-gray-700">
            Establecí una arquitectura modular tanto en el frontend como en el
            backend. En React, implementé un patrón de componentes reutilizables
            con hooks personalizados para la lógica de negocio. En el backend,
            seguí principios REST con middleware personalizado para
            autenticación y validación.
          </p>
          <div className="my-6 rounded-lg bg-gray-900 p-4">
            <pre className="overflow-x-auto text-sm text-green-400">
              <code>{`// Estructura del proyecto
src/
├── components/
│   ├── ui/           # Componentes base
│   ├── forms/        # Formularios
│   └── layout/       # Layout components
├── hooks/            # Custom hooks
├── stores/           # Zustand stores
├── services/         # API calls
└── utils/            # Utilidades`}</code>
            </pre>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            3. Desarrollo e Iteración
          </h3>
          <p className="leading-relaxed text-gray-700">
            Implementé el desarrollo por sprints de una semana, priorizando
            funcionalidades MVP. Cada sprint incluía desarrollo, testing manual,
            y refactoring. Los mayores desafíos fueron la implementación del
            drag & drop para tareas y la optimización de queries en tiempo real.
          </p>
        </div>
        <div className="rounded-xl bg-purple-50 p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Funcionalidades Principales
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Gestión completa de proyectos y tareas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Sistema de colaboración en tiempo real</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Dashboard con métricas de productividad</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Notificaciones push y por email</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Interfaz drag & drop intuitiva</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Autenticación segura con JWT</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Diseño responsive y accesible</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-purple-600">•</span>
                <span>Exportación de datos a PDF/Excel</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="prose prose-gray max-w-none">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Lecciones Aprendidas
          </h2>
          <p className="leading-relaxed text-gray-700">
            Este proyecto me enseñó la importancia de la planificación detallada
            y el testing continuo. Aprendí a manejar estados complejos en React,
            a optimizar queries de base de datos, y a implementar patrones de
            diseño escalables.
          </p>
          <div className="my-6 border-l-4 border-blue-400 bg-blue-50 p-4">
            <p className="font-medium text-blue-800">
              💡 <strong>Consejo clave:</strong> La documentación del proceso es
              tan importante como el código mismo. Cada decisión técnica
              documentada se convierte en aprendizaje reutilizable para futuros
              proyectos.
            </p>
          </div>
          <p className="leading-relaxed text-gray-700">
            Los errores más valiosos fueron aquellos relacionados con el manejo
            de estado asíncrono y la optimización prematura. Aprender a
            identificar cuándo refactorizar y cuándo seguir adelante fue una
            habilidad crucial que desarrollé durante este proyecto.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link
                href="https://pokemonstats.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="mr-2 h-5 w-5" />
                Explorar Demo en Vivo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/juandadev/pokemonstats"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                Ver Código Fuente
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
