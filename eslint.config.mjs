import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { resolvePluginsRelativeTo: __dirname },
});

// Usar configuración plana para ESLint v8+
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "**/.next/**", // Asegurar que todos los archivos generados por Next.js sean ignorados
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Desactivamos reglas específicas
      "react/no-unescaped-entities": 0,
      "react/display-name": 0,
      "import/no-anonymous-default-export": 0,
    },
  },
];

export default eslintConfig;
