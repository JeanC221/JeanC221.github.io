import { FileSystemConfigLoader, HtmlValidate, formatterFactory } from "html-validate";
import { listProjectFiles } from "./project-files.mjs";

/** The CLI exits 1 when no file matches; the site has no HTML until P4, so list files here. */
const SKIPPED_PREFIXES = ["mockups/", "node_modules/", "dist/"];

const files = listProjectFiles().filter(
  (path) => path.endsWith(".html") && !SKIPPED_PREFIXES.some((prefix) => path.startsWith(prefix)),
);

if (files.length === 0) {
  console.log("lint-html: no HTML files to validate.");
} else {
  const validator = new HtmlValidate(new FileSystemConfigLoader());
  const report = await validator.validateMultipleFiles(files);
  const output = formatterFactory("stylish")(report.results);
  if (output) console.log(output);
  if (!report.valid) process.exitCode = 1;
  console.log(`lint-html: validated ${files.length} file(s).`);
}
