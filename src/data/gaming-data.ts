import { Post } from '@/types/post';
import { GalleryPhotoItem } from '@/types';

export interface Game {
  title: string;
  cover: string;
  platform: string;
  status?: 'playing' | 'backlog' | 'completed';
  notes?: string;
}

export interface PCPart {
  component: string;
  name: string;
  notes?: string;
}

export interface Console {
  name: string;
  image: string;
  story: string;
}

export const currentGame: Game = {
  title: 'Pokémon Legends: ZA',
  cover: '/current-game.png',
  platform: 'Nintendo Switch',
  status: 'playing',
  notes:
    'I took the risk buying it day one. Best decision ever! I finished the story already but really want to complete the post game and get the shiny charm.',
};

export const gameBacklog: Game[] = [
  {
    title: "Ghost of Tsushima: Director's Cut",
    cover: '/got-cover.png',
    platform: 'PS5',
    status: 'backlog',
  },
];

export const pcBuild: PCPart[] = [
  {
    component: 'CPU',
    name: 'Intel Core i7 13700',
    notes: '16 Core, 30MB Cache, 2.10GHz',
  },
  {
    component: 'GPU',
    name: 'NVIDIA RTX 4060 Ti | MSI Gaming X',
    notes: '8GB GDDR6. It works well in ultrawide resolution.',
  },
  {
    component: 'RAM',
    name: 'Corsair Vengance 32GB DDR5 6000MHz',
    notes: 'RGB off, performance on',
  },
  {
    component: 'Motherboard',
    name: 'MSI MAG B760 Tomahawk WiFi',
    notes: 'LGA 1700, DDR5, PCIe 5.0',
  },
  {
    component: 'Main Storage',
    name: 'Samsung 970 EVO Plus 1TB NVMe',
    notes: 'OS + Last gen games',
  },
  {
    component: 'Secondary Storage',
    name: 'Kingston NV3 1TB NVMe',
    notes: 'Game library overflow',
  },
  {
    component: 'PSU',
    name: 'Corsair RM850x Gold',
    notes: '850W 80+ Gold. A premium PSU for a premium PC',
  },
  {
    component: 'Case',
    name: 'NZXT H6 Flow Black',
    notes:
      "Honestly the best case I've had so far. Excellent air flow if you fill all fan spaces. This rig never gets hot since I bought it.",
  },
  {
    component: 'CPU Cooling',
    name: 'AIO Corsair H115i 280mm',
  },
  {
    component: 'Front Fans',
    name: '3 x NZXT F120mm RGB Core',
    notes: 'Those came within the case',
  },
  {
    component: 'Up & Bottom Fans',
    name: '4 x Corsair LL140mm RGB',
  },
  {
    component: 'Back Fan',
    name: '1 x Corsair LL120mm RGB',
  },
];

export const pcBuildStory =
  'I built my first PC in late 2020 after landing my first full-time dev job. Since then, I’ve upgraded it twice and ended up with this absolute unit… which I barely use. I’m mostly a console-on-the-couch kind of gamer, so this rig has officially reached its final form. It runs anything at solid 1080p, and honestly, that’s all I need for a chill gaming session.';

export const consoles: Console[] = [
  {
    name: 'PlayStation 5',
    image: '/placeholder.svg',
    story:
      "Although it's the first version, it is really powerful. I use it mostly for exclusives, but I do really love this console that I even bought the same games as in the PC just to play them in the couch lol.",
  },
  {
    name: 'Nintendo Switch OLED',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/switch.webp',
    story:
      "Originally I had the standard Switch, but then Tears of The Kingdom came out and I HAD to get the Zelda version, it's just beautiful. The OLED screen upgrade was absolutely worth it.",
  },
  {
    name: 'Nintendo 2DS',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds-2.webp',
    story:
      "Long time ago I had a 2DS just like this one, but someone stole it from me. So nostalgia hit hard and I bought a refurbished one and came in excellent condition! it's the definitive console to play every old Pokémon games.",
  },
];

export const gamingPhotos: GalleryPhotoItem[] = [
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/pc.webp',
    alt: 'Custom PC Build',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds.webp',
    alt: 'Nintendo 2DS Close Up',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/ac-shadows.webp',
    alt: 'Gaming Setup View',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/controllers.webp',
    alt: 'Controllers',
  },
];

export const gamingBlogPosts: Post[] = [
  {
    title: "Why Elden Ring's Open World Actually Works",
    slug: 'elden-ring-open-world',
    description:
      'Most open worlds feel like checklists. FromSoftware found a different approach by trusting players to explore without hand-holding.',
    createdAt: '2024-11-15',
    tags: ['gaming', 'review', 'open-world'],
    coverImage: '/placeholder.svg',
    id: 0,
    publishedAt: '',
    originalPostUrl: null,
    content: '',
    status: 'DRAFT',
    authorId: 0,
    author: {
      name: null,
      profilePicture: null,
    },
    views: 0,
    updatedAt: '',
  },
];
