import nextMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {},
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'mdx'], // ADD THIS
};

export default withMDX(nextConfig);