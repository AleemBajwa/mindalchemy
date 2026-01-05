# 🚀 MindAlchemy - Deployment Guide

## Production Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard**:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app/api`)

4. **Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Backend Deployment (Railway/Render)

**Railway:**
1. Connect your GitHub repository
2. Create new project
3. Add service → Deploy from GitHub repo
4. Set root directory to `backend`
5. Add environment variables (see `.env.example`)
6. Railway will auto-detect Python and install dependencies

**Render:**
1. Create new Web Service
2. Connect GitHub repository
3. Set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
4. Add environment variables

---

### Option 2: Docker Deployment (Full Stack)

#### Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

---

### Option 3: Traditional Server Deployment

#### Prerequisites
- Python 3.11+ installed
- Node.js 18+ installed
- Nginx (for reverse proxy)
- PM2 or systemd (for process management)

#### Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Run with Gunicorn** (Production WSGI server):
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
   ```

#### Frontend Setup

1. **Build for Production**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Serve with Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       root /path/to/frontend/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

---

## Environment Variables

### Backend (.env)

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant

# Database
DATABASE_URL=sqlite:///./ai_therapist.db
# For PostgreSQL in production:
# DATABASE_URL=postgresql://user:password@localhost:5432/mindalchemy

# JWT Security
SECRET_KEY=your_very_long_random_secret_key_here_minimum_32_characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Application
ENVIRONMENT=production
DEBUG=False

# CORS (comma-separated list)
CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

### Frontend (.env)

```env
# API URL
VITE_API_URL=https://your-backend-domain.com/api

# Environment
VITE_ENVIRONMENT=production
```

---

## Production Checklist

### Security
- [ ] Change `SECRET_KEY` to a strong random string (minimum 32 characters)
- [ ] Set `DEBUG=False` in production
- [ ] Configure CORS origins properly
- [ ] Use HTTPS (SSL/TLS certificates)
- [ ] Enable rate limiting on API endpoints
- [ ] Set secure cookie flags
- [ ] Review and restrict CORS origins

### Database
- [ ] Backup database before deployment
- [ ] Consider migrating to PostgreSQL for production
- [ ] Set up database migrations
- [ ] Configure database backups

### Performance
- [ ] Enable Gzip compression
- [ ] Configure CDN for static assets
- [ ] Set up caching headers
- [ ] Optimize images and assets
- [ ] Enable HTTP/2

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Configure alerts

### Testing
- [ ] Test all critical user flows
- [ ] Verify API endpoints
- [ ] Test authentication flow
- [ ] Verify crisis resources work
- [ ] Test on multiple browsers/devices

---

## Quick Deploy Commands

### Local Production Build Test

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run build
npm run preview  # Test production build locally
```

---

## Post-Deployment

1. **Verify Health Check**:
   - Visit: `https://your-backend-domain.com/health`
   - Should return: `{"status": "healthy"}`

2. **Test API**:
   - Visit: `https://your-backend-domain.com/`
   - Should return API info

3. **Test Frontend**:
   - Visit your frontend URL
   - Test login/registration
   - Verify API connection

4. **Monitor Logs**:
   - Check for errors
   - Monitor API response times
   - Watch for any warnings

---

## Troubleshooting

### Backend Issues
- Check logs: `docker-compose logs backend` or check your server logs
- Verify environment variables are set correctly
- Ensure database is accessible
- Check CORS configuration

### Frontend Issues
- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Verify build completed successfully
- Check network tab for API calls

### Database Issues
- Ensure database file has correct permissions
- For SQLite: ensure write permissions
- For PostgreSQL: verify connection string

---

## Support

For deployment issues, check:
1. Application logs
2. Server logs
3. Browser console
4. Network requests

---

**Last Updated**: 2026-01-03

