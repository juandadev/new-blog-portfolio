import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
  experimental: {
    turbo: {
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
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
