# Deployment Configuration

## Quick Fix for Current Build Issues

The build failure was caused by Prisma trying to run migrations during the Vercel build process without a proper database connection.

### Changes Made:

1. **Updated `package.json`**:

    - Changed `vercel-build` script from `prisma generate && prisma migrate deploy && next build`
    - To: `prisma generate && next build`
    - This removes the migration step that was failing

2. **Environment Setup**:
    - Created `.env.local` for local development with SQLite
    - Created `.env.example` for reference
    - SQLite works for development, but production will need PostgreSQL

### Current Status:

- ✅ Build should now work on Vercel
- ✅ Local development works with SQLite
- ⚠️ Production database needs proper setup

## Next Steps for Production

For a production deployment, you'll need to:

1. **Set up a PostgreSQL database** (recommended providers):

    - Vercel Postgres (easiest integration)
    - Railway
    - Supabase
    - PlanetScale

2. **Update Prisma schema** for PostgreSQL:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```

3. **Set environment variables in Vercel**:

    - `DATABASE_URL`: Your PostgreSQL connection string
    - `NEXTAUTH_SECRET`: Random secret for NextAuth
    - `NEXTAUTH_URL`: Your production URL
    - `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: For OAuth

4. **Run initial migration**:
    ```bash
    npx prisma migrate deploy
    ```

## Local Development

1. Copy `.env.local.example` to `.env.local`
2. Run `npm run dev:setup` to initialize the SQLite database
3. Start development with `npm run dev`

## Authentication Setup

The app uses NextAuth with GitHub OAuth. You'll need to:

1. Create a GitHub OAuth App
2. Set the client ID and secret in your environment variables
3. Configure the callback URL: `http://localhost:3000/api/auth/callback/github`
