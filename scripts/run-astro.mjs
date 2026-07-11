import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const astroCliPath = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
const astroArgs = process.argv.slice(2);

const child = spawn(process.execPath, [astroCliPath, ...astroArgs], {
  stdio: "inherit",
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1"
  }
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
