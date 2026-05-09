import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from '../shared';

export const serverComponentsPolaroidImages = {
  porUnDemonio: {
    alt: 'Por un demonio lo que faltaba GIF',
    blurDataURL: defaultPolaroidBlurDataURL,
    preview: {
      width: 600,
      height: 600,
      src: 'https://raw.githubusercontent.com/juandadev/assets-blog/94d5ec0c7935a6e6acc4c50171b6d9800542df0e/server%20components%201/por-un-demonio-lo-que-faltaba-drake-y-josh.gif',
    },
  },
} satisfies Record<string, PolaroidImageManifestEntry>;
