import { handlers } from '@/lib/auth';

// Node.js runtime (default). bcryptjs and @neondatabase/serverless + ws require Node — do NOT set runtime = 'edge'.
export const { GET, POST } = handlers;
