// Ini buat deployment
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  // Static export can't use the image optimizer; GitHub Pages serves images as-is.
  images: { unoptimized: true },
}

module.exports = nextConfig;


// Ini buat dev
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;