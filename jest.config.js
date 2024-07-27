module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|jpg|jpeg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
    "^axios$": "axios/dist/node/axios.cjs"
  },
};