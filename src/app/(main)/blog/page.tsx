import React from 'react';
import PostList from '@/components/PostList/PostList';
import PageHeader from '@/components/views/page-header';
import { JsonLd } from '@/components/JsonLd';
import { getAllPosts } from '@/lib/posts';
import { buildPageMetadata, absoluteUrl } from '@/lib/seo';
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from '@/lib/structured-data';

const BLOG_TITLE = 'Web Development Articles & Tutorials';
const BLOG_DESCRIPTION =
  'Read technical articles about React, Next.js, TypeScript, frontend architecture, and practical lessons from real projects.';

export const metadata = buildPageMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: '/blog',
  keywords: [
    'web development blog',
    'react tutorials',
    'next.js articles',
    'typeScript articles',
    'frontend engineering',
    'developer blog',
    'Juandadev blog',
  ],
});

export const dynamic = 'force-static';

export default function BlogPage() {
  const posts = getAllPosts();
  const blogSchema = generateCollectionPageSchema({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    path: '/blog',
    items: posts.map((post) => ({
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      description: post.description,
    })),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Blog', url: absoluteUrl('/blog') },
  ]);

  return (
    <>
      <JsonLd data={[blogSchema, breadcrumbSchema]} />
      <PageHeader
        title="Blog"
        text="Here lies my brain dump. All those messy ideas pinned down and
          organized (I try)"
      />
      <PostList posts={posts} />
    </>
  );
}
