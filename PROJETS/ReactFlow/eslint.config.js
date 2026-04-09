// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint'); // Fixed: use eslint package
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
]);
