import js from "@eslint/js";
import globals from "globals";

const HTML_SINKS = ["innerHTML", "outerHTML"];

export default [
  {
    ignores: ["node_modules/", "dist/", "mockups/", ".taste-skill/", ".impeccable/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser },
    },
    rules: {
      "max-lines": ["error", { max: 200, skipBlankLines: false, skipComments: false }],
      "max-lines-per-function": ["error", { max: 30, skipBlankLines: false, skipComments: false }],
      "no-restricted-syntax": [
        "error",
        ...HTML_SINKS.map((name) => ({
          selector: `AssignmentExpression[left.property.name='${name}']`,
          message: `Do not assign ${name}; build nodes with createElement and textContent.`,
        })),
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: "Do not use insertAdjacentHTML; build nodes with createElement and textContent.",
        },
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
      eqeqeq: "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["scripts/**/*.mjs", "tests/**/*.js", "*.config.js"],
    languageOptions: { globals: { ...globals.node } },
    rules: { "no-console": "off" },
  },
];
