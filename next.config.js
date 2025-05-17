/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in development to prevent file system issues
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig