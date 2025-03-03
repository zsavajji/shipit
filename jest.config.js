process.env.FORCE_COLOR=0;

export default {
  testEnvironment: 'node',
  roots: ['packages'],
  coverageDirectory: './coverage/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
