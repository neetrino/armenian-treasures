/** @type {import('next').NextConfig} */
function buildR2RemotePatterns() {
  const patterns = [
    { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
    { protocol: 'https', hostname: '**.r2.dev' },
    { protocol: 'http', hostname: 'localhost' },
  ];

  for (const envKey of ['R2_PUBLIC_URL', 'NEXT_PUBLIC_R2_PUBLIC_URL']) {
    const raw = process.env[envKey];
    if (!raw) continue;
    try {
      const { protocol, hostname } = new URL(raw);
      if (hostname && !patterns.some((entry) => entry.hostname === hostname)) {
        patterns.push({
          protocol: protocol.replace(':', ''),
          hostname,
        });
      }
    } catch {
      // Ignore invalid URL values at build time.
    }
  }

  return patterns;
}

const nextConfig = {
  // Allow dev access via LAN IP (drag-and-drop, HMR, server actions on /admin/*).
  allowedDevOrigins: ['192.168.15.237'],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: buildR2RemotePatterns(),
  },
  outputFileTracingExcludes: {
    '*': ['next.config.mjs'],
  },
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-neon',
    '@neondatabase/serverless',
    'ws',
    'bcryptjs',
  ],
  turbopack: {},
};

export default nextConfig;
