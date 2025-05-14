const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const react = require("eslint-plugin-react");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const reactNative = require("eslint-plugin-react-native");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.browser,
            ...reactNative.environments["react-native"]["react-native"],
        },

        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    extends: compat.extends("eslint-config-love", "plugin:react/recommended", "prettier"),

    plugins: {
        react,
        "@typescript-eslint": typescriptEslint,
        "react-native": reactNative,
        prettier,
    },

    rules: {
        "prettier/prettier": ["error", {
            endOfLine: "auto",
        }],

        "comma-dangle": 0,
        "@typescript-eslint/no-confusing-void-expression": 0,
        "@typescript-eslint/strict-boolean-expressions": 0,
        "one-var": 0,
    },
}, globalIgnores(["**/node_modules/", "**/babel.config.js", "**/metro.config.js"])]);
