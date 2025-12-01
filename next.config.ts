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
    ],
  },
};

export default nextConfig;
