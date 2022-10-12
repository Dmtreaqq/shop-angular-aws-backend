module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/'
  ],
  modulePaths: [
    './src'
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  },
  setupFilesAfterEnv: ['jest-extended', './jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.spec.{ts,js}',
    '!src/**/*.test.{ts,js}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/types.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
      statements: -10
    }
  }
}
