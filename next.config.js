/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://ferratisports.com/**")],
  },
};

module.exports = nextConfig;
