import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 12;

function createPrisma(): PrismaClient {
  return new PrismaClient();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function promptHidden(question: string): Promise<string> {
  if (process.stdin.isTTY) {
    process.stdout.write(question);
    return new Promise((resolve, reject) => {
      input.setRawMode?.(true);
      input.resume();
      input.setEncoding('utf8');
      let value = '';
      const onData = (char: string): void => {
        if (char === '\n' || char === '\r' || char === '\u0004') {
          input.setRawMode?.(false);
          input.pause();
          input.removeListener('data', onData);
          process.stdout.write('\n');
          resolve(value);
          return;
        }
        if (char === '\u0003') {
          reject(new Error('Cancelled'));
          return;
        }
        if (char === '\u007f') {
          value = value.slice(0, -1);
          return;
        }
        value += char;
      };
      input.on('data', onData);
    });
  }

  const rl = readline.createInterface({ input, output });
  try {
    return await rl.question(question);
  } finally {
    rl.close();
  }
}

async function main(): Promise<void> {
  const prisma = createPrisma();
  const rl = readline.createInterface({ input, output });

  try {
    const rawEmail = await rl.question('Admin email: ');
    const email = rawEmail.trim().toLowerCase();
    if (!isValidEmail(email)) {
      console.error('Invalid email format.');
      process.exitCode = 1;
      return;
    }

    const password = await promptHidden('Admin password (min 12 chars): ');
    if (password.length < MIN_PASSWORD_LENGTH) {
      console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      process.exitCode = 1;
      return;
    }

    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      console.error(`Admin user already exists for ${email}.`);
      process.exitCode = 1;
      return;
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await prisma.adminUser.create({
      data: { email, passwordHash },
    });

    console.log(`Admin user created for ${email}.`);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('Failed to create admin:', error);
  process.exitCode = 1;
});
