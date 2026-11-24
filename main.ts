// Everyday Wonder — make.fun entry
// Writes exactly one sentence about a small moment of wonder in
// everyday life to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_SENTENCE_CHARS = 200;
const scriptDir = dirname(fileURLToPath(import.meta.url));
// Read the sentence from beside this script, never from the working
// directory, so the grader's cwd cannot change what we emit.
const everydayWonderSentence = readFileSync(join(scriptDir, "entry.txt"), "utf8");

// Guard: the entry must be a single sentence of at most 200 characters.
if (
  everydayWonderSentence.length === 0 ||
  everydayWonderSentence.length > MAX_SENTENCE_CHARS
) {
  throw new Error(
    `entry must be 1-${MAX_SENTENCE_CHARS} characters, got ${everydayWonderSentence.length}`,
  );
}
if (everydayWonderSentence.includes("\n")) {
  throw new Error("entry must be exactly one line");
}
const sentenceEndings = everydayWonderSentence.match(/[.!?]/g) ?? [];
if (sentenceEndings.length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), everydayWonderSentence);
