# Production Deployment Checklist

Use this checklist to ensure a smooth deployment to production.

---

## Pre-Deployment

### Code Quality
- [ ] All TypeScript types are correct: `npm run typecheck`
- [ ] Build succeeds locally: `npm run build`
- [ ] All tests pass: `npm test` (if tests exist)
- [ ] Linting passes: `npm run lint`
- [ ] No console errors or warnings in dev mode
- [ ] All TODO comments addressed or documented

### Database
- [ ] Prisma schema updated for PostgreSQL
- [ ] All migrations created and tested
- [ ] Seed script tested (if using)
- [ ] Database connection strings prepared
- [ ] Backup strategy planned

### Environment Variables
- [ ] All variables documented in `.env.example`
- [ ] Production values prepared (not in git)
- [ ] `NEXTAUTH_SECRET` generated: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] GitHub OAuth app credentials ready
- [ ] Resend API key obtained
- [ ] Email domain verified in Resend
- [ ] `NODE_ENV` will be set to `production`

### Security
- [ ] No secrets committed to repository
- [ ] Dev endpoints secured (`/api/dev/*`)
- [ ] RBAC implemented on all protected routes
- [ ] Input validation on all forms
- [ ] SQL injection protection (via Prisma)
- [ ] XSS protection (via React)
- [ ] CSRF protection (via NextAuth)

### Features Testing
- [ ] User authentication (GitHub OAuth)
- [ ] Course enrollment
- [ ] Progress tracking
- [ ] Assignment submission
- [ ] Grading workflow
- [ ] Email notifications
- [ ] Certificate generation
- [ ] Admin dashboard
- [ ] Course creation
- [ ] Responsive design tested

---

## Deployment

### 1. Database Setup
- [ ] PostgreSQL database created (Vercel/Neon/Railway)
- [ ] Connection strings copied
- [ ] Environment variables set in hosting platform
- [ ] Migrations run: `npx prisma migrate deploy`
- [ ] Prisma client generated: `npx prisma generate`
- [ ] (Optional) Seed data loaded: `npx prisma db seed`

### 2. GitHub OAuth Configuration
- [ ] OAuth app created/updated
- [ ] Homepage URL: `https://your-domain.com`
- [ ] Callback URL: `https://your-domain.com/api/auth/callback/github`
- [ ] Client ID and Secret copied
- [ ] Organization name set in env vars

### 3. Email Configuration
- [ ] Resend account created
- [ ] Domain verified in Resend
- [ ] DNS records added (SPF, DKIM, DMARC)
- [ ] API key generated
- [ ] Test email sent successfully
- [ ] Email templates reviewed

### 4. Vercel Deployment
- [ ] Repository connected to Vercel
- [ ] Project created in Vercel
- [ ] All environment variables added
- [ ] Build settings configured
- [ ] First deployment triggered
- [ ] Deployment successful
- [ ] Deployment URL accessed

### 5. Custom Domain (Optional)
- [ ] Domain added in Vercel
- [ ] DNS records updated
- [ ] SSL certificate provisioned
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS

---

## Post-Deployment

### Verification
- [ ] Homepage loads correctly
- [ ] Login with GitHub works
- [ ] User can enroll in a course
- [ ] Progress is tracked
- [ ] Assignments can be submitted
- [ ] Instructors can grade assignments
- [ ] Students receive email notifications
- [ ] Certificates can be generated
- [ ] Admin dashboard accessible
- [ ] All API endpoints responding

### Monitoring Setup
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (Sentry recommended)
- [ ] Database metrics monitored
- [ ] Uptime monitoring setup
- [ ] Log aggregation configured

### Performance
- [ ] Page load times acceptable (<3s)
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] CDN working (Vercel automatic)
- [ ] Core Web Vitals passing

### Documentation
- [ ] README updated with production info
- [ ] API documentation current
- [ ] Admin guide created
- [ ] User guide created (if needed)
- [ ] Deployment runbook documented

