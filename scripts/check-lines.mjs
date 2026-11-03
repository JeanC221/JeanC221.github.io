import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { pathToFileURL } from "node:url";
import { listProjectFiles } from "./project-files.mjs";

/** @typedef {{ path: string, line: number, rule: string, message: string }} Violation */

const MAX_LINES = 200;
const CHECKED_EXTENSIONS = new Set([".html", ".css", ".js", ".mjs", ".md", ".json", ".yml"]);
const SKIPPED_PATHS = new Set(["package-lock.json"]);
const SKIPPED_PREFIXES = ["mockups/", ".taste-skill/", ".impeccable/"];
/** Emoji presentation by default, or a pictograph forced to emoji by VS16. Keeps (c) and arrows. */
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u;

/** @param {string} path */
export function isChecked(path) {
  if (SKIPPED_PATHS.has(path)) return false;
  if (SKIPPED_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;
  return CHECKED_EXTENSIONS.has(extname(path));
}

/**
 * @param {string} path
 * @param {string} text
 * @returns {Violation[]}
 */
export function findViolations(path, text) {
  const lines = text.endsWith("\n") ? text.slice(0, -1).split("\n") : text.split("\n");
  /** @type {Violation[]} */
  const violations = [];
  if (lines.length > MAX_LINES) {
    const message = `${lines.length} lines, limit is ${MAX_LINES}`;
    violations.push({ path, line: MAX_LINES + 1, rule: "max-lines", message });
  }
  lines.forEach((content, index) => {
    const line = index + 1;
    if (content.includes("\t")) {
      violations.push({ path, line, rule: "no-tabs", message: "tab character" });
    }
    if (EMOJI.test(content)) {
      violations.push({ path, line, rule: "no-emoji", message: "emoji character" });
    }
  });
  return violations;
}

function main() {
  const violations = listProjectFiles()
    .filter(isChecked)
    .flatMap((path) => findViolations(path, readFileSync(path, "utf8")));
  for (const { path, line, rule, message } of violations) {
    console.error(`${path}:${line}  ${rule}  ${message}`);
  }
  if (violations.length > 0) {
    console.error(`\n${violations.length} violation(s) found.`);
    process.exitCode = 1;
    return;
  }
  console.log("check-lines: no violations.");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main();
}
