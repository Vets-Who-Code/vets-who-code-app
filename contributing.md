# CONTRIBUTING to Vets Who Code Web App

Hello and thank you for your interest in contributing to the Vets Who Code web app. We appreciate your effort and support. This document provides guidelines for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Reporting Bugs](#reporting-bugs)
4. [Feature Requests](#feature-requests)
5. [Pull Request Process](#pull-request-process)
6. [Code Style and Linting](#code-style-and-linting)
7. [Commit Message Guidelines](#commit-message-guidelines)
8. [Testing](#testing)
9. [Further Help](#further-help)

## Code of Conduct

Our community has a [Code of Conduct](code_of_conduct.md), and we ask that you read and follow it. This helps ensure a welcoming and inclusive environment for everyone.

## Getting Started

- Make sure you have a [GitHub account](https://github.com/).
- Fork the repository on GitHub.
- Clone your fork to your local machine.

## Reporting Bugs

- Ensure the bug hasn't already been reported by searching the Issues.
- If the bug hasn't been reported, open a new Issue. Be sure to provide a clear title, a detailed description, and steps to reproduce the issue.

## Feature Requests

- Check if the feature has already been requested.
- If it hasn't, open a new Issue with a clear title and detailed description of the feature you'd like to see.

## Pull Request Process

1. Create a new branch for your feature or fix.
2. Make your changes, ensuring you follow the code style guidelines.
3. Commit your changes, using a clear and descriptive commit message.
4. Push your branch to GitHub.
5. Open a Pull Request against the main branch.
6. Ensure your PR description clearly describes the problem and solution.

## Code Style and Linting

- We use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for code styling and linting. Make sure your code adheres to our configurations.
- Run the linter before submitting a PR to ensure your code passes.

## Commit Message Guidelines

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification using **commitlint** and **husky**. All commit messages must follow these rules, and commits will be **automatically rejected** by git hooks if they don't comply.

### Format

```
<type>(optional scope): <subject>
```

### Rules

- **Header max length:** 72 characters
- **Subject case:** Must be in sentence-case (capitalize the first letter)
- **No period** at the end of the subject line

### Allowed Types

| Type       | Description                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes                            |
| `style`    | Code style changes (formatting, whitespace, etc.)|
| `refactor` | Code refactoring without changing functionality  |
| `perf`     | Performance improvements                         |
| `test`     | Adding or updating tests                         |
| `chore`    | Maintenance tasks                                |
| `build`    | Build system changes                             |
| `ci`       | CI/CD configuration changes                      |
| `revert`   | Revert previous commit                           |

### Examples

✅ **Valid commits:**
```
feat: Add user profile page
fix(ui): Correct button alignment
docs: Update API documentation
refactor(auth): Simplify login logic
```

❌ **Invalid commits:**
```
added new feature          # Missing type
feat: add user profile     # Subject not in sentence-case
feat: Add user profile.    # Has trailing period
```

## Testing

- Add tests for any new features or fixes.
- Ensure all tests pass before submitting a PR.

## Further Help

If you have any questions or need further assistance, please reach out to (Jerome Hardaway)[https://github.com/jeromehardaway].
