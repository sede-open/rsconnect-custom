module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ["./__tests__/data/"],
  preset: 'ts-jest',
  testEnvironment: 'node'
}
