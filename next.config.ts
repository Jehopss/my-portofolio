import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/my-portofolio",
  assetPrefix: "/my-portofolio/",
};

export default nextConfig;
