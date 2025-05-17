/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.herokuapp.com',
      },
      {
        protocol: 'https',
        hostname: 'd3t32hsnjxo7q6.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jaxcosmeticdentist.com',
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;