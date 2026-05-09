import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/juandadev/assets-blog/**',
      },
      {
        protocol: 'https',
        hostname: 'o9odtcpgjcjy0yrm.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'image.api.playstation.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.glb': {
        loaders: ['file-loader'],
        as: '*.glb',
      },
      '*.gltf': {
        loaders: ['file-loader'],
        as: '*.gltf',
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
