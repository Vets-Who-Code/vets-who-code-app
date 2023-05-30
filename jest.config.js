// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/api/(.*)$': '<rootDir>/src/pages/api/$1',
    '^@/mocks/(.*)$': '<rootDir>/mocks/$1',
    '^@/utilities/(.*)$': '<rootDir>/src/utilities/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.js'],
  testPathIgnorePatterns: ['<rootDir>/.cache'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  collectCoverageFrom: ['src/components/**/*.{js,jsx}'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
