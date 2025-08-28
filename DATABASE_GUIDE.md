# Database Migration Guide for Production

## Current Setup (Development)

- **Database**: SQLite (file:./dev.db)
- **Pros**:
    - Zero setup required
    - Perfect for development
    - Data persists between restarts
- **Cons**:
    - Single file, not scalable for multiple users
    - Limited concurrent access

## Production Options

### Option 1: PostgreSQL (Recommended)

**Best for production with multiple users**

```bash
# Example production DATABASE_URL
DATABASE_URL="postgresql://username:password@hostname:5432/vwc_production"
```

**Hosting Options:**

- **Vercel Postgres**: Seamless integration with Vercel deployment
- **Supabase**: Free tier available, great for startups
- **PlanetScale**: MySQL-compatible, auto-scaling
- **Railway**: Simple deployment with PostgreSQL
- **AWS RDS**: Enterprise-grade, scalable

### Option 2: Keep SQLite (For Small Scale)

**If you have < 50 concurrent users**

```bash
# Production SQLite with better location
DATABASE_URL="file:/app/data/production.db"
```

**Pros:**

- Simple deployment
- No additional database server needed
- Good for small veteran cohorts

### Option 3: Hybrid Approach

**Start with SQLite, migrate when needed**

1. **Phase 1**: Launch with SQLite for first cohort
2. **Phase 2**: Migrate to PostgreSQL when scaling
3. **Migration**: Prisma handles schema migration automatically

## Migration Steps (When Ready)

### 1. Update Environment Variables

```bash
# In production .env
DATABASE_URL="postgresql://..."
```

### 2. Run Prisma Migration

```bash
npx prisma db push
npx prisma generate
```

### 3. Data Migration (if needed)

```bash
# Export from SQLite
npx prisma db seed

# Import to PostgreSQL
# (Prisma handles this automatically)
```

## Current Data Storage

Your platform currently stores:

- ✅ User profiles with military background
- ✅ Course progress and enrollments
- ✅ Assignment submissions and files
- ✅ Admin analytics and tracking

## File Storage

For user-uploaded files (avatars, assignments):

- **Current**: Local file system
- **Production**: Consider cloud storage (AWS S3, Cloudinary, Vercel Blob)

## Recommendation

**For VWC Launch:**

1. **Start with current SQLite setup** - it's perfect for initial launch
2. **Monitor usage** - migrate to PostgreSQL when you have 20+ concurrent users
3. **Plan migration** - Prisma makes this transition seamless

The platform is production-ready with SQLite for your first veteran cohorts!