---

## Day 1 Post-Launch

### Immediate Checks (First Hour)
- [ ] Monitor error logs
- [ ] Check database connections
- [ ] Verify email sending
- [ ] Test user registration
- [ ] Check authentication flows
- [ ] Monitor API response times

### First Day Tasks
- [ ] Review all application logs
- [ ] Check for any error patterns
- [ ] Monitor database performance
- [ ] Test all critical user paths
- [ ] Gather initial user feedback
- [ ] Document any issues found

---

## Week 1 Post-Launch

### Daily Checks
- [ ] Review error logs
- [ ] Check email delivery rates
- [ ] Monitor user signups
- [ ] Track course enrollments
- [ ] Review database performance
- [ ] Check API response times

### Weekly Tasks
- [ ] Review user feedback
- [ ] Analyze usage patterns
- [ ] Check for security issues
- [ ] Review database backups
- [ ] Update documentation if needed
- [ ] Plan bug fixes and improvements

---

## Maintenance Procedures

### Weekly
- [ ] Review application logs
- [ ] Check database health
- [ ] Monitor email deliverability
- [ ] Review security alerts
- [ ] Check SSL certificate expiry
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Review and apply security patches
- [ ] Analyze performance metrics
- [ ] Review database query performance
- [ ] Optimize slow queries
- [ ] Update documentation
- [ ] Review backup procedures
- [ ] Test disaster recovery

### Quarterly
- [ ] Major dependency updates
- [ ] Security audit
- [ ] Performance optimization
- [ ] Database cleanup
- [ ] Review and update backups
- [ ] User satisfaction survey

---

## Rollback Plan

### If Issues Occur
1. **Minor Issues**:
   - [ ] Document the issue
   - [ ] Create hot fix branch
   - [ ] Test fix locally
   - [ ] Deploy fix
   - [ ] Verify fix in production

2. **Major Issues**:
   - [ ] Assess impact
   - [ ] Notify users if needed
   - [ ] Rollback to previous deployment
   - [ ] Investigate root cause
   - [ ] Fix in development
   - [ ] Re-deploy when ready

### Rollback Procedure
```bash
# Using Vercel
vercel rollback [previous-deployment-url]

# Or in Vercel Dashboard:
# Deployments → Select previous → Promote to Production
```

---

## Emergency Contacts

- **Technical Lead**: [Name] - [Email/Phone]
- **Database Admin**: [Name] - [Email/Phone]
- **DevOps**: [Name] - [Email/Phone]
- **Vercel Support**: support@vercel.com
- **GitHub Support**: https://support.github.com

---

## Support Resources

### Documentation
- Production Deployment Guide: `PRODUCTION_DEPLOYMENT.md`
- Week 3 Features: `WEEK3_POLISH_COMPLETION.md`
- Quick Start: `QUICK_START_WEEK3.md`
- LMS Phase 1: `LMS_COMPLETION_REPORT.md`

### External Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Resend Docs: https://resend.com/docs
- NextAuth Docs: https://next-auth.js.org

---

## Success Criteria

Your deployment is successful when:
- [ ] All checklist items completed
- [ ] No critical errors in logs
- [ ] Users can sign up and log in
- [ ] Core features working
- [ ] Email notifications sending
- [ ] Database performing well
- [ ] Response times acceptable
- [ ] SSL certificate valid
- [ ] Monitoring active
- [ ] Team notified of launch

---

## Notes

**Deployment Date**: _______________

**Deployed By**: _______________

**Database Provider**: _______________

**Production URL**: _______________

**Issues Encountered**:
-
-
-

**Follow-up Actions**:
-
-
-

---

**Version**: 1.0.0
**Last Updated**: November 4, 2025

---

## Sign-Off

- [ ] Technical Lead: _____________ Date: _______
- [ ] Product Owner: _____________ Date: _______
- [ ] QA Team: _____________ Date: _______

---

**Status**: Ready for Production 🚀
