import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker deployment
  // i18n configuration removed - App Router uses different approach
  // For i18n in App Router, use middleware or route segments
};

export default nextConfig;
