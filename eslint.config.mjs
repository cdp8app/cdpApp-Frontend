import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": ["error"], // Warn on unused variables
      "no-console": "warn", // Warn when console.log() is used
      "eqeqeq": ["error", "always"], // Enforce strict equality ===
      "curly": ["error", "multi-line"], // Require curly braces for multiline control structures
      "semi": ["error", "always"], // Always require semicolons
      "quotes": ["error", "double"], // Use double quotes
      "indent": ["error", 2], // Enforce 2-space indentation
      "react/react-in-jsx-scope": "off", // No need for React import in Next.js
    },
  },
];

export default eslintConfig;
