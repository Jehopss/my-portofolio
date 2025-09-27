/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/my-portofolio" : "",
  assetPrefix: isProd ? "/my-portofolio/" : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
