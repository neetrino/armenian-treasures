import { CredentialsSignin } from 'next-auth';
import type { LoginDebugPayload } from './login-debug';

/** TEMPORARY: surfaced to loginAction via Auth.js CredentialsSignin.code */
export class LoginCredentialsSignin extends CredentialsSignin {
  readonly debug: LoginDebugPayload;

  constructor(debug: LoginDebugPayload) {
    super(debug.details);
    this.debug = debug;
    this.code = debug.error;
  }
}
