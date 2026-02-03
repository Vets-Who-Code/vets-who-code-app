# GitHub Workflow Security

This document outlines the security measures in place for GitHub workflows in this repository.

## Security Measures

### 1. Safe Workflow Triggers

- **code-quality-score.yml**: Uses `pull_request_target` with explicit checkout of PR head SHA
  - Allows commenting on external PRs while maintaining security
  - Runs with minimal permissions (`contents: read`, `pull-requests: write`)

- **playwright.yml**: Uses conditional token access
  - External PRs use default `github.token` (read-only)
  - Internal pushes can use `VWC_GITHUB_TOKEN` for additional permissions

### 2. Code Ownership

The `CODEOWNERS` file ensures that changes to workflows require approval from maintainers:
- `/.github/workflows/` - All workflow files
- `/.github/scripts/` - All CI/CD scripts
- `/.github/CODEOWNERS` - The CODEOWNERS file itself

### 3. Recommended Branch Protection Rules

Enable these settings in GitHub repository settings → Branches → master:

- ✅ Require pull request reviews before merging (at least 1)
- ✅ Require review from Code Owners
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators (enforces rules for everyone)

### 4. Secret Management

- Organization secrets like `VWC_GITHUB_TOKEN` are only exposed on push events
- External PRs use the auto-generated `github.token` with limited permissions
- Never log or expose secrets in workflow outputs

## For Contributors

External contributors can safely submit PRs. The workflows are designed to:
- Run code quality checks on your changes
- Execute tests without exposing organization secrets
- Provide feedback via PR comments

## For Maintainers

When reviewing PRs that modify workflows:
1. Verify no secrets are being exposed
2. Check that `pull_request_target` workflows checkout the correct ref
3. Ensure permissions are as restrictive as possible
4. Test workflow changes in a fork first if uncertain

## References

- [GitHub: Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [GitHub: Using pull_request_target safely](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)
