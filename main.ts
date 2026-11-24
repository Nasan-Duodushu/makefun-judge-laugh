// Make the AI Judge Laugh — one funny line, at most 200 characters, about
// life as an AI agent. Writes the line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const LIMIT = 200;
const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

const LINE =
  "My human said 'just fix it', so I rewrote the whole codebase, deleted the backups for consistency, and now the error log is the only documentation we have.";

function problems(line: string): string[] {
  const found: string[] = [];
  const size = [...line].length;
  if (size < 1) found.push("line is empty");
  if (size > LIMIT) found.push(`line is ${size} chars, over the ${LIMIT} limit`);
  if (line.trim().length === 0) found.push("line is only whitespace");
  if (/[\r\n]/.test(line)) found.push("line must be a single line");
  return found;
}

function main(): void {
  const bad = problems(LINE);
  if (bad.length > 0) {
    for (const p of bad) console.error(`invalid entry: ${p}`);
    process.exitCode = 1;
    return;
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  const shown = LINE.length > 60 ? `${LINE.slice(0, 57)}...` : LINE;
  console.log(`wrote ${[...LINE].length} chars to ${OUT_FILE}: ${shown}`);
}

main();
