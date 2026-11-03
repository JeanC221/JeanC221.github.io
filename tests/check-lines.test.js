import { describe, expect, it } from "vitest";
import { findViolations, isChecked } from "../scripts/check-lines.mjs";

/** @param {number} count */
const linesOf = (count) => Array.from({ length: count }, (_, i) => `line ${i}`).join("\n") + "\n";

/** @param {string} path @param {string} text */
const rulesFor = (path, text) => findViolations(path, text).map((violation) => violation.rule);

describe("line limit", () => {
  it("accepts a 200-line HTML file", () => {
    expect(rulesFor("index.html", linesOf(200))).toEqual([]);
  });

  it("rejects a 201-line HTML file", () => {
    expect(rulesFor("index.html", linesOf(201))).toEqual(["max-lines"]);
  });

  it("applies the limit to CSS and Markdown", () => {
    expect(rulesFor("css/base.css", linesOf(201))).toEqual(["max-lines"]);
    expect(rulesFor("PLAN.md", linesOf(201))).toEqual(["max-lines"]);
  });
});

describe("tabs", () => {
  it("reports the line of a tab character", () => {
    const [violation] = findViolations("css/base.css", "a {\n\tcolor: red;\n}\n");
    expect(violation).toMatchObject({ rule: "no-tabs", line: 2 });
  });
});

describe("emoji", () => {
  it("rejects pictographic emoji", () => {
    expect(rulesFor("js/main.js", "const label = 'done \u{1F680}';\n")).toEqual(["no-emoji"]);
  });

  it("rejects text symbols forced to emoji presentation", () => {
    const checkMark = String.fromCodePoint(0x2705);
    const heartAsEmoji = String.fromCodePoint(0x2764, 0xfe0f);
    expect(rulesFor("README.md", `Status ${checkMark}\n`)).toEqual(["no-emoji"]);
    expect(rulesFor("README.md", `Love ${heartAsEmoji}\n`)).toEqual(["no-emoji"]);
  });

  it("allows typographic symbols such as copyright and arrows", () => {
    expect(rulesFor("index.html", "<p>© 2026 → next</p>\n")).toEqual([]);
  });
});

describe("isChecked", () => {
  it("checks source and docs, skips lockfiles and binaries", () => {
    expect(isChecked("js/main.js")).toBe(true);
    expect(isChecked("docs/hero-guide.md")).toBe(true);
    expect(isChecked("package-lock.json")).toBe(false);
    expect(isChecked("assets/me.avif")).toBe(false);
  });
});
