export enum GameStatus {
  PLAYING = 'PLAYING',
  BACKLOG = 'BACKLOG',
}

export interface Game {
  title: string;
  cover: string;
  stickerImage?: string;
  platform: string;
  status: GameStatus;
  isCurrent: boolean;
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

export interface GamingPhoto {
  src: string;
  alt: string;
}

export interface GamingData {
  currentGame: Game | null;
  gameBacklog: Game[];
  pcBuild: PCPart[];
  pcBuildStory: string;
  consoles: Console[];
  gamingPhotos: GamingPhoto[];
}
