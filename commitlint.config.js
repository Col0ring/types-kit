/**
 * build: build tools (such as webpack, vite, ...) and scripts changes.
 * ci: ci changes.
 * feat: new features.
 * docs: docs changes.
 * fix: fix bug.
 * perf: performance optimization.
 * refactor: feature refactoring.
 * revert: revert the last commit.
 * style: coding style changes.
 * test: test changes.
 * anno: annotation changes.
 * type: types changes.
 * chore: misc.
 */

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'anno',
        'type',
        'chore',
      ],
    ],
  },
}
