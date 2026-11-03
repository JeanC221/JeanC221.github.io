import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

/** Only these paths are published; mockups, docs and tooling stay out of the site. */
const SITE_ENTRIES = ["index.html", "css", "js", "content", "assets", "favicon.svg"];
const OUT_DIR = "dist";

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR);

const copied = SITE_ENTRIES.filter((entry) => existsSync(entry));
for (const entry of copied) {
  cpSync(entry, `${OUT_DIR}/${entry}`, { recursive: true });
}

console.log(
  `build: copied ${copied.length} entr${copied.length === 1 ? "y" : "ies"} to ${OUT_DIR}/`,
);
