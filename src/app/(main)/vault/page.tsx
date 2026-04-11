import React from 'react';
import { Metadata } from 'next';
import { vaultData } from '@/data/vault-data';
import { VaultStorySection } from '@/components/views/vault/VaultStorySection';
import { VaultProjectGrid } from '@/components/views/vault/VaultProjectGrid';
import PageHeader from '@/components/views/page-header';

export const metadata: Metadata = {
  title: 'The Vault',
  description:
    'Legacy design work from my Figma days. Production projects, cancelled ideas, wireframes, and prototypes from my freelancer and designer era.',
  keywords: [
    'design',
    'figma',
    'ui design',
    'ux design',
    'wireframes',
    'prototypes',
    'legacy work',
    'freelancer',
    'Juan Martinez',
    'designer',
  ],
  alternates: {
    canonical: 'https://juanda.dev/vault',
  },
  openGraph: {
    title: 'The Vault – Juan Martinez',
    description:
      'Legacy design work from my Figma days. Production projects, cancelled ideas, wireframes, and prototypes from my freelancer and designer era.',
    url: 'https://juanda.dev/vault',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Vault – Juan Martinez',
    description:
      'Legacy design work from my Figma days. Production projects, cancelled ideas, wireframes, and prototypes from my freelancer and designer era.',
    creator: '@juandadotdev',
  },
};

export const dynamic = 'force-static';

export default function VaultPage() {
  const { story, projects } = vaultData;

  return (
    <>
      <PageHeader title="The Vault" />
      <VaultStorySection story={story} />
      <VaultProjectGrid projects={projects} />
    </>
  );
}
