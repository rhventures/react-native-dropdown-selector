module.exports = {
  preset: 'react-native',
  testEnvironment: './e2e/environment.js',
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  reporters: ['detox/runners/jest/streamlineReporter'],
  verbose: true,
};