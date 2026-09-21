<p align="center">
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/actions/workflows/vitest.yml">
    <img src="https://github.com/Vets-Who-Code/vets-who-code-app/actions/workflows/vitest.yml/badge.svg?branch=master" alt="Unit Tests" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/actions/workflows/playwright.yml">
    <img src="https://github.com/Vets-Who-Code/vets-who-code-app/actions/workflows/playwright.yml/badge.svg?branch=master" alt="Playwright Tests" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app">
    <img src="https://img.shields.io/github/package-json/v/Vets-Who-Code/vets-who-code-app?style=flat-square" alt="Version" />
  </a>
  <img src="https://img.shields.io/badge/node-v18.18.0-brightgreen.svg?style=flat-square" alt="node" />
  <img src="https://img.shields.io/badge/npm-v9.0.0-blue.svg?style=flat-square" alt="npm" />
  <a href="https://github.com/Vets-Who-Code/vwc-site/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/blob/master/contributing.md">
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square" alt="Contributions Welcome" />
  </a>
  <a href="https://vercel.com?utm_source=vetswhocode.io&utm_campaign=oss">
    <img src="https://img.shields.io/badge/Powered_by-Vercel-black?style=flat-square" alt="Powered by Vercel">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/issues">
    <img src="https://img.shields.io/github/issues/Vets-Who-Code/vets-who-code-app?style=flat-square" alt="Open Issues" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22">
    <img src="https://img.shields.io/github/issues/Vets-Who-Code/vets-who-code-app/good%20first%20issue?style=flat-square&label=good%20first%20issues" alt="Good First Issues" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/pulls">
    <img src="https://img.shields.io/github/issues-pr/Vets-Who-Code/vets-who-code-app?style=flat-square" alt="Open Pull Requests" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/Vets-Who-Code/vets-who-code-app?style=flat-square" alt="Contributors" />
  </a>
  <a href="https://github.com/Vets-Who-Code/vets-who-code-app/commits/master">
    <img src="https://img.shields.io/github/last-commit/Vets-Who-Code/vets-who-code-app?style=flat-square" alt="Last Commit" />
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

## Testing 🧪

Unit and component tests run on [Vitest](https://vitest.dev). End-to-end tests run on [Playwright](https://playwright.dev).

### Running Unit Tests

```sh
npm test                                           # run every unit and component test once
npx vitest                                         # watch mode
npx vitest run src/utils/__tests__/string.test.ts  # a single file
npx vitest run -t "falls back to the post title"   # a single test, matched by name
npx vitest run --coverage                          # with a coverage report
```

`npm test` is an alias for `vitest run`.

### Test Structure

```text
__tests__/                 # mirrors src/: api, components, data, lib, pages, prisma, scripts, utils
src/**/__tests__/          # co-located: src/hooks, src/lib/interactive-lessons,
                           #             src/lib/lesson-sandbox, src/utils
tests/                     # Playwright only — excluded from Vitest
  e2e/*.spec.ts
  security/*.spec.ts
```

Vitest picks up `__tests__/**/*.{test,tests}.{ts,tsx}` and `src/**/__tests__/**/*.{test,tests}.{ts,tsx}`. The top-level `tests/` directory is excluded from Vitest and belongs to Playwright, whose specs are named `*.spec.ts`.

### Writing Tests

House style, set by `vitest.config.mts` and `vitest.setup.ts`:

- `globals: true` is on, so do **not** import `describe`, `it`, or `expect`.
- DOM matchers come from `vitest-dom`, so `toHaveAttribute` and `toBeInTheDocument` work with no extra import.
- Import through the path aliases (`@components/...`, `@lib/...`), never deep relative paths across feature boundaries.
- Mock with `vi.fn()` and `vi.mock()`.
- For interactions, use `fireEvent` from `@testing-library/react`.

A component test (`__tests__/components/blog-card.test.tsx`):

```tsx
import BlogCard from "@components/blog-card/blog-03";
import { render, screen } from "@testing-library/react";

const PROPS = {
    path: "/blog/combat-to-code",
    title: "From Combat to Code",
    category: { title: "Career", slug: "career", path: "/blog/category/career" },
    postedAt: "Jan 1, 2026",
};

describe("BlogCard (blog-03)", () => {
    it("falls back to the post title for the image alt when none is provided", () => {
        render(<BlogCard {...PROPS} image={{ src: "/images/combat-to-code.png" }} />);

        expect(screen.getByRole("img")).toHaveAttribute("alt", "From Combat to Code");
    });
});
```

A utility test (`src/utils/__tests__/string.test.ts`):

```ts
import { capitalize } from "../string";

describe("capitalize", () => {
    it("capitalizes each word", () => {
        expect(capitalize("hello world")).toBe("Hello World");
    });
});
```

### Coverage

No thresholds are enforced, but we aim for:

| Metric     | Target |
| ---------- | ------ |
| Statements | 70%+   |
| Branches   | 60%+   |
| Functions  | 70%+   |
| Lines      | 70%+   |

Generate and open the HTML report:

```sh
npx vitest run --coverage
open coverage/index.html
```

### End-to-End Tests

```sh
npx playwright install                                    # first time only
npx playwright test                                       # every spec
npx playwright test --project=chromium                    # one browser
npx playwright test tests/e2e/interactive-lesson.spec.ts  # one file
```

Projects defined in `playwright.config.ts`: `chromium`, `firefox`, `Mobile Chrome`, `Microsoft Edge`, `Google Chrome`.

The `Microsoft Edge` and `Google Chrome` projects drive system-installed branded browsers, which plain `npx playwright install` does not download — a bare `npx playwright test` fails those two projects with `Chromium distribution 'msedge' is not found`. Either run `npx playwright install msedge chrome` first, or stay on the bundled browsers:

```sh
npx playwright test --project=chromium --project=firefox --project="Mobile Chrome"
```

Locally, Playwright runs `npm run build && npm run start` before the specs, so the first run takes a couple of minutes. Specs that need Shopify or NextAuth credentials skip themselves when those environment variables are missing.

### Best Practices

- Add tests with new behavior, and a regression test with every bug fix.
- Test observable behavior — rendered output, state changes, API responses — not internals.
- Keep one assertion focus per test.
- Give tests descriptive names that read as sentences.
- Mock external services with `vi.mock()`; never call a real API from a unit test.
- For API routes, cover success, validation failure, and external-service failure.

### Continuous Integration

Both suites run on every pull request to `master`. [`.github/workflows/vitest.yml`](.github/workflows/vitest.yml) runs `npx vitest run --reporter=verbose`, and [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs a `chromium` + `firefox` matrix.

### Resources

- [Vitest documentation](https://vitest.dev)
- [Testing Library (React)](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright documentation](https://playwright.dev)
- Still stuck? See [Further Help](contributing.md#further-help) in the contributing guide.

## Contributing :handshake:

We love contributions! Please read our [Contributing Guidelines](contributing.md) to get started.

## Roadmap 🗺️

Curious about upcoming features? Check our [Roadmap](https://github.com/orgs/Vets-Who-Code/projects/82).

## License :scroll:

This project is under the GNU Affero General Public License v3.0 - see the [License]() for more details.

---

<p align="center">Made with &hearts; by veterans, for veterans</p>
