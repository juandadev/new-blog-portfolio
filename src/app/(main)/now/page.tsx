import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
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

const nowFile = path.join(process.cwd(), 'src/content/now.mdx');

function readNowFile() {
  const raw = fs.readFileSync(nowFile, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data as NowFrontmatter, content };
}

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = readNowFile();

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
  const { frontmatter, content } = readNowFile();

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
      <MarkdownRenderer content={content} />
    </>
  );
}
