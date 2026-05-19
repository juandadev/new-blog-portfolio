export type PolaroidPlaceholderEffect = 'blur' | 'pixelate';

export interface PolaroidImageVariant {
  height: number;
  src: string;
  width: number;
}

export interface PolaroidImageManifestEntry {
  alt: string;
  aspectRatio?: string;
  blurDataURL: string;
  expanded?: PolaroidImageVariant;
  placeholderEffect?: PolaroidPlaceholderEffect;
  preview: PolaroidImageVariant;
}
