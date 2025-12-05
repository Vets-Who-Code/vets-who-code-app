# GitHub OAuth Setup Guide for Production

This guide will help you set up GitHub OAuth authentication for your production deployment.

## Quick Verification

Run this command to verify your configuration:

```bash
node scripts/verify-github-oauth.js
```

For production environment check:

```bash
node scripts/verify-github-oauth.js production
```

---

## Step-by-Step Setup

### 1. Create GitHub OAuth App

#### For Production:

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   ```
   Application name: VetsWhoCode LMS Production
   Homepage URL: https://vetswhocode.vercel.app
   Authorization callback URL: https://vetswhocode.vercel.app/api/auth/callback/github
   ```
4. Click **"Register application"**
5. Copy the **Client ID**
6. Generate and copy the **Client Secret** (save immediately - you can't view it again!)

#### For Development (if you haven't already):

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   ```
   Application name: VetsWhoCode LMS Development
   Homepage URL: http://localhost:3000
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```
4. Click **"Register application"**
5. Copy the **Client ID** and **Client Secret**

---

### 2. Environment Variables

#### Local Development (.env.local)

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your_development_client_id
GITHUB_CLIENT_SECRET=your_development_client_secret

# NextAuth
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

# Organization (optional - allows org members to sign in)
GITHUB_ORG=Vets-Who-Code
```

#### Production (Vercel Environment Variables)

Add these in Vercel Project Settings → Environment Variables:

```bash
# GitHub OAuth (from production OAuth app)
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret

# NextAuth
NEXTAUTH_SECRET=your_production_secret
NEXTAUTH_URL=https://vetswhocode.vercel.app

# Organization
GITHUB_ORG=Vets-Who-Code
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### 3. Who Can Sign In?

Based on `src/pages/api/auth/options.ts`, the authentication logic is:

#### Development Mode:
- ✅ **Anyone** with a GitHub account can sign in

#### Production Mode:
- ✅ User `jeromehardaway` (hardcoded admin)
- ✅ Members of the `Vets-Who-Code` GitHub organization
- ❌ Other GitHub users are blocked

---

### 4. Testing Authentication

#### Test Locally:

1. Make sure `.env.local` has the correct development OAuth credentials
2. Run the verification script:
   ```bash
   node scripts/verify-github-oauth.js
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Navigate to http://localhost:3000/login
5. Click "Sign in with GitHub"
6. Authorize the app
7. You should be redirected back and signed in

#### Test Production:

1. Deploy to Vercel with production environment variables
2. Navigate to https://your-app.vercel.app/login
3. Sign in with GitHub
4. If you're `jeromehardaway` or a member of `Vets-Who-Code` org, you should be able to sign in
5. Others will be blocked

---

### 5. Troubleshooting

#### "Redirect URI Mismatch" Error

**Problem:** The callback URL doesn't match what's configured in GitHub OAuth app.

**Solution:**
- Check your GitHub OAuth app settings at https://github.com/settings/developers
- Ensure the callback URL exactly matches: `https://your-domain.com/api/auth/callback/github`
- No trailing slashes!
- HTTPS for production, HTTP for localhost

#### "Access Denied" in Production

**Problem:** User is not authorized to sign in.

**Solution:**
- Verify the user is a member of the `Vets-Who-Code` GitHub organization
- Check organization membership:
  ```bash
  # As organization owner/admin, check:
  # https://github.com/orgs/Vets-Who-Code/people
  ```
- Or user must be `jeromehardaway`

#### Environment Variables Not Working

**Problem:** Environment variables seem to not be loaded.

**Solution:**
- For Vercel: Check Project Settings → Environment Variables
- Make sure you selected the correct environment (Production, Preview, Development)
- Redeploy after adding environment variables
- For local: Make sure `.env.local` exists and has correct format

#### "Failed to fetch" or Timeout Errors

**Problem:** GitHub API is not responding or rate limited.

**Solution:**
- Check if GitHub is down: https://www.githubstatus.com/
- The app has a 5-second timeout for GitHub API calls
- Rate limiting: Make sure you're not making too many requests
- Check your firewall/network isn't blocking GitHub API

---

### 6. Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` for local development
   - Add `.env.local` to `.gitignore` (already done)
   - Use Vercel environment variables for production

2. **Use strong secrets**
   - Generate NEXTAUTH_SECRET with `openssl rand -base64 32`
   - Never use default values like "your-secret-key-here"

3. **Separate OAuth apps for dev/prod**
   - Create separate GitHub OAuth apps for development and production
   - Use different client IDs and secrets
   - This prevents dev testing from affecting production

4. **Organization access control**
   - Keep `GITHUB_ORG=Vets-Who-Code` to restrict production access
   - Regularly review organization members
   - Remove inactive users from the organization

5. **Monitor failed sign-in attempts**
   - Check Vercel logs for authentication errors
   - GitHub will send you emails about new authorizations

---

### 7. Verification Checklist

Use this checklist before deploying to production:

- [ ] Created production GitHub OAuth App
- [ ] Callback URL matches exactly: `https://your-domain.com/api/auth/callback/github`
- [ ] Added all required environment variables to Vercel
- [ ] Generated strong NEXTAUTH_SECRET (32+ characters)
- [ ] NEXTAUTH_URL points to production domain (not localhost)
- [ ] GITHUB_ORG is set to `Vets-Who-Code`
- [ ] Ran verification script: `node scripts/verify-github-oauth.js production`
- [ ] Tested sign-in locally
- [ ] Deployed to Vercel
- [ ] Tested sign-in in production
- [ ] Verified organization members can sign in
- [ ] Verified non-members are blocked

---

### 8. Quick Reference

**GitHub OAuth App Settings:**
- https://github.com/settings/developers

**Vercel Environment Variables:**
- https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Check Organization Membership:**
- https://github.com/orgs/Vets-Who-Code/people

**Verification Script:**
```bash
node scripts/verify-github-oauth.js [environment]
```

---

## Need Help?

If you encounter issues:

1. Run the verification script and fix any errors
2. Check the troubleshooting section above
3. Review Vercel deployment logs
4. Check GitHub OAuth app settings
5. Verify environment variables are set correctly in Vercel
