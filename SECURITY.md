# Security Policy

## Reporting a vulnerability

**Do not open a public issue for a security vulnerability.**

Report it privately through
[GitHub's private vulnerability reporting](https://github.com/Vets-Who-Code/vets-who-code-app/security/advisories/new),
which opens a draft advisory visible only to maintainers.

Please include:

- what the vulnerability is and where it lives (file, route, or endpoint)
- the steps to reproduce it
- what an attacker could do with it

You can expect an acknowledgement within **5 business days**.

## Scope

This repository is the Vets Who Code web application: the Next.js app, its API
routes under `src/pages/api/`, and its build and deployment configuration.

Out of scope here:

- The J0dI3 service, which runs separately and is reached through
  `src/lib/j0di3-client.ts`
- Third-party platforms we integrate with rather than operate — Shopify,
  Cloudinary, Resend, Neon, Vercel, GitHub. Report those to the vendor.

## Supported versions

Only the deployed `master` branch is supported. There are no maintained release
branches, and fixes ship forward rather than being backported.

| Version          | Supported |
| ---------------- | --------- |
| `master` (live)  | ✅        |
| anything earlier | ❌        |

## Response targets

| Severity | Target                                       |
| -------- | -------------------------------------------- |
| Critical | patched or mitigated within **48 hours**     |
| High     | within **7 days**                            |
| Moderate | within **30 days**                           |
| Low      | next dependency-maintenance pass             |

## Automated scanning

Three things run against this repository:

- **CodeQL** — static analysis on every push and pull request to `master`, plus
  a weekly scheduled run. Results appear under the repository's Security tab.
  See `.github/workflows/security.yml`.
- **`npm audit`** — production dependencies are audited in the same workflow.
  This step is **reporting-only today**: `master` carries a backlog of known
  advisories, so a blocking gate would fail every pull request and train people
  to ignore it. Once the backlog is cleared, remove `continue-on-error` from the
  audit step to turn it into a real gate.
- **Dependabot** — security updates are enabled at the repository level, and
  `.github/dependabot.yml` adds weekly version updates for npm packages and
  GitHub Actions.

### Checking locally

```bash
npm run security:audit   # full report
npm run security:check   # production deps, high and critical only
npm run security:fix     # apply non-breaking fixes
```

`npm audit fix --force` is deliberately not wired to a script — it installs
breaking major versions and needs a human deciding whether that is acceptable.

## Handling secrets

Never commit `.env`, `.env.local`, or any credential. Every variable the
application reads belongs in `.env.example`, with placeholders only — add it
there when you introduce it. Do not log secrets, tokens, raw customer data, or
full third-party payloads.

If a credential is exposed, rotate it first and clean up history second — a
committed secret should be treated as compromised the moment it is pushed.
