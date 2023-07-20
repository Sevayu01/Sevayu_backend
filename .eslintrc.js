module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  globals: {
    expect: "readonly",
    request: "readonly",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-underscore-dangle": "off",
    "no-useless-catch": "off",
    "prefer-const": "error",
    "arrow-body-style": "error",
    "no-shadow": "error",
    "no-param-reassign": "error",
    "no-use-before-define": ["error", { functions: false }],

    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["warn", { code: 100, tabWidth: 2 }],
    "quote-props": ["error", "as-needed"],
  },
};
