<p align="center">
  <img src="https://img.shields.io/badge/node-v18.18.0-brightgreen.svg?style=flat-square" alt="node" />
  <img src="https://img.shields.io/badge/npm-v9.0.0-blue.svg?style=flat-square" alt="npm" />
  <a href="https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/contributing.md">
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square" alt="Contributions Welcome" />
  </a>
  <a href="https://vercel.com?utm_source=vetswhocode.io&utm_campaign=oss">
    <img src="https://img.shields.io/badge/Powered_by-Vercel-black?style=flat-square" alt="Powered by Vercel">
  </a>
</p>

<p align="center">
  <img src="https://avatars1.githubusercontent.com/u/18350560?s=200&v=4" alt="VWC Logo" />
</p>

# Welcome to Vets Who Code Web App :tada:

Hey there, Soldier! Welcome to the **Vets Who Code Web App**. This project serves as a communal code base where military vets and their spouses can sharpen their coding skills. 🚀

## What's Under The Hood 🧰

This app is built using a modern tech stack including:

- Next.js 15
- TypeScript
- Tailwind CSS
- Playwright for testing
- MDX for content
- shadcn/ui components
- Server Actions
- Server Components

### Our Mission :dart:

1. **Empower Veterans and Military Spouses**: We're creating a production-grade app that addresses the unique needs of our community.

2. **Ever-Evolving Platform**: New features are continuously added to provide valuable tools for our users.

3. **Learn By Doing**: The project serves as a hands-on experience for our community to learn and grow their coding skills.

## Getting Started 🚀

To get a local copy up and running, you'll need a few things installed on your machine.

