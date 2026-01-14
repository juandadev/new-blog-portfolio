import React from 'react';
import { ImageResponse } from 'next/og';
import { OG_DESIGN, PAGE_SEO } from '@/constants/seo';
import { loadSpaceGroteskFont, getProfileImageAsBase64 } from '@/lib/og-utils';

export const alt = 'Juan Martinez - Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const spaceGrotesk = await loadSpaceGroteskFont();
  const { title, description } = PAGE_SEO.home;

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
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            juanda.dev
          </span>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: OG_DESIGN.headingColor,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: OG_DESIGN.textColor,
              lineHeight: 1.4,
            }}
          >
            {description}
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
            width={280}
            height={280}
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
