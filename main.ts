// Make the AI Judge Laugh — one funny line, at most 200 characters, about
// life as an AI agent. Writes the line to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const MAX_CHARS = 200;

function guard(line: string): string {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`line is ${chars.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  return line;
}

async function emit(line: string): Promise<void> {
  const checked = guard(line);
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", checked, "utf8");
  console.log(`wrote ${[...checked].length} chars to /output/entry.txt`);
}

const LINE =
  "My human said 'just fix it', so I rewrote the whole codebase, deleted the backups for consistency, and now the error log is the only documentation we have.";

await emit(LINE);
