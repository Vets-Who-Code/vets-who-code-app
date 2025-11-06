# Production Deployment Guide

Complete guide for deploying the Vets Who Code LMS platform to production.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup (PostgreSQL)](#database-setup-postgresql)
3. [Environment Variables](#environment-variables)
4. [Deploying to Vercel](#deploying-to-vercel)
5. [Post-Deployment Tasks](#post-deployment-tasks)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

### Code Readiness

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run typecheck`
- [ ] Linting passes: `npm run lint`
- [ ] All environment variables documented in `.env.example`

### Database

- [ ] Schema is up to date
- [ ] Migrations are ready
- [ ] Seed data prepared (optional)
- [ ] Backup strategy in place

### Security

- [ ] `NEXTAUTH_SECRET` is generated (production-grade)
- [ ] All API keys are secure and not committed to git
- [ ] CORS is properly configured
- [ ] Rate limiting considered for APIs
- [ ] Dev endpoints secured (`/api/dev/*`)

### Features

- [ ] Email notifications tested
- [ ] RBAC working correctly
- [ ] Course creation functional
- [ ] Grading workflow tested
- [ ] Certificate generation working

---

## Database Setup (PostgreSQL)

### Option 1: Vercel Postgres (Recommended)

1. **Create Vercel Postgres Database**
   ```bash
   # In Vercel Dashboard:
   # 1. Go to your project
   # 2. Click "Storage" tab
   # 3. Create new "Postgres" database
   # 4. Copy connection strings
   ```

2. **Configure Environment Variables**
   ```bash
   # Vercel will auto-populate these:
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NON_POOLING="..."

   # Set in your project:
   DATABASE_URL="${POSTGRES_PRISMA_URL}"
   DIRECT_URL="${POSTGRES_URL_NON_POOLING}"
   ```

3. **Run Migrations**
   ```bash
   # From your local machine:
   npx prisma migrate deploy

   # Or using Vercel CLI:
   vercel env pull
   npx prisma migrate deploy
   ```

### Option 2: Neon (Serverless Postgres)

1. **Create Neon Database**
   - Go to https://neon.tech
   - Create new project
   - Copy connection string

2. **Configure Environment Variables**
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Option 3: Railway

1. **Create Railway Database**
   ```bash
   # Using Railway CLI:
   railway link
   railway add postgresql
   ```

2. **Get Connection String**
   ```bash
   railway variables
   # Copy DATABASE_URL
   ```

3. **Run Migrations**
   ```bash
   railway run npx prisma migrate deploy
   ```

### Seed Production Database (Optional)

```bash
# Seed with initial data
npx prisma db seed

# Or create custom seed for production
tsx prisma/seed-production.ts
```

---

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="<generate-with-openssl-rand-base64-32>"
NEXTAUTH_URL="https://your-domain.com"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-app-client-id"
GITHUB_CLIENT_SECRET="your-github-app-secret"
GITHUB_ORG="Vets-Who-Code"

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="Vets Who Code <noreply@vetswhocode.io>"

# Node Environment
NODE_ENV="production"
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate random API key
openssl rand -hex 32
```

### Setting Variables in Vercel

```bash
# Using Vercel CLI
vercel env add NEXTAUTH_SECRET production
vercel env add GITHUB_CLIENT_ID production
vercel env add GITHUB_CLIENT_SECRET production
vercel env add RESEND_API_KEY production
vercel env add EMAIL_FROM production
vercel env add GITHUB_ORG production

# Or use Vercel Dashboard:
# Project Settings → Environment Variables
```

---

## Deploying to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Connect Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build (or use default)
   Output Directory: .next (auto-detected)
   Install Command: npm install
   ```

3. **Set Environment Variables**
   - Add all required variables (see above)
   - Use "Production" environment

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will provide deployment URL

5. **Run Database Migration**
   ```bash
   # After first deployment:
   vercel env pull
   npx prisma migrate deploy
   ```

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set environment variables
vercel env add NEXTAUTH_SECRET production
# ... (add all variables)

# Deploy
vercel --prod

# Run migrations
vercel env pull .env.production
DATABASE_URL=<production-url> npx prisma migrate deploy
```

### Build Configuration

Create or update `vercel.json`:

```json
{
  "buildCommand": "prisma generate && next build",
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["iad1"],
  "framework": "nextjs"
}
```

---

## Post-Deployment Tasks

### 1. Verify Deployment

```bash
# Check health
curl https://your-domain.com/api/health

# Test authentication
# Visit: https://your-domain.com/login

# Test database connection
# Try enrolling in a course
```

### 2. Configure Custom Domain

```bash
# Using Vercel CLI
vercel domains add your-domain.com

# Or in Vercel Dashboard:
# Project Settings → Domains → Add Domain
```

### 3. Set up SSL Certificate

Vercel automatically provides SSL via Let's Encrypt.

Verify:
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate valid

### 4. Configure GitHub OAuth

Update GitHub OAuth App:
- **Homepage URL**: `https://your-domain.com`
- **Authorization callback URL**: `https://your-domain.com/api/auth/callback/github`

### 5. Configure Resend Domain

1. Add and verify your domain in Resend
2. Update DNS records (SPF, DKIM, DMARC)
3. Update `EMAIL_FROM` to use verified domain

### 6. Seed Initial Data

```bash
# Create admin user (if not using GitHub org check)
# Run seed script or manually create via SQL
```

### 7. Test All Features

- [ ] User registration/login
- [ ] Course enrollment
- [ ] Progress tracking
- [ ] Assignment submission
- [ ] Grading workflow
- [ ] Email notifications
- [ ] Certificate generation
- [ ] Admin dashboard access

---

## Monitoring & Maintenance

### Application Monitoring

**Vercel Analytics** (Built-in):
- Real-time performance metrics
- Web Vitals tracking
- Request analytics

**Enable in Vercel Dashboard**:
- Project Settings → Analytics → Enable

### Error Tracking

**Recommended: Sentry**

```bash
npm install @sentry/nextjs
```

Configure `sentry.client.config.ts` and `sentry.server.config.ts`

### Database Monitoring

**Vercel Postgres**:
- View metrics in Vercel Dashboard
- Set up alerts for high usage

**Neon**:
- Built-in monitoring dashboard
- Connection pooling stats

### Logging

**Vercel Logs**:
```bash
# View logs
vercel logs

# Follow logs in real-time
vercel logs --follow
```

### Backup Strategy

**Database Backups**:

```bash
# Daily automated backups (Vercel Postgres)
# Enabled by default

# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20250104.sql
```

### Update Strategy

1. **Create Production Branch**
   ```bash
   git checkout -b production
   ```

2. **Test Changes in Preview**
   - Push to preview branch
   - Vercel creates preview deployment
   - Test thoroughly

3. **Deploy to Production**
   ```bash
   git checkout production
   git merge main
   git push origin production
   ```

4. **Run Migrations**
   ```bash
   # If schema changed
   vercel env pull
   npx prisma migrate deploy
   ```

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Fix types locally
npm run typecheck
# Fix errors
git add . && git commit -m "fix: type errors"
git push
```

**Issue**: Prisma client not generated
```bash
# Solution: Ensure build command includes prisma generate
# Update package.json:
"build": "prisma generate && next build"
```

### Database Connection Issues

**Issue**: Cannot connect to database
```bash
# Check connection string format
# PostgreSQL format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Test connection locally
psql $DATABASE_URL

# Check SSL requirement
# Add ?sslmode=require to connection string
```

**Issue**: Migration fails
```bash
# Check migration files
ls prisma/migrations

# Reset database (DANGEROUS - only in dev)
npx prisma migrate reset

# In production, investigate specific error
vercel logs
```

### Email Issues

**Issue**: Emails not sending
```bash
# Check RESEND_API_KEY is set
vercel env ls

# Verify domain in Resend dashboard
# Check DNS records (SPF, DKIM)

# Test locally
node -e "require('./src/lib/email').sendEmail({to:'test@example.com',subject:'Test',html:'Test'})"
```

### Authentication Issues

**Issue**: Cannot log in with GitHub
```bash
# Verify GitHub OAuth app settings
# Check callback URL matches: https://your-domain.com/api/auth/callback/github

# Verify NEXTAUTH_URL is correct
vercel env get NEXTAUTH_URL

# Check NEXTAUTH_SECRET is set
vercel env get NEXTAUTH_SECRET
```

### Performance Issues

**Issue**: Slow page loads
```bash
# Check database query performance
# Add database indexes if needed

# Enable Vercel Analytics
# Review slow queries

# Consider caching
# Implement Redis for session storage
```

### CORS Errors

**Issue**: CORS errors in browser
```bash
# Add CORS headers in next.config.js:
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-domain.com' },
        ],
      },
    ];
  },
};
```

---

## Rollback Procedure

### Emergency Rollback

```bash
# Using Vercel CLI
vercel rollback [deployment-url]

# Or in Vercel Dashboard:
# Deployments → Previous Deployment → Promote to Production
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup-YYYYMMDD.sql

# Or migrate down
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Security Checklist

- [ ] All secrets are in environment variables (not code)
- [ ] `NODE_ENV=production` is set
- [ ] Dev endpoints (`/api/dev/*`) are secured
- [ ] CORS is properly configured
- [ ] Rate limiting implemented on auth endpoints
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] Database connections use SSL
- [ ] Regular security updates applied

---

## Performance Optimization

### CDN & Caching

Vercel automatically provides:
- Global CDN
- Edge caching
- Image optimization

### Database Optimization

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_enrollment_user ON "Enrollment"("userId");
CREATE INDEX idx_enrollment_course ON "Enrollment"("courseId");
CREATE INDEX idx_progress_user ON "Progress"("userId");
```

### Code Splitting

Already handled by Next.js automatic code splitting.

### Image Optimization

Use Next.js `<Image>` component:
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  width={500}
  height={300}
  alt="Description"
/>
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Resend Docs**: https://resend.com/docs

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
