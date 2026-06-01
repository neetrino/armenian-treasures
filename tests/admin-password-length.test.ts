import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function readScript(name: string): string {
  return readFileSync(resolve(process.cwd(), 'scripts', name), 'utf8');
}

describe('admin CLI password minimum length', () => {
  it('create-admin.ts requires at least 8 characters', () => {
    const source = readScript('create-admin.ts');
    expect(source).toContain('const MIN_PASSWORD_LENGTH = 8;');
    expect(source).not.toContain('const MIN_PASSWORD_LENGTH = 12;');
    expect(source).toContain('Admin password (min 8 chars)');
  });

  it('change-admin-password.ts requires at least 8 characters', () => {
    const source = readScript('change-admin-password.ts');
    expect(source).toContain('const MIN_PASSWORD_LENGTH = 8;');
    expect(source).not.toContain('const MIN_PASSWORD_LENGTH = 12;');
    expect(source).toContain('New password (min 8 chars)');
  });
});

describe('admin login schema password minimum length', () => {
  it('allows passwords with 8+ characters', async () => {
    const { adminLoginSchema } = await import('@/lib/validation/admin');
    const result = adminLoginSchema.safeParse({
      email: 'admin@example.com',
      password: '12345678',
    });
    expect(result.success).toBe(true);
  });

  it('rejects passwords shorter than 8 characters', async () => {
    const { adminLoginSchema } = await import('@/lib/validation/admin');
    const result = adminLoginSchema.safeParse({
      email: 'admin@example.com',
      password: '1234567',
    });
    expect(result.success).toBe(false);
  });
});