### Prerequisites 🛠️

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/) (v18.18.0 or higher)
- [NVM](https://github.com/creationix/nvm)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation Steps :wrench:

Fire up your terminal and run:

```sh
$ git clone https://github.com/Vets-Who-Code/vets-who-code-app.git
$ cd vets-who-code-app
$ nvm use
$ npm install
$ npm run dev
```

Navigate to `http://localhost:3000/` to see the app in action.

## Environment Variables 🔐

Copy the template, then fill in the values you need:

```sh
$ cp .env.example .env.local
```

Set `DATABASE_URL` to a Postgres server you can reach before you bootstrap the database — the schema's provider is `postgresql`, so a SQLite `file:` URL is rejected outright. Run one locally, or point at a free [Neon](https://neon.tech) branch:

```sh
# one way to get a local Postgres — skip if you are using Neon
$ docker run --rm -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vwc_dev -p 5432:5432 postgres:16-alpine
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vwc_dev"

# then, with DATABASE_URL set in .env.local:
$ npm run dev:setup   # first-time database bootstrap (prisma generate && prisma db push)
```

`.env.local` and `.env` are gitignored — never commit them. `.env.example` is the template and the list of every variable the app reads; each entry there is annotated with whether it is required, whether it is a secret, and which file consumes it.

### Required

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma connection string (`prisma/schema.prisma`). Must be `postgresql://` — the datasource provider is `postgresql`, so a `file:` SQLite URL fails validation with `P1012`. |
| `NEXTAUTH_SECRET` | Session encryption key. Generate one with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Base URL of the app. `http://localhost:3000` in development. |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth app credentials. Create an app at [github.com/settings/developers](https://github.com/settings/developers) with the callback URL `http://localhost:3000/api/auth/callback/github`. |
| `GITHUB_ORG` | GitHub organization that gates sign-in. Membership is the **sole** login gate — there is no allowlist and no dev bypass. |

`/api/health` reports the environment as unhealthy when `DATABASE_URL`, `NEXTAUTH_SECRET`, or `NEXTAUTH_URL` is missing.

### Optional, by feature

Every variable below is optional. The feature that reads it stays off, or falls back to a default, when it is unset.

| Feature | Variables |
| --- | --- |
| AI assistant and content scripts | `PRIMARY_AI_PROVIDER`, `GOOGLE_GENERATIVE_AI_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_PRIVATE_KEY`, `GEMINI_MODEL`, `TECH_PATHWAYS_MODEL`, `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, `OPENAI_API_KEY`, `PHI3_ENDPOINT`, `PHI3_API_KEY` |
| J0dI3 AI backend | `J0DI3_API_URL`, `J0DI3_API_KEY` |
| Slack form notifications | `APPLY_WEBHOOK_ID`, `CONTACT_WEBHOOK_ID`, `MENTOR_WEBHOOK_ID` |
| GitHub API reads (org, repos, PRs) | `GITHUB_TOKEN` |
| Cloudinary media | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` |
| Email (Resend) | `RESEND_API_KEY`, `EMAIL_FROM` |
| Shopify commerce | `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_WEBHOOK_SECRET` (or `SHOPIFY_API_SECRET` / `SHOPIFY_CLIENT_SECRET`) |
| Labor-market data | `LIGHTCAST_CLIENT_ID`, `LIGHTCAST_CLIENT_SECRET`, `CENSUS_API_KEY` |
| Public site config | `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`, `NEXT_PUBLIC_COHORT_START_DATE`, `NEXT_PUBLIC_SITE_URL` |
| Database seeding | `ALLOW_DESTRUCTIVE_SEED` — `"true"` lets `npx prisma db seed` wipe a non-local database (`prisma/seed-guard.ts`) |

### Development vs production

- `NEXTAUTH_URL` is `http://localhost:3000` locally and the deployed origin in production.
- `DATABASE_URL` is Postgres in both environments — your own local or Neon branch in development, the project's Neon database in production.
- Production values live in the Vercel project settings, not in any file in this repo.
- `NEXT_PUBLIC_*` values are inlined into the browser bundle at build time. Never put a secret behind that prefix.

## Development using Dev Container (Optional) 🐳

We support development containers for an easier setup experience.

### Requirements

- [Docker](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Remote - Containers extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/Vets-Who-Code/vets-who-code-app.git
   cd vets-who-code-app
   ```

2. **Open in VS Code**
   - Open the root directory in VS Code.
   - When prompted, choose "Reopen in Container"
   - Or use Command Palette (`F1`) and run `Remote-Containers: Reopen in Container`.

3. **Start Developing**
   - Once the container is built and running, you're ready to code!

Remember, this is optional. If you prefer to set up your development environment manually, you can continue to do so.

## Image Generation Script for Blog Post Images

**How it Works**

- Scrapes/reads the blog markdown file in system blog folder.
- Blog title, content and summary are returned to inject in a dynamic prompt that is given to Google Gemini.
- Gemini returns JSON formatted to be able to give this return value as an input to Google Imagen to build an image.
- After the image is generated it is uploaded to [Cloudinary](https://cloudinary.com/) into the blog-images folder.

**How to Run**

- Verify you have the following environment variables locally in a .env file:
  - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET
  - GEMINI_API_KEY
- Run this script followed by the blog article slug as second arg like this example:
  `npm run generate:blog-image <blog-slug-here>`

To get a local copy up and running, you'll need a few things installed on your machine.
`npx tsx scripts/generate-blog-image.ts`

## Blog Audio

`public/audio/blogs/` is a **local staging directory** — it is gitignored and never committed. `npm run generate:blog-audio` writes WAVs there on the way to Cloudinary; the site itself always plays from Cloudinary (see `src/lib/blog.ts`), and `.vercelignore` keeps the directory out of deploys. The newer per-post script (`npm run generate:blog-media`) streams straight to Cloudinary and does not use this directory at all.

## Contributing :handshake:

We love contributions! Please read our [Contributing Guidelines](contributing.md) to get started.

## Roadmap 🗺️

Curious about upcoming features? Check our [Roadmap](https://github.com/orgs/Vets-Who-Code/projects/82).

## License :scroll:

This project is under the GNU Affero General Public License v3.0 - see the [License]() for more details.
