import React from 'react';
import { getPostBySlug, getAllSlugs } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { getFormattedDate, getReadTime, truncateText } from '@/lib/utils';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import Link from '@/components/ui/Link';
import { Metadata } from 'next';
import { ArrowLeftIcon, HouseIcon } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/structured-data';
import { SITE_CONFIG } from '@/constants/seo';
import { Separator } from '@/components/ui/Separator';
import { BlogSideDrawingsToggle } from '@/components/BlogSideDrawingsToggle';
import { absoluteUrl, getDefaultOgImageUrl, sanitizeTitle } from '@/lib/seo';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post not found' };
  }

  const cleanTitle = sanitizeTitle(post.title);
  const truncatedDescription = truncateText(post.description, 120);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const ogImageUrl = getDefaultOgImageUrl();

  return {
    title: cleanTitle,
    description:
      truncatedDescription ||
      `Read ${cleanTitle}, an article from Juandadev exploring web development, React, and Next.js topics.`,
    keywords: [
      cleanTitle,
      ...(post.tags ?? []),
      'web development article',
      'frontend tutorial',
      'React guide',
      'Next.js blog post',
      'Juandadev',
    ],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: cleanTitle,
      description: truncatedDescription,
      type: 'article',
      url: articleUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.lastModified,
      authors: [SITE_CONFIG.author.name],
      tags: post.tags,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${cleanTitle} | ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: truncatedDescription,
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
      images: [ogImageUrl],
    },
  };
}

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');
  const readTime = getReadTime(post.content);

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
    { name: post.title, url: `${SITE_CONFIG.url}/blog/${post.slug}` },
  ]);

  return (
    // TODO: Implement an image viewer for images inside the post content
    // TODO: Add a button for going back to the top
    // TODO: Add sugestions for other posts
    // TODO: Add a comments section
    // TODO: Collect post views (and maybe likes?) and add them to the post metadata
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <article>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="hover:text-primary text-muted-foreground font-script flex w-fit items-center gap-2 p-2 text-2xl transition-colors"
          >
            <ArrowLeftIcon />
            Back to Blog
          </Link>
          <BlogSideDrawingsToggle />
        </div>
        <header className="relative mb-6 flex flex-wrap items-center gap-4">
          {post.tags.map((tag) => (
            <span
              key={`tag-${tag}-for-${post.slug}`}
              className="text-primary bg-primary/20 rounded px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
          <span className="text-muted-foreground rounded-md text-sm">
            {formattedDate}
          </span>
          <span className="text-muted-foreground rounded-md text-sm">•</span>
          <span className="text-muted-foreground rounded-md text-sm">
            {readTime} min read
          </span>
          <Heading
            level={1}
            overrideClassName="text-4xl font-bold mb-2 text-balance"
          >
            {post.title}
          </Heading>
          {post.originalPostUrl && (
            <Typography overrideClassName="text-sm text-muted-foreground text-pretty leading-relaxed mb-6">
              Originally published at{' '}
              <Link
                className="text-primary underline-offset-4 transition-colors hover:underline"
                href={post.originalPostUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.originalPostUrl}
              </Link>
            </Typography>
          )}
          <Typography overrideClassName="text-muted-foreground text-pretty leading-relaxed">
            {post.description}
          </Typography>
        </header>
        <Separator />
        <MarkdownRenderer content={post.content} />
        <footer className="border-border flex flex-col justify-between gap-4 border-t pt-8 sm:flex-row">
          <Link
            href="/blog"
            className="hover:text-primary text-muted-foreground font-script flex items-center gap-2 p-2 text-2xl transition-colors"
          >
            <ArrowLeftIcon />
            Back to Blog
          </Link>
          <Link
            href="/"
            className="hover:text-primary text-muted-foreground font-script flex items-center gap-2 p-2 text-2xl transition-colors"
          >
            <HouseIcon />
            Home
          </Link>
        </footer>
      </article>
    </>
  );
}
