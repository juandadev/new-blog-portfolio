import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';
import { defaultPolaroidBlurDataURL } from '../shared';

const nintendoSwitchImage = (
  alt: string,
  src: string
): PolaroidImageManifestEntry => ({
  alt,
  blurDataURL: defaultPolaroidBlurDataURL,
  preview: {
    width: 800,
    height: 450,
    src,
  },
});

export const nintendoSwitchPolaroidImages = {
  nintendoSwitch: nintendoSwitchImage(
    'Nintendo Switch',
    'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch.webp'
  ),
  nintendoSwitchObjects: nintendoSwitchImage(
    'Nintendo Switch instances',
    'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-objects.webp'
  ),
  nintendoSwitchPro: nintendoSwitchImage(
    'Nintendo Switch PRO',
    'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-pro.webp'
  ),
  nintendoSwitchInheritance: nintendoSwitchImage(
    'Father/children hierachy diagram',
    'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/oop-nintendo-switch/nintendo-switch-inheritance.webp'
  ),
} satisfies Record<string, PolaroidImageManifestEntry>;
