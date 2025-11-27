import React from 'react';

export interface IconProps extends React.ComponentProps<'svg'> {
  size?: number;
  color?: string;
}

export type GalleryPhotoItem = { src: string; alt: string };

export interface NavItem {
  label: string;
  href: string;
  index: string;
}
