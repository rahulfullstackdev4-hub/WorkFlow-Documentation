import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma configuration for Vercel deployment
  serverExternalPackages: ['@prisma/client', 'prisma'],
  outputFileTracingRoot: __dirname,

  // Build optimizations for Vercel
  experimental: {
    // Enable static optimization for better performance
    optimizePackageImports: ['@clerk/nextjs', '@radix-ui/react-dropdown-menu'],
  },

  // Enable SWC minification for better build performance
  swcMinify: true,

  // Optimize images
  images: {
    domains: ['localhost'],
    // Add any external image domains if needed
  },

  // Environment variable validation
  env: {
    // Ensure required environment variables are present
    DATABASE_URL: process.env.DATABASE_URL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

export default nextConfig;
