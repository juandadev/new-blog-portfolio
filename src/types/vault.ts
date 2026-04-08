export enum VaultProjectCategory {
  web_app = 'web_app',
  mobile_app = 'mobile_app',
  landing_page = 'landing_page',
  dashboard = 'dashboard',
  ui_components = 'ui_components',
  branding = 'branding',
  other = 'other',
}

export interface VaultProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  figmaUrl: string;
  category: VaultProjectCategory;
  year: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface VaultStory {
  id: string;
  headline: string;
  intro: string;
  updatedAt: string;
}

export interface VaultData {
  story: VaultStory | null;
  projects: VaultProject[];
}
