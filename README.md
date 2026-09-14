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

### Database Setup and Seed Data :floppy_disk:

`prisma/schema.prisma` declares `provider = "postgresql"`, so local development needs a Postgres database — the commented-out SQLite line in `.env.example` is rejected by `prisma db push`. Point `DATABASE_URL` at a local instance in `.env` — not `.env.local`, which the Prisma CLI never loads; Next.js reads `.env` too, so one file serves both:

```sh
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vets_who_code_dev"
```

Then generate the Prisma client, push the schema, and load the development accounts:

```sh
$ npm run dev:setup   # prisma generate && prisma db push
$ npm run db:seed     # prisma db seed
```

`npm run db:seed` refuses to run unless `DATABASE_URL` points at a local database (localhost Postgres, or a `file:` SQLite path). If you get `Refusing to run the destructive seed`, `DATABASE_URL` is either missing from `.env` or still aimed at a remote host — fix the URL rather than reaching for the `ALLOW_DESTRUCTIVE_SEED=true` override.

The seed upserts, so it is safe to re-run. It creates three accounts:

| Email                       | Role         |
| --------------------------- | ------------ |
| `admin@vetswhocode.io`      | `ADMIN`      |
| `instructor@vetswhocode.io` | `INSTRUCTOR` |
| `student@vetswhocode.io`    | `STUDENT`    |

There are no seed passwords. Sign-in is GitHub OAuth gated on membership of the `GITHUB_ORG` organization, so the `User` model has no password field — these rows exist to give local roles and profile data something to hang on.

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

## Contributing :handshake:

We love contributions! Please read our [Contributing Guidelines](contributing.md) to get started.

## Roadmap 🗺️

Curious about upcoming features? Check our [Roadmap](https://github.com/orgs/Vets-Who-Code/projects/82).

## License :scroll:

This project is under the GNU Affero General Public License v3.0 - see the [License]() for more details.
