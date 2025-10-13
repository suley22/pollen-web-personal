import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const config = [
  ...compat.extends("next/core-web-vitals"),
  js.configs.recommended,
  {
    files: ["src/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
    },
    ignores: ["**/*.css"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Configuración de variables no utilizadas
      "no-unused-vars": "off", // Deshabilita completamente la validación de variables no usadas
      "no-undef": "warn", // Convierte errores de variables no definidas en warnings

      // Configuración de React Hooks (hacer menos estricto)
      "react-hooks/rules-of-hooks": "warn", // Convierte errores de hooks en warnings
      "react-hooks/exhaustive-deps": "warn", // Convierte errores de dependencias en warnings

      // Configuración de Next.js (hacer menos estricto)
      "@next/next/no-img-element": "warn", // Convierte errores de img en warnings

      // Configuración adicional para hacer menos estricto
      // (react/no-unescaped-entities ya configurado arriba)

      // Configuración de React
      "react/react-in-jsx-scope": "off", // No necesario en React 17+
      "react/prop-types": "off", // No necesario con TypeScript o para proyectos rápidos
      "react/display-name": "off", // Demasiado estricto
      "react/no-unescaped-entities": "warn", // Convierte en warning en lugar de error
      "react/jsx-uses-react": "off", // No necesario en React 17+
      "react/jsx-uses-vars": "error",

      // Reglas recomendadas de React (equivalente a plugin:react/recommended)
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-array-index-key": "warn",
      "react/no-children-prop": "error",
      "react/no-danger": "warn",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unknown-property": "error",
      "react/no-unsafe": "warn",
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",
      "react/sort-comp": "off",
      "react/sort-prop-types": "off",
      "react/style-prop-object": "error",
      "react/void-dom-elements-no-children": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default config;
