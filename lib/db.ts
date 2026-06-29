import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function normaliseNeonUrl(raw: string): string {
  // The Neon serverless Pool routes through a WebSocket proxy and does not
  // support the libpq `channel_binding` flag that `psql`/Prisma migrate accept.
  // Stripping it keeps the same credentials usable for both contexts.
  try {
    const url = new URL(raw);
    url.searchParams.delete('channel_binding');
    return url.toString();
  } catch {
    return raw;
  }
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Copy .env.example to .env.local and paste your Neon pooled connection string.',
    );
  }
  const pool = new Pool({ connectionString: normaliseNeonUrl(connectionString) });
  const adapter = new PrismaNeon(pool);
  const client = new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
  });

  client.$on('error', (event) => {
    console.error('[prisma:error]', event.message);
  });
  client.$on('warn', (event) => {
    console.warn('[prisma:warn]', event.message);
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
