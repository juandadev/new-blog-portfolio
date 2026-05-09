import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from '../shared';

const deployLaravelImage = ({
  alt,
  height,
  src,
  width,
}: {
  alt: string;
  height: number;
  src: string;
  width: number;
}): PolaroidImageManifestEntry => ({
  alt,
  blurDataURL: defaultPolaroidBlurDataURL,
  preview: {
    width,
    height,
    src,
  },
});

export const deployLaravelPolaroidImages = {
  terminalCpanel: deployLaravelImage({
    alt: 'Terminal en cPanel',
    width: 2880,
    height: 1294,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-1.webp',
  }),
  moveFilesMenu: deployLaravelImage({
    alt: 'Ejemplo del menú para mover archvios dentro de cPanel',
    width: 1118,
    height: 470,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-2.webp',
  }),
  moveFilesConfirmation: deployLaravelImage({
    alt: 'Ejemplo de la ventana de confirmación para mover archivos dentro de cPanel',
    width: 1118,
    height: 497,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-3.webp',
  }),
  editFileMenu: deployLaravelImage({
    alt: 'Ejemplo del menú para editar un archivo dentro de cPanel',
    width: 1113,
    height: 469,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-4.webp',
  }),
  createDatabaseOption: deployLaravelImage({
    alt: 'Vista de la opción para crear bases de datos en cPanel',
    width: 834,
    height: 241,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-5.webp',
  }),
  createDatabaseForm: deployLaravelImage({
    alt: 'Vista del formulario para crear una base de datos en cPanel',
    width: 528,
    height: 171,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-6.webp',
  }),
  createDatabaseUserForm: deployLaravelImage({
    alt: 'Vista del formulario para crear un nuevo usuario para la base de datos en cPanel',
    width: 643,
    height: 392,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-7.webp',
  }),
  assignDatabaseUserForm: deployLaravelImage({
    alt: 'Vista del formulario para asignar un usuario a una base de datos en cPanel',
    width: 650,
    height: 189,
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-8.webp',
  }),
} satisfies Record<string, PolaroidImageManifestEntry>;
