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
  title: string;
  description: string;
  thumbnail: string;
  figmaUrl: string;
  category: VaultProjectCategory;
  year: string;
  featured: boolean;
}

export interface VaultStory {
  headline: string;
  intro: string;
}

export interface VaultData {
  story: VaultStory | null;
  projects: VaultProject[];
}
