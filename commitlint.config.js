module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'test',     // Adding or updating tests
        'chore',    // Build process or auxiliary tool changes
        'perf',     // Performance improvements
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Reverting previous commits
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [0, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 50],
    'subject-min-length': [2, 'always', 10],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 72],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 72],
    'header-min-length': [2, 'always', 20]
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: 'Other changes that don\'t modify src or test files',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑'
          }
        }
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
        enum: {
          user: {
            description: 'User-related functionality',
            title: 'User'
          },
          api: {
            description: 'API endpoints and controllers',
            title: 'API'
          },
          service: {
            description: 'Business logic services',
            title: 'Service'
          },
          repository: {
            description: 'Data access layer',
            title: 'Repository'
          },
          model: {
            description: 'Data models and entities',
            title: 'Model'
          },
          config: {
            description: 'Configuration files',
            title: 'Config'
          },
          test: {
            description: 'Test files',
            title: 'Test'
          },
          docs: {
            description: 'Documentation',
            title: 'Docs'
          },
          deps: {
            description: 'Dependencies',
            title: 'Dependencies'
          },
          ci: {
            description: 'CI/CD configuration',
            title: 'CI/CD'
          },
          docker: {
            description: 'Docker configuration',
            title: 'Docker'
          },
          maven: {
            description: 'Maven configuration',
            title: 'Maven'
          }
        }
      },
      subject: {
        description: 'Write a short, imperative tense description of the change'
      },
      body: {
        description: 'Provide a longer description of the change'
      },
      isBreaking: {
        description: 'Are there any breaking changes?'
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
      },
      breaking: {
        description: 'Describe the breaking changes'
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?'
      },
      issuesBody: {
        description: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)'
      }
    }
  }
};
