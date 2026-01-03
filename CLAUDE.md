# CLAUDE.md - Vets Who Code App

## Project Overview

This is **Vets Who Code**, a production-grade Learning Management System (LMS) platform serving military veterans with coding education, e-commerce integration, and AI-powered teaching assistance.

**Tech Stack:**
- **Framework:** Next.js 15 with TypeScript (strict mode)
- **Styling:** Tailwind CSS with `tw-` prefix
- **Database:** PostgreSQL via Prisma ORM (Neon serverless adapter)
- **Authentication:** NextAuth.js with GitHub OAuth
- **AI Integration:** Multi-provider (Gemini, Azure OpenAI, OpenAI, Phi-3)
- **E-commerce:** Shopify Storefront API
- **Testing:** Jest (unit/component) + Playwright (E2E)

## Directory Structure

```
src/
├── pages/              # Next.js file-based routing
│   ├── api/            # API routes (serverless functions)
│   ├── admin/          # Admin dashboard
│   ├── blogs/          # Blog pages
│   ├── courses/        # Course/lesson pages
│   └── store/          # Shopify store integration
├── components/         # Reusable React components
│   ├── ui/             # Base UI components (button, modal, form)
│   ├── forms/          # Form components
│   └── ai-assistant/   # AI teaching assistant (J0d!e)
├── containers/         # Page-level section components
│   ├── hero/           # Hero sections (8 layout variations)
│   ├── course/         # Course sections (5 layouts)
│   └── testimonial/    # Testimonial sections (7 layouts)
├── contexts/           # React Context providers
│   ├── ui-context.tsx      # Modal/menu state
│   ├── user-context.tsx    # Authentication state
│   ├── cart-context.tsx    # Shopify cart state
│   └── curriculum-context.tsx
├── layouts/            # Page layout wrappers (Layout01-03)
├── lib/                # Business logic utilities
│   ├── shopify.ts      # Shopify API client
│   ├── ai-provider.ts  # AI provider initialization
│   ├── rbac.ts         # Role-based access control
│   └── prisma.ts       # Database client
├── hooks/              # Custom React hooks
├── data/               # Static/markdown content
├── utils/              # Utility functions and types
└── @types/             # Custom TypeScript definitions
prisma/
└── schema.prisma       # Database schema
```

## Commands

```bash
# Development
yarn dev              # Start dev server (localhost:3000)
yarn build            # Production build
yarn start            # Start production server

# Testing
yarn test             # Run Jest tests
npx playwright test   # Run E2E tests

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix lint + format + typecheck
yarn typecheck        # TypeScript type checking
yarn format           # Prettier formatting
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `contact-form.tsx` |
| Components | PascalCase | `ContactForm` |
| Interfaces | I-prefix | `IFormValues`, `IBlog` |
| Type aliases | T-prefix | `TProps`, `TMenu` |
| Functions/variables | camelCase | `eventFilter`, `slugify` |
| Constants | UPPERCASE | `POSTS_PER_PAGE` |

## Path Aliases

Import using these aliases (configured in tsconfig.json):
```typescript
import Button from "@ui/button";
import { hasKey } from "@utils/methods";
import { IBlog } from "@utils/types";
import { useFilter } from "@hooks";
import { getPostBySlug } from "@lib/blog";
```

## Code Style

- **Components:** Arrow functions with forwardRef pattern
- **Forms:** react-hook-form with TypeScript
- **Styling:** Tailwind CSS with `tw-` prefix (e.g., `tw-bg-primary`)
- **Formatting:** Prettier with 4-space tabs, 100 char width, double quotes
- **Linting:** Airbnb + TypeScript ESLint rules

## Key Patterns

### Component Structure
```typescript
interface TProps {
    className?: string;
}

const MyComponent = forwardRef<HTMLDivElement, TProps>(
    ({ className }, ref) => {
        return <div ref={ref} className={className}>...</div>;
    }
);
MyComponent.displayName = "MyComponent";
export default MyComponent;
```

### API Route Pattern
```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    try {
        // handler logic
        return res.status(200).json({ message: "SUCCESS" });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: "An unexpected error occurred." });
    }
}
```

### Form Handling
```typescript
const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormValues>();

const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    const response = await axios.post("/api/endpoint", data);
    if (response.status === 200) reset();
};
```

## Important Files

| File | Purpose |
|------|---------|
| `next.config.js` | PWA, SVG loading, webpack config |
| `tailwind.config.js` | Custom colors, fonts, animations |
| `prisma/schema.prisma` | Database models |
| `.eslintrc.json` | Airbnb + TypeScript rules |
| `.prettierrc` | 4-space, 100 char, double quotes |
| `jest.config.ts` | Test configuration |
| `playwright.config.ts` | E2E test configuration |

## Database Models (Prisma)

- **User** - Military background fields, roles
- **Course, Module, Lesson** - LMS content
- **Enrollment, Progress, Bookmark, Note** - Student tracking
- **Assignment, Submission, Grade** - Assessments
- **Certificate** - Completion certificates
- **Cohort** - Student groupings

## Environment Variables

Key variables needed (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` - Authentication
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` - OAuth
- `PRIMARY_AI_PROVIDER`, AI API keys - AI assistant
- `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - E-commerce

## Testing Guidelines

- **Unit tests:** `__tests__/` directory, `*.tests.tsx` pattern
- **E2E tests:** `tests/` directory, `*.spec.ts` pattern
- Run `yarn test` before committing
- CI runs Playwright on Chromium + Firefox

## Common Pitfalls

1. **Tailwind prefix:** Use `tw-` prefix (e.g., `tw-flex` not `flex`)
2. **Image handling:** Uses standard `<img>` tags, not Next.js Image
3. **Complexity limit:** ESLint warns at cyclomatic complexity > 10
4. **Pre-commit hooks:** Husky + lint-staged run on staged files
5. **TypeScript strict:** All strict checks enabled - no implicit any

## Container Variations

Container components have multiple layout variations:
- Heroes: 8 layouts (`hero-area/layout-01` through `layout-08`)
- Courses: 5 layouts
- Testimonials: 7 layouts

Select appropriate layout based on page design requirements.

## Git Workflow

- Pre-commit hooks run ESLint and Prettier
- CI runs code quality scoring on PRs
- Playwright tests run on push to main/PRs
