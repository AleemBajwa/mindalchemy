# ✅ Production Deployment Checklist

## Pre-Deployment

### Security
- [ ] Generate strong `SECRET_KEY` (32+ characters, random)
- [ ] Set `DEBUG=False` in production
- [ ] Configure CORS origins properly (no wildcards in production)
- [ ] Review all environment variables
- [ ] Remove any hardcoded secrets/API keys
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure cookie flags
- [ ] Review CORS configuration

### Database
- [ ] Backup existing database (if migrating)
- [ ] Test database migrations
- [ ] Consider PostgreSQL for production (instead of SQLite)
- [ ] Set up automated backups
- [ ] Verify database permissions

### Configuration
- [ ] Update `.env` files with production values
- [ ] Verify `GROQ_API_KEY` is valid
- [ ] Set `ENVIRONMENT=production`
- [ ] Configure `VITE_API_URL` correctly
- [ ] Review all API endpoints
- [ ] Test API health endpoint

### Code Quality
- [ ] Remove console.logs (or use proper logging)
- [ ] Remove debug code
- [ ] Test all critical user flows
- [ ] Verify error handling works
- [ ] Check for any TODO/FIXME comments

## Deployment

### Backend
- [ ] Deploy backend service
- [ ] Verify health endpoint: `/health`
- [ ] Test API root: `/`
- [ ] Verify CORS is working
- [ ] Check logs for errors
- [ ] Test authentication endpoints
- [ ] Verify database connection

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Verify build completes without errors
- [ ] Test production build locally: `npm run preview`
- [ ] Deploy frontend
- [ ] Verify frontend loads
- [ ] Test API connection from frontend
- [ ] Check browser console for errors

## Post-Deployment

### Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test AI chat functionality
- [ ] Test mood tracking
- [ ] Test journal creation
- [ ] Test crisis resources
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test dark mode
- [ ] Test all navigation routes

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Configure alerts for errors
- [ ] Monitor API response times
- [ ] Check database performance

### Documentation
- [ ] Update README with deployment info
- [ ] Document environment variables
- [ ] Document API endpoints
- [ ] Create user guide (if needed)
- [ ] Document troubleshooting steps

## Performance

- [ ] Enable Gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up caching headers
- [ ] Optimize images
- [ ] Enable HTTP/2
- [ ] Test page load times
- [ ] Optimize bundle size

## Security Review

- [ ] Review authentication flow
- [ ] Test password requirements
- [ ] Verify JWT tokens expire correctly
- [ ] Test rate limiting (if implemented)
- [ ] Review API security
- [ ] Check for SQL injection vulnerabilities
- [ ] Verify input validation
- [ ] Test XSS protection

## Backup & Recovery

- [ ] Set up automated database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Set up monitoring for backups

## Final Checks

- [ ] All tests passing
- [ ] No console errors
- [ ] All features working
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Monitoring configured
- [ ] Documentation complete

---

## Quick Test Commands

```bash
# Test backend health
curl https://your-backend-url.com/health

# Test API root
curl https://your-backend-url.com/

# Test frontend
curl https://your-frontend-url.com/
```

---

**Status**: Ready for production deployment ✅

