module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.js'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/tests/jest-preprocess.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  setupFiles: ['./tests/jest-preprocess.js', './tests/loadershim.js'],
  collectCoverageFrom: ['src/components/**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/image-mock.js',
    '\\.(css|scss|sass)$': '<rootDir>/tests/__mocks__/style-mock.js',
    '^@reach/router(.*)': '<rootDir>/node_modules/@gatsbyjs/reach-router$1',
  },
}