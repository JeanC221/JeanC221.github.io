import { execFileSync } from "node:child_process";

/** Tracked and untracked files that are not ignored by .gitignore. */
export function listProjectFiles() {
  const args = ["ls-files", "--cached", "--others", "--exclude-standard", "-z"];
  const output = execFileSync("git", args, { encoding: "utf8" });
  return output.split("\0").filter((path) => path.length > 0);
}
