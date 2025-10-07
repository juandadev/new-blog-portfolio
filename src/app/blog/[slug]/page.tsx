import React from 'react';
import { fetchPost, fetchSlugs } from '@/services/post-server';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { getFormattedDate, getReadTime } from '@/lib/utils';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import Link from '@/components/ui/Link';
import Image from 'next/legacy/image';
import { Metadata } from 'next';
import { TrackPostView } from '@/components/TrackPostView/TrackPostView';
import { Callout } from '@/components/ui/Callout';
import { ArrowLeftIcon } from 'lucide-react';
import PixelBlast from '@/components/backgrounds/PixelBlast/PixelBlast';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return {
    title: `${post.title.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()} – Juandadev`,
    description: post.description,
    keywords: post.tags ?? [],
    alternates: {
      canonical: post.originalPostUrl || `https://juanda.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
        .trim(),
      description: post.description,
      type: 'article',
      url: `https://juanda.dev/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [`https://juanda.dev/about`],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: `Imagen de portada para ${post.title.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim()}`,
            },
          ]
        : [],
      siteName: 'Juanda.dev',
      locale: 'es_MX',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
        .trim(),
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
      creator: '@juandadotdev',
    },
  };
}

export const revalidate = 43200; // 12 hours
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = (await fetchSlugs()) || [];

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound();
  }

  const formattedDate = getFormattedDate(post.publishedAt, 'MMMM d, yyyy');
  const readTime = getReadTime(post.content);

  return (
    // TODO: Add a button for going back to the top
    // TODO: Add sugestions for other posts
    // TODO: Add a comments section
    // TODO: Collect post views (and maybe likes?) and add them to the post metadata
    <div className="flex flex-col gap-8">
      <div className="absolute top-0 left-0 -z-1 h-full w-full">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#F6339A"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground bg-background inline-flex h-10 w-fit items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors"
      >
        <ArrowLeftIcon />
        Back to Blog
      </Link>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {post.tags.map((tag) => (
          <span
            key={`tag-${tag}-for-${post.slug}`}
            className="text-primary rounded bg-[#2E0018] px-3 py-1 text-sm"
          >
            {tag}
          </span>
        ))}
        <span className="text-muted-foreground bg-background rounded-md p-1 text-sm">
          {formattedDate}
        </span>
        <span className="text-muted-foreground bg-background rounded-md p-1 text-sm">
          •
        </span>
        <span className="text-muted-foreground bg-background rounded-md p-1 text-sm">
          {readTime} min read
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <TrackPostView slug={slug} />
        <Heading
          level={1}
          className="mb-6 text-4xl font-bold text-balance md:text-6xl"
        >
          {post.title}
        </Heading>
        <Typography className="text-muted-foreground bg-background mb-8 rounded-md px-2 py-1 text-xl leading-relaxed text-pretty">
          {post.description}
        </Typography>
        {post.coverImage && (
          <div className="border-border relative mb-10 aspect-[2/1] w-full self-center overflow-hidden rounded-lg border md:w-[80%]">
            <Image
              src={post.coverImage}
              alt="Imagen de portada del post"
              layout="fill"
              className="object-cover"
              priority
            />
          </div>
        )}
        {post.originalPostUrl && (
          <Typography preset={8}>
            Post original:{' '}
            <Link
              className="text-preset-8-italic underline hover:text-current/70"
              href={post.originalPostUrl}
            >
              {post.originalPostUrl}
            </Link>
          </Typography>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <MarkdownRenderer content={post.content} />
        <Callout variant="info" heading="Newsletter Activo!">
          <Typography>
            Si te gustó este post, considera suscribirte a mi newsletter para
            recibir notificaciones de nuevos posts y contenido exclusivo.
          </Typography>
          <Typography>
            Puedes hacerlo en la sección de{' '}
            <Link href="/newsletter" className="hyperlink">
              Newsletter
            </Link>
            .
          </Typography>
        </Callout>
      </div>
    </div>
  );
}
