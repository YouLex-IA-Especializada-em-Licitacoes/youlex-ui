import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  { ignores: ["public/r/**", ".next/**", "node_modules/**"] },
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      // Regras abaixo viram warning: pegam padrões pré-existentes do upstream
      // (beautiful-ui) que não são escopo desta issue (YLX-191 só faz o fork
      // nascer). Portar componente para os padrões da casa é YLX-192/193/194.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/triple-slash-reference": "warn",
    },
    settings: { react: { version: "detect" } },
  },
);
