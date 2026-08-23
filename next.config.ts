import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  optimization: {
    minimize: false
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
