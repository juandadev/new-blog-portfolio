import React from 'react';
import { Metadata } from 'next';
import NowContent, { metadata as nowMetadata } from '@/content/now.mdx';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import {
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from '@/lib/structured-data';
import { SITE_CONFIG } from '@/constants/seo';
import { getFormattedDate } from '@/lib/utils';
import { buildPageMetadata } from '@/lib/seo';

interface NowFrontmatter {
  title: string;
  description: string;
  lastUpdated: string;
  headerText?: string;
  keywords?: string[];
}

const frontmatter = nowMetadata as unknown as NowFrontmatter;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: '/now',
    keywords: [
      ...(frontmatter.keywords ?? []),
      'Juandadev',
      'personal site',
      'now page',
    ],
  });
}

export const dynamic = 'force-static';

export default async function NowPage() {
  const formattedDate = getFormattedDate(
    frontmatter.lastUpdated,
    'MMMM d, yyyy'
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Now', url: `${SITE_CONFIG.url}/now` },
  ]);
  const pageSchema = generateWebPageSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    path: '/now',
  });

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <PageHeader title={frontmatter.title} text={frontmatter.headerText} />
      <span className="text-muted-foreground text-sm">
        Last updated: {formattedDate}
      </span>
      <div className="[&>*:first-child]:mt-5">
        <NowContent />
      </div>
    </>
  );
}
