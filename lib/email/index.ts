export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  skipped: boolean;
}

/**
 * Sends transactional email when a provider is configured.
 * TODO: wire Resend or SES — set EMAIL_PROVIDER and provider credentials in env.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const provider = process.env.EMAIL_PROVIDER?.trim();
  if (!provider) {
    return { ok: true, skipped: true };
  }

  // TODO: implement provider adapters (resend | ses) once approved.
  console.info('[email] skipped — provider not implemented', {
    provider,
    subject: input.subject,
    to: input.to,
  });
  return { ok: false, skipped: true };
}

export function getFoundationInbox(): string | null {
  return process.env.FOUNDATION_INBOX?.trim() || null;
}
