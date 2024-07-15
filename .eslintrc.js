module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"]
    },
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Your custom rules
  }
};
