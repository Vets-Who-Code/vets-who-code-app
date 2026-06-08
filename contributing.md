# Contributing to Vets Who Code Web App

Hello and thank you for your interest in contributing to the Vets Who Code web app. We appreciate your effort and support. This guide explains how to get started, make changes, submit pull requests, and follow project standards.

## Table of Contents

- [Contributing to Vets Who Code Web App](#contributing-to-vets-who-code-web-app)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
  - [Fork and Clone the Repository](#fork-and-clone-the-repository)
  - [Fining Issues to Work on](#fining-issues-to-work-on)
  - [Reporting Bugs](#reporting-bugs)
  - [Feature Requests](#feature-requests)
  - [Making Changes](#making-changes)
  - [Pull Request Process](#pull-request-process)
    - [PR Checklist](#pr-checklist)
  - [Code Style and Linting](#code-style-and-linting)
  - [Commit Message Guidelines](#commit-message-guidelines)
    - [Format](#format)
    - [Rules](#rules)
    - [Allowed Types](#allowed-types)
    - [Examples](#examples)
  - [Testing](#testing)
  - [Further Help](#further-help)

## Code of Conduct

Our community has a [Code of Conduct](code_of_conduct.md), and we ask that you read and follow it. This helps ensure a welcoming, respectful, and inclusive environment for everyone.

## Getting Started

Before contributing, make sure you have:

- A [GitHub account](https://github.com/)
- Git installed on your machine
- Node.js and npm installed
- Access to the project repository

## Fork and Clone the Repository

1. Fork the repository on GitHub.
2. Clone your fork to your local machine:

```bash
git clone https://github.com/YOUR_USERNAME/vets-who-code-app.git
cd vets-who-code-app
```

3. Add the original repository as the upstream remote:

```bash
git remote add upstream https://github.com/Vets-Who-Code/vets-who-code-app.git
```

4. Install dependencies:

```bash
npm install
```

5. Set up environment variables:
```bash
cp .env.example .env.local
```
Update .env.local with the required values. Check the README for configuration details

6. Run database migrations:
```bash
npx prisma migrate dev
```

7. Start the development server:
```bash
npm run dev
```

## Fining Issues to Work on

If you are new to the project, start with issues labeled:
- good first issue
- beginner
- help wanted
- documentation
Documentation and testing issues are often a great place to begin.

## Reporting Bugs

Before opening a bug report:
-Search existing issues to make sure the bug has not already been reported.
If it has not been reported, open a new issue.
Include a clear title, detailed description, steps to reproduce, expected behavior, and screenshots if helpful.

## Feature Requests

Before requesting a feature:
-Check existing issues to see if the feature has already been suggested.
If it has not, open a new issue.
Include a clear title, description, and why the feature would be useful.

## Making Changes

1. Create a new branch for your work:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
When making changes:
- Follow the existing project structure
- Use clear and meaningful names
- Keep functions small and focused
- Comment complex logic when needed
- Update documentation when your change affects setup, usage, or behavior

3. Test your changes locally
```bash
npm test
npm run lint
npm run typecheck
```

4. Commit your changes using a Conventional Commit message.
```bash
git add .
git commit -m "docs: Update contributing guidelines"
```

## Pull Request Process

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Opena Pull Request against the original repository.
3. In your PR description:
   - Explain what changed
   - Link the related issue if applicable
   - Mention any testing completed
   - Add screenshots if the change affects the UI

### PR Checklist
- Code follows the project style guidlines
- Tests pass locally
- New code has tests when needed
- Documentation has now been upgraded when needed
- Commit message follow project conventions
- PR description is clear

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

Before submitting a PR:
- Add tests for new features or fixes when appropriate
- Write unit tests for utilities
- Write component tests for UI changes when needed
- Ensure existing tests pass
Run tests locally
```bash
npm test
```

## Further Help

If you have any questions or need further assistance:
- Open an issue
- Check existing Issues and Pull Requests
- Reach out to [Jerome Hardaway][https://github.com/jeromehardaway].
Thank you for contributing to Vets Who Code!!