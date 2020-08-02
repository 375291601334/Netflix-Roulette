module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', './src'],
  collectCoverage: true,
  collectCoverageFrom: ['*.{ts,tsx}'],
  testMatch: [
    './**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./test.js'],
};
