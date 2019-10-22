module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/components/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  setupFiles: ['<rootDir>/config/jest/setup.js'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js?(x)',
    '<rootDir>/**/?(*-)(spec|test).js?(x)',
  ],
  testRunner: 'jest-circus/runner',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/config/jest/jsTransform.js',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/config/',
    '/lib/',
    '/es/',
    '/cjs/',
    '/__stories__/',
  ],
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
