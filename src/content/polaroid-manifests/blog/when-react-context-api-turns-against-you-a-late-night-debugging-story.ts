import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';

export const reactContextPolaroidImages = {
  bigPlansCastores: {
    alt: 'I have big plans meme',
    aspectRatio: 1,
    blurDataURL:
      'data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAABQAQCdASoQABAADMDOJYwABYwAAP7orxGWRcN9+pOvxhIwgAA=',
    expanded: {
      width: 1080,
      height: 1080,
      src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/big-plans-castores.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 1080,
      height: 1080,
      src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/big-plans-castores.webp',
    },
  },
  consoleRenderTest: {
    alt: 're-render logs',
    blurDataURL:
      'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAABQAQCdASoIABAADMDOJaQABYwAAP7qHAAAAA==',
    preview: {
      width: 249,
      height: 511,
      src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/console-render-test.webp',
    },
  },
  reactContextCurve: {
    alt: 'React learning curve',
    blurDataURL:
      'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAgCdASoWABAAP83a5Gc/ta8nsAgD8DmJYgDA3EMiAAD+5N40KkRxFWE/91C77F8xQub1bIr3H/VTil8e6p30xTcpCneoAAA=',
    preview: {
      width: 675,
      height: 499,
      src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/react-context-problemas-del-sobre-uso/react-context-curve.webp',
    },
  },
} satisfies Record<string, PolaroidImageManifestEntry>;
