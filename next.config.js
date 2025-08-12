/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://km-intelligence-backend.vercel.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
