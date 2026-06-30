import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/hash-password';

const GENERIC_ERROR = 'Invalid email or password' as const;

export type SafeMember = {
  id: string;
  email: string;
  name: string;
  surname: string;
  country: string;
  phone: string;
};

export type ValidateMemberCredentialsResult =
  | { success: true; member: SafeMember }
  | { success: false; error: typeof GENERIC_ERROR };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function validateMemberCredentials(
  email: string,
  password: string,
): Promise<ValidateMemberCredentialsResult> {
  const normalizedEmail = normalizeEmail(email);

  let member: Awaited<ReturnType<typeof prisma.member.findUnique>>;
  try {
    member = await prisma.member.findUnique({
      where: { email: normalizedEmail },
    });
  } catch {
    return { success: false, error: GENERIC_ERROR };
  }

  if (!member) {
    await verifyPassword(password, '$2a$12$invalidhashinvalidhashinvalidha');
    return { success: false, error: GENERIC_ERROR };
  }

  let passwordMatches = false;
  try {
    passwordMatches = await verifyPassword(password, member.passwordHash);
  } catch {
    return { success: false, error: GENERIC_ERROR };
  }

  if (!passwordMatches) {
    return { success: false, error: GENERIC_ERROR };
  }

  return {
    success: true,
    member: {
      id: member.id,
      email: member.email,
      name: member.name,
      surname: member.surname,
      country: member.country,
      phone: member.phone,
    },
  };
}
