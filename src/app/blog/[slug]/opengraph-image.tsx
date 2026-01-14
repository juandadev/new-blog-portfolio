import React from 'react';
import { ImageResponse } from 'next/og';
import { OG_DESIGN } from '@/constants/seo';
import { loadSpaceGroteskFont, getProfileImageAsBase64 } from '@/lib/og-utils';
import { prisma } from '@/lib/prisma';

export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spaceGrotesk = await loadSpaceGroteskFont();

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      coverImage: true,
    },
  });

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: OG_DESIGN.background,
            fontFamily: 'Space Grotesk',
          }}
        >
          <h1 style={{ color: OG_DESIGN.headingColor, fontSize: 48 }}>
            Post Not Found
          </h1>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'Space Grotesk',
            data: spaceGrotesk,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  }

  const cleanTitle = post.title
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
    .trim();

  const truncatedDescription =
    post.description.length > 120
      ? post.description.slice(0, 120) + '...'
      : post.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: OG_DESIGN.background,
          padding: '60px',
          fontFamily: 'Space Grotesk',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingRight: '40px',
          }}
        >
          <span
            style={{
              color: OG_DESIGN.accentColor,
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            juanda.dev/blog
          </span>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: OG_DESIGN.headingColor,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {cleanTitle}
          </h1>
          <p
            style={{
              fontSize: 24,
              color: OG_DESIGN.textColor,
              lineHeight: 1.4,
            }}
          >
            {truncatedDescription}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`${getProfileImageAsBase64()}`}
            width={240}
            height={240}
            alt=""
            style={{
              borderRadius: '16px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Space Grotesk',
          data: spaceGrotesk,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
