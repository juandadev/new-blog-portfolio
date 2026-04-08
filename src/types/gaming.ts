export enum GameStatus {
  PLAYING = 'PLAYING',
  BACKLOG = 'BACKLOG',
  COMPLETED = 'COMPLETED',
}

export interface Game {
  id: string;
  title: string;
  cover: string;
  platform: string;
  status: GameStatus;
  isCurrent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PCPart {
  id: string;
  component: string;
  name: string;
  notes?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PCBuildStory {
  id: string;
  story: string;
  updatedAt: string;
}

export interface Console {
  id: string;
  name: string;
  image: string;
  story: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GamingPhoto {
  id: string;
  src: string;
  alt: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GamingData {
  currentGame: Game | null;
  gameBacklog: Game[];
  pcBuild: PCPart[];
  pcBuildStory: PCBuildStory | null;
  consoles: Console[];
  gamingPhotos: GamingPhoto[];
}
