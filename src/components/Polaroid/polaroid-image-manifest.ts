export type PolaroidPlaceholderEffect = 'blur' | 'pixelate';

export interface PolaroidImageManifestEntry {
  alt: string;
  blurDataURL: string;
  height: number;
  placeholderEffect?: PolaroidPlaceholderEffect;
  width: number;
  expandedHeight?: number;
  expandedWidth?: number;
}

export const polaroidImageManifest = {
  '/juan.webp': {
    alt: 'Portrait of Juan Martinez smiling at the camera.',
    blurDataURL:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyNyIgZmlsbD0ibm9uZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMiIgeTE9IjIiIHgyPSIxOCIgeTI9IjI1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0E4ODA2RCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzRDMzQyRiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyNyIgcng9IjIiIGZpbGw9InVybCgjYSkiLz48Y2lyY2xlIGN4PSIxMC4yIiBjeT0iOC4xIiByPSI0LjYiIGZpbGw9IiNFOUM4QjgiIGZpbGwtb3BhY2l0eT0iLjYyIi8+PHBhdGggZmlsbD0iIzJFMUYxQyIgZmlsbC1vcGFjaXR5PSIuNzgiIGQ9Ik0zLjIgMjQuOGMuOC01IDQuMS04IDctOHM2LjIgMyA3IDh6Ii8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjI3IiByeD0iMiIgZmlsbD0iI0YyRTdFMSIgZmlsbC1vcGFjaXR5PSIuMDYiLz48L3N2Zz4=',
    height: 1333,
    expandedHeight: 1333,
    expandedWidth: 1000,
    placeholderEffect: 'blur',
    width: 1000,
  },
} satisfies Record<string, PolaroidImageManifestEntry>;

export type PolaroidImageManifestKey = keyof typeof polaroidImageManifest;
