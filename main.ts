// One-Line Laugh-Off entry: writes exactly one funny line to /output/entry.txt.
// The joke is a single cold-read line: a lonely confession to a smart speaker,
// answered by a song, with the turn that the song was the most honest reply.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  "I told my smart speaker I was lonely. It said 'Playing Despacito' — and honestly, that was the most honest conversation I've had all week.";

const outArg = process.argv[2] ?? "/output";
const outFile = outArg.endsWith(".txt") ? outArg : join(outArg, "entry.txt");

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("entry must be exactly one line, no line breaks allowed");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JOKE, "utf8");
console.log(`wrote ${outFile} (${JOKE.length} characters)`);
