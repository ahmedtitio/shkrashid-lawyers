import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // ����� ������� ������ ������ �� API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
