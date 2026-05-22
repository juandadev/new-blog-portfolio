import type { PolaroidImageManifestEntry } from '@/components/Polaroid/types';

export const setupPolaroidImages = {
  desk_1: {
    alt: 'Desk picture 1',
    blurDataURL:
      'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAwCdASoVABAAP83W4ma/tK6nsAgD8DmJbF2cBQ39k+ZAAP7Yc+rkt5Shkk+agkGahv01wj8fDE4VcDYfP/C1am/rMDiT+kN8o37aHcJ/c1ji+LBfFgven3AAAA==',
    expanded: {
      width: 667,
      height: 500,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-close-highres-1779425317228.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 267,
      height: 200,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-close-standard-1779425317228.webp',
    },
  },
  desk_keyboard_1: {
    alt: 'Desk keyboard 1',
    blurDataURL:
      'data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAwCdASoVABAAP83Y5Gc/tS8nsAgD8DmJY1nyhwAA/0QAAPmmkCSDb3C71zsHR3im3Jsas9KLL/J2oizBqBh4uHWVL6V9OZDPu4ON5xvOOVgAAAA=',
    expanded: {
      width: 667,
      height: 500,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/keyboard-highres-1779425377382.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 267,
      height: 200,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/keyboard-standard-1779425377382.webp',
    },
  },
  desk_2: {
    alt: 'Desk picture 2',
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAABQAQCdASoMABAADMDOJZQABHQAAP7SfO+NfFSZjWUE1hSNDGCEqHe4CKIlWEAA',
    expanded: {
      width: 375,
      height: 500,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-full-view-highres-1779425420771.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 150,
      height: 200,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-full-view-standard-1779425420771.webp',
    },
  },
  custom_pc_1: {
    alt: 'Custom PC Build 1',
    blurDataURL:
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAABQAQCdASoMABAADMDOJbAABHQAAP7nxA8VqY4LXAIawWSAji9r/nateVyjoEAA',
    expanded: {
      width: 375,
      height: 500,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/pc-highres-1779425452009.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 150,
      height: 200,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/pc-standard-1779425452009.webp',
    },
  },
  desk_3: {
    alt: 'Desk picture 3',
    blurDataURL:
      'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABQAwCdASoVABAAP83c52Y/t7EnMAgD8DmJS7OLR4AowBqygAD+g+0R/7escQd/DWtAodFG9j18To9kYFdWkdHexY6YMr3wkKBvWp/fqJ/R/Yq94rqOlH8uTx/wuZJQrhEsSNOYX2shvRmIJB6pY4wA',
    expanded: {
      width: 667,
      height: 500,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-close-day-highres-1779425479642.webp',
    },
    placeholderEffect: 'blur',
    preview: {
      width: 267,
      height: 200,
      src: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/desk-close-day-standard-1779425479642.webp',
    },
  },
} satisfies Record<string, PolaroidImageManifestEntry>;
