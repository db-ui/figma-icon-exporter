module.exports = {
  env: { es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};
