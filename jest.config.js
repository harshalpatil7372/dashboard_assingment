module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Update this line
    },
    testMatch: [
      '<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)',
      '<rootDir>/src/**/?(*.)(spec|test).(js|jsx|ts|tsx)'
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json']  // Add ts/tsx
  };