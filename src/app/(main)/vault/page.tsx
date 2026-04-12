import React from 'react';
import { vaultData } from '@/data/vault-data';
import { VaultStorySection } from '@/components/views/vault/VaultStorySection';
import { VaultProjectGrid } from '@/components/views/vault/VaultProjectGrid';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';

const VAULT_TITLE = 'Design Vault';
const VAULT_DESCRIPTION =
  'Browse legacy design work from Juan Martinez, including Figma projects, prototypes, wireframes, and shipped ideas from earlier freelance work.';

export const metadata = buildPageMetadata({
  title: VAULT_TITLE,
  description: VAULT_DESCRIPTION,
  path: '/vault',
  keywords: [
    'design portfolio',
    'Figma portfolio',
    'UI design',
    'UX design',
    'wireframes',
    'prototypes',
    'legacy work',
    'Juan Martinez',
    'designer portfolio',
  ],
});

export const dynamic = 'force-static';

export default function VaultPage() {
  const { story, projects } = vaultData;
  const pageSchema = generateWebPageSchema({
    title: VAULT_TITLE,
    description: VAULT_DESCRIPTION,
    path: '/vault',
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Vault', url: absoluteUrl('/vault') },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <PageHeader title="The Vault" />
      <VaultStorySection story={story} />
      <VaultProjectGrid projects={projects} />
    </>
  );
}
