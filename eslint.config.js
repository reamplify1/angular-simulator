// @ts-check

const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],

    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],

    plugins: {
      prettier: eslintPluginPrettier,
    },

    processor: angular.processInlineTemplates,

    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],

      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],

      quotes: [
        "warn",
        "single",
        {
          avoidEscape: true,
        },
      ],

      "object-curly-spacing": [
        "warn",
        "always",
      ],

      "template-curly-spacing": [
        "warn",
        "always",
      ],

      semi: [
        "warn",
        "always",
      ],

      "lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],

      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "no-public",
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: true,
          },
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
      ],

      "prettier/prettier": "error",
    },
  },

  {
    files: ["**/*.html"],

    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],

    rules: {
      "@angular-eslint/template/banana-in-box": "error",

      "@angular-eslint/template/eqeqeq": "warn",
    },
  },
]);
