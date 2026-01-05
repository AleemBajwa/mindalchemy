# 🚀 Quick Deployment Guide

## Fastest Deployment Options

### Option 1: Railway (Recommended - Easiest)

#### Backend Deployment:
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Python
6. Add environment variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `SECRET_KEY`: Generate with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
   - `ENVIRONMENT`: `production`
   - `DEBUG`: `False`
7. Deploy! Railway provides a URL like: `https://your-app.railway.app`

#### Frontend Deployment:
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your repository
5. Set root directory to `frontend`
6. Add environment variable:
   - `VITE_API_URL`: Your Railway backend URL + `/api` (e.g., `https://your-app.railway.app/api`)
7. Deploy!

**Total time: ~10 minutes**

---

### Option 2: Render (Alternative)

#### Backend:
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo
4. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
5. Add environment variables (same as Railway)
6. Deploy!

#### Frontend:
1. Create new "Static Site" on Render
2. Connect GitHub repo
3. Set root directory to `frontend`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy!

---

### Option 3: Docker (Local/Server)

```bash
# 1. Create .env file
cp backend/.env.example backend/.env
# Edit backend/.env with your values

# 2. Build and run
docker-compose up -d

# 3. Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## Environment Variables Checklist

### Backend (Required):
- ✅ `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
- ✅ `SECRET_KEY` - Generate random 32+ character string
- ✅ `ENVIRONMENT=production`
- ✅ `DEBUG=False`

### Frontend (Required):
- ✅ `VITE_API_URL` - Your backend URL + `/api`

---

## Post-Deployment Steps

1. **Test Backend**:
   - Visit: `https://your-backend-url.com/health`
   - Should see: `{"status": "healthy"}`

2. **Test Frontend**:
   - Visit your frontend URL
   - Try registering a new account
   - Test login

3. **Verify API Connection**:
   - Open browser console
   - Check for any API errors
   - Test a chat message

---

## Troubleshooting

**Backend not starting?**
- Check environment variables are set
- Verify `GROQ_API_KEY` is valid
- Check logs in Railway/Render dashboard

**Frontend can't connect to API?**
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend URL includes `/api` path

**Database issues?**
- SQLite works for small deployments
- For production, consider PostgreSQL
- Railway/Render can add PostgreSQL easily

---

## Need Help?

1. Check `DEPLOYMENT.md` for detailed instructions
2. Review application logs
3. Check browser console for errors
4. Verify all environment variables are set

---

**Ready to deploy? Start with Railway + Vercel for the fastest setup!** 🚀

