import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const compat = new FlatCompat({
  baseDirectory: dirName,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ["**/node_modules", "**/dist", "src/ts/vendor", ".postcssrc.js"],

}, ...compat.extends("standard-with-typescript", "prettier"), {
  rules: {
    "import/order": ["error", {
      alphabetize: {
        order: "asc",
        caseInsensitive: false,
        orderImportKind: "asc",
      },
    }],

    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",

    curly: ["error", "all"],

    "no-irregular-whitespace": ["error", {
      skipTemplates: true,
      skipStrings: true,
    }],

    "no-console": ["error", {
      allow: ["info", "error", "warn"],
    }],
  },
},
{
  files: ["**/*.js", "**/*.ts"],

  ignores: ["src/ts/vendor/**", "plugins/pug/**"],

  languageOptions: {
    ecmaVersion: 5,
    sourceType: "script",

    parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: dirName,
    },
  },
}];
