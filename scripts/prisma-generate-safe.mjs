import { spawn } from "node:child_process";
import { existsSync, cpSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 1500;
const SCHEMA_PATH = "prisma/schema.prisma";
const TEMP_SCHEMA_PATH = "prisma/schema.generate-tmp.prisma";
const TEMP_CLIENT_PATH = "node_modules/.prisma/client-gen-tmp";
const CLIENT_DIRS = [
  "node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/.prisma/client",
  "node_modules/.prisma/client",
];
const CLIENT_ENGINE_PATH = join(CLIENT_DIRS[0], "query_engine-windows.dll.node");

const runGenerate = (schemaPath) =>
  new Promise((resolve) => {
    const child = spawn("pnpm", ["exec", "prisma", "generate", "--schema", schemaPath], {
      shell: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      process.stdout.write(data);
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });

function copyGeneratedClientWithoutEngine() {
  for (const dest of CLIENT_DIRS) {
    cpSync(TEMP_CLIENT_PATH, dest, {
      recursive: true,
      filter: (source) => !source.endsWith(".node"),
    });
  }
}

function generateViaTempOutput() {
  const schema = readFileSync(SCHEMA_PATH, "utf8");
  const patched = schema.replace(
    /previewFeatures = \["driverAdapters"\]/,
    `previewFeatures = ["driverAdapters"]\n  output          = "../${TEMP_CLIENT_PATH}"`,
  );
  writeFileSync(TEMP_SCHEMA_PATH, patched);
  return runGenerate(TEMP_SCHEMA_PATH).finally(() => {
    rmSync(TEMP_SCHEMA_PATH, { force: true });
  });
}

const first = await runGenerate(SCHEMA_PATH);
if (first.code === 0) {
  process.exit(0);
}

const locked = `${first.stdout}${first.stderr}`.includes(
  "EPERM: operation not permitted, rename",
);
if (locked && existsSync(CLIENT_ENGINE_PATH)) {
  const temp = await generateViaTempOutput();
  if (temp.code === 0) {
    copyGeneratedClientWithoutEngine();
    rmSync(TEMP_CLIENT_PATH, { recursive: true, force: true });
    console.warn(
      "[prisma-generate-safe] Prisma engine is locked; copied generated client without replacing the engine.",
    );
    process.exit(0);
  }
}

for (let attempt = 2; attempt <= MAX_ATTEMPTS; attempt += 1) {
  console.warn(
    `[prisma-generate-safe] prisma generate failed (attempt ${attempt}/${MAX_ATTEMPTS}). Retrying in ${RETRY_DELAY_MS}ms...`,
  );
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  const next = await runGenerate(SCHEMA_PATH);
  if (next.code === 0) {
    process.exit(0);
  }
  if (attempt === MAX_ATTEMPTS) {
    process.stderr.write(next.stderr);
    process.exit(next.code);
  }
}
