/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@prisma/adapter-neon',
      '@neondatabase/serverless',
      'ws',
      'bcryptjs',
    ],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === 'nodejs') {
      const external = ({ request }, callback) => {
        if (
          request === '@neondatabase/serverless' ||
          request === '@prisma/adapter-neon' ||
          request === '@prisma/client' ||
          request === 'bcryptjs' ||
          request === 'ws'
        ) {
          return callback(null, `commonjs ${request}`);
        }
        return callback();
      };
      const existing = Array.isArray(config.externals) ? config.externals : [config.externals];
      config.externals = [external, ...existing];
    }
    return config;
  },
};

export default nextConfig;
