/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  experimental: {},
  output: "standalone", // ✅ IMPORTANT for Vercel Tailwind build
};

export default nextConfig;
