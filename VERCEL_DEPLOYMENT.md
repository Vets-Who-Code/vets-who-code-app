# Deploying LMS to Vercel 🚀

## Prerequisites

Before deploying, you need:
1. A Vercel account
2. GitHub OAuth App credentials
3. A Neon (or other PostgreSQL) database

---

## Step 1: Create GitHub OAuth App

### 1.1 Create the OAuth App

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name:** VetsWhoCode LMS
   - **Homepage URL:** `https://your-app-name.vercel.app` (or your custom domain)
   - **Authorization callback URL:** `https://your-app-name.vercel.app/api/auth/callback/github`
4. Click **"Register application"**

### 1.2 Get Your Credentials

1. Copy the **Client ID**
2. Click **"Generate a new client secret"**
3. Copy the **Client Secret** (you won't be able to see it again!)
4. Save both values - you'll need them for Vercel

---

## Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Import"**

### 2.2 Configure Environment Variables

Before deploying, add these environment variables in Vercel:

**Required Variables:**

```bash
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
DIRECT_URL=postgresql://user:password@host/database?sslmode=require

# NextAuth
NEXTAUTH_SECRET=your-random-secret-key-generate-with-openssl
NEXTAUTH_URL=https://your-app-name.vercel.app

# GitHub OAuth (from Step 1)
GITHUB_CLIENT_ID=your_github_client_id_from_step_1
GITHUB_CLIENT_SECRET=your_github_client_secret_from_step_1

# GitHub Organization (optional)
GITHUB_ORG=Vets-Who-Code
```

**How to generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your app is now live! 🎉

---

## Step 3: Setup Database

After deploying, you need to set up your production database:

### 3.1 Push Schema to Production Database

From your local machine:

```bash
# Make sure DATABASE_URL points to production in your .env
npx prisma db push
```

Or use Vercel CLI:

```bash
vercel env pull .env.production.local
npx prisma db push
```

### 3.2 Seed Production Database (Optional)

```bash
npx prisma db seed
```

This creates test users and sample courses.

---

## Step 4: Assign Admin Role

After deployment, assign yourself admin access:

### Option 1: Using Prisma Studio Locally

```bash
# Connect to production database
DATABASE_URL="your-production-db-url" npx prisma studio
```

Then:
1. Navigate to the `User` table
2. Find `jerome@vetswhocode.io`
3. Change `role` to `ADMIN`

### Option 2: Using Neon Console

1. Go to your Neon dashboard
2. Open SQL Editor
3. Run this query:

```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'jerome@vetswhocode.io';
```

### Option 3: Sign In First, Then Update

1. Sign in to your deployed app with GitHub
2. This creates your user account
3. Then use Option 1 or 2 to update your role to ADMIN

---

## Step 5: Test Sign In

### How Sign In Works on Vercel

1. Go to: `https://your-app-name.vercel.app/login`
2. Click **"Sign in with GitHub"**
3. Authorize the app
4. You'll be redirected back to your app
5. Your session is created with the role from the database

**Important:** The "Dev Login" button **won't work** on Vercel - it's local development only!

---

## Step 6: Verify Everything Works

Test these pages after deploying:

- [ ] `/login` - Sign in with GitHub
- [ ] `/dashboard` - See your dashboard
- [ ] `/admin/courses` - Access admin panel (requires ADMIN role)
- [ ] `/courses` - Browse courses
- [ ] `/instructor/grading` - Grade submissions (requires INSTRUCTOR/MENTOR/ADMIN role)

---

## Common Issues & Solutions

### Issue: "Access Denied" on Admin Pages

**Solution:**
- Check your role in the database
- Make sure you're signed in with the correct GitHub account
- Verify the email in the database matches your GitHub email

### Issue: GitHub OAuth Redirect Error

**Solution:**
- Verify callback URL in GitHub OAuth app matches exactly: `https://your-domain.vercel.app/api/auth/callback/github`
- Check `NEXTAUTH_URL` environment variable in Vercel
- Ensure `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct

### Issue: Database Connection Error

**Solution:**
- Verify `DATABASE_URL` is correct
- Check if your database allows connections from Vercel IPs
- For Neon: ensure connection pooling is enabled

### Issue: "Cannot read properties of undefined (reading 'role')"

**Solution:**
- User might not exist in database yet
- Sign in once to create the user
- Then update the role to ADMIN

---

## Environment Variables Checklist

Before deploying, make sure you have all these set in Vercel:

- [ ] `DATABASE_URL`
- [ ] `DIRECT_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`
- [ ] `GITHUB_CLIENT_ID`
- [ ] `GITHUB_CLIENT_SECRET`
- [ ] `GITHUB_ORG` (optional)

---

## Security Best Practices

1. **Never commit secrets** to your repository
2. **Rotate secrets regularly** (especially `NEXTAUTH_SECRET`)
3. **Use different OAuth apps** for production and staging
4. **Restrict GitHub Organization** access if needed
5. **Monitor failed login attempts** in your logs

---

## After Deployment

1. **Update GitHub OAuth App** callback URL if your domain changes
2. **Regenerate Prisma Client** if you change the schema
3. **Run migrations** carefully in production
4. **Backup your database** regularly
5. **Monitor Vercel logs** for errors

---

## Production URLs

After deployment, share these with your team:

- **Login:** `https://your-app-name.vercel.app/login`
- **Dashboard:** `https://your-app-name.vercel.app/dashboard`
- **Courses:** `https://your-app-name.vercel.app/courses`
- **Admin:** `https://your-app-name.vercel.app/admin/courses`

---

## Need Help?

- Check Vercel logs: `vercel logs`
- View deployment details in Vercel dashboard
- Check database logs in Neon console
- Review [LMS_GUIDE.md](LMS_GUIDE.md) for feature documentation

**Built with ❤️ for #VetsWhoCode**
