import { readFileSync } from 'fs';
import { join } from 'path';
import { OG_DESIGN, SITE_CONFIG } from '@/constants/seo';

export async function loadSpaceGroteskFont(): Promise<ArrayBuffer> {
  const fontPath = join(
    process.cwd(),
    'src/assets/fonts/SpaceGrotesk-Bold.woff'
  );
  const fontBuffer = readFileSync(fontPath);
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength
  );
}

export function getProfileImageAsBase64(): string {
  const imagePath = join(process.cwd(), 'public/android-chrome-512x512.png');
  const imageBuffer = readFileSync(imagePath);
  const base64 = imageBuffer.toString('base64');
  return `data:image/png;base64,${base64}`;
}

export { OG_DESIGN, SITE_CONFIG };
