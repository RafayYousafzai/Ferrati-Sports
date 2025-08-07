/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ferratisports.com/**"),
      new URL("https://heroui.com/**"),
    ],
  },
};

module.exports = nextConfig;
