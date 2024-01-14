module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['pages', 'components', 'assets', 'styles', 'hooks', 'lib', 'store', 'svgs'],
    ],
  },
};
