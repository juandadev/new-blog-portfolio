export type PolaroidPlaceholderEffect = 'blur' | 'pixelate';

interface PolaroidImageVariant {
  height: number;
  width: number;
}

interface PolaroidExpandedImageVariant extends PolaroidImageVariant {
  src: string;
}

export interface PolaroidImageManifestEntry {
  alt: string;
  aspectRatio?: number;
  blurDataURL: string;
  expanded: PolaroidExpandedImageVariant;
  placeholderEffect?: PolaroidPlaceholderEffect;
  preview: PolaroidImageVariant;
}

const defaultBlurDataURL =
  'data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAABQAQCdASoMABAADMDOJaAABHQAAPmrfl3L3OrweEwC/b2JptRNCWeOJHo6GRs7LHAAAA==';

export const polaroidImageManifest = {
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/big-plans-castores.webp':
    {
      alt: 'I have big plans meme',
      aspectRatio: 1,
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 1080,
        height: 1080,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/big-plans-castores.webp',
      },
      placeholderEffect: 'blur',
      preview: {
        width: 1080,
        height: 1080,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/console-render-test.webp':
    {
      alt: 're-render logs',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 249,
        height: 511,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/console-render-test.webp',
      },
      preview: {
        width: 249,
        height: 511,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/react-context-curve.webp':
    {
      alt: 'React learning curve',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 675,
        height: 499,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/react-context-curve.webp',
      },
      preview: {
        width: 675,
        height: 499,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/94d5ec0c7935a6e6acc4c50171b6d9800542df0e/server%20components%201/por-un-demonio-lo-que-faltaba-drake-y-josh.gif':
    {
      alt: 'Por un demonio lo que faltaba GIF',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 600,
        height: 600,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/94d5ec0c7935a6e6acc4c50171b6d9800542df0e/server%20components%201/por-un-demonio-lo-que-faltaba-drake-y-josh.gif',
      },
      preview: {
        width: 600,
        height: 600,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch.webp':
    {
      alt: 'Nintendo Switch',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 800,
        height: 450,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch.webp',
      },
      preview: {
        width: 800,
        height: 450,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-objects.webp':
    {
      alt: 'Nintendo Switch instances',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 800,
        height: 450,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-objects.webp',
      },
      preview: {
        width: 800,
        height: 450,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-pro.webp':
    {
      alt: 'Nintendo Switch PRO',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 800,
        height: 450,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-pro.webp',
      },
      preview: {
        width: 800,
        height: 450,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-inheritance.webp':
    {
      alt: 'Father/children hierachy diagram',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 800,
        height: 450,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-inheritance.webp',
      },
      preview: {
        width: 800,
        height: 450,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-1.webp':
    {
      alt: 'Terminal en cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 2880,
        height: 1294,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-1.webp',
      },
      preview: {
        width: 2880,
        height: 1294,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-2.webp':
    {
      alt: 'Ejemplo del menú para mover archvios dentro de cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 1118,
        height: 470,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-2.webp',
      },
      preview: {
        width: 1118,
        height: 470,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-3.webp':
    {
      alt: 'Ejemplo de la ventana de confirmación para mover archivos dentro de cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 1118,
        height: 497,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-3.webp',
      },
      preview: {
        width: 1118,
        height: 497,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-4.webp':
    {
      alt: 'Ejemplo del menú para editar un archivo dentro de cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 1113,
        height: 469,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-4.webp',
      },
      preview: {
        width: 1113,
        height: 469,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-5.webp':
    {
      alt: 'Vista de la opción para crear bases de datos en cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 834,
        height: 241,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-5.webp',
      },
      preview: {
        width: 834,
        height: 241,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-6.webp':
    {
      alt: 'Vista del formulario para crear una base de datos en cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 528,
        height: 171,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-6.webp',
      },
      preview: {
        width: 528,
        height: 171,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-7.webp':
    {
      alt: 'Vista del formulario para crear un nuevo usuario para la base de datos en cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 643,
        height: 392,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-7.webp',
      },
      preview: {
        width: 643,
        height: 392,
      },
    },
  'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-8.webp':
    {
      alt: 'Vista del formulario para asignar un usuario a una base de datos en cPanel',
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 650,
        height: 189,
        src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/deploy-laravel/post-8.webp',
      },
      preview: {
        width: 650,
        height: 189,
      },
    },
  'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-standard-1776624802665.webp':
    {
      alt: 'Juan Martinez',
      aspectRatio: 187 / 250,
      blurDataURL: defaultBlurDataURL,
      expanded: {
        width: 488,
        height: 650,
        src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan_martinez-highres-1776624802665.webp',
      },
      placeholderEffect: 'blur',
      preview: {
        width: 187,
        height: 250,
      },
    },
} satisfies Record<string, PolaroidImageManifestEntry>;

export type PolaroidImageManifestKey = keyof typeof polaroidImageManifest;
