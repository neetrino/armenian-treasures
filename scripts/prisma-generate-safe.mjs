import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 1500;

const CLIENT_ENGINE_PATH =
  "node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client/query_engine-windows.dll.node";

const runGenerate = () =>
  new Promise((resolve) => {
    const child = spawn("pnpm", ["exec", "prisma", "generate"], {
      shell: true,
    });

    let output = "";
    child.stdout.on("data", (data) => {
      process.stdout.write(data);
      output += data.toString();
    });
    child.stderr.on("data", (data) => {
      process.stderr.write(data);
      output += data.toString();
    });
    child.on("close", (code) => resolve({ code: code ?? 1, output }));
  });

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  const { code: exitCode, output } = await runGenerate();
  if (exitCode === 0) {
    process.exit(0);
  }

  const hasLockedEngineError = output.includes(
    "EPERM: operation not permitted, rename"
  );
  if (hasLockedEngineError && existsSync(CLIENT_ENGINE_PATH)) {
    console.warn(
      "[prisma-generate-safe] Prisma engine file is locked by another process; using existing generated client."
    );
    process.exit(0);
  }

  if (attempt === MAX_ATTEMPTS) {
    process.exit(exitCode);
  }

  console.warn(
    `[prisma-generate-safe] prisma generate failed (attempt ${attempt}/${MAX_ATTEMPTS}). Retrying in ${RETRY_DELAY_MS}ms...`
  );
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
}
