import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', //  ⁄ÿÌ· «· ’œÌ— «·À«»  ··”„«Õ »‹ API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
