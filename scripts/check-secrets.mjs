import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const patterns = [
  /(?:api|access|secret|private)[_-]?key\s*[:=]\s*["'][^"']{8,}["']/i,
  /service_role/i,
  /sk-[A-Za-z0-9]{20,}/,
  /AIza[0-9A-Za-z\-_]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /(?:postgres|mysql|mongodb):\/\/[^"'\s]+/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
];

const allowlist = [
  "package-lock.json",
  ".env.example",
  "scripts/check-secrets.mjs",
];

const files = execSync("git ls-files", { encoding: "utf8" })
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean)
  .filter((f) => !allowlist.includes(f));

const findings = [];

for (const file of files) {
  let text = "";
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    patterns.forEach((regex) => {
      if (regex.test(line)) {
        findings.push({
          file,
          line: index + 1,
          sample: line.trim().slice(0, 140),
        });
      }
    });
  });
}

if (findings.length > 0) {
  console.error("Potential secrets detected:");
  findings.forEach((f) => {
    console.error(`- ${f.file}:${f.line} -> ${f.sample}`);
  });
  process.exit(1);
}

console.log("No obvious secrets found in tracked files.");
