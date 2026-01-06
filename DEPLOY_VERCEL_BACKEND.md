# 🚀 Deploy Backend to Vercel - Complete Guide

## ✅ What's Changed

Your backend is now configured to work on **Vercel with PostgreSQL**!

### Changes Made:
1. ✅ Updated `database.py` - Supports PostgreSQL (Vercel Postgres)
2. ✅ Added `psycopg2-binary` - PostgreSQL driver
3. ✅ Added `mangum` - ASGI adapter for Vercel
4. ✅ Created `api/index.py` - Vercel serverless function handler
5. ✅ Updated `vercel.json` - Routes API requests to backend

---

## 📋 Step-by-Step Deployment

### Step 1: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres**
4. Choose **Hobby** (Free tier)
5. Name it: `mindalchemy-db`
6. Select region closest to you
7. Click **Create**

### Step 2: Get Database Connection String

After creating the database:
1. Click on your database
2. Go to **.env.local** tab
3. Copy the `POSTGRES_URL` value
4. You'll need this in Step 4

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```powershell
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Option B: Using GitHub Integration**

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Add New Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (root)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
6. Click **Deploy**

### Step 4: Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

Add these variables:

```
# Database (from Step 2)
POSTGRES_URL=postgres://user:pass@host:5432/dbname

# Groq API
GROQ_API_KEY=your_groq_api_key_here

# JWT Secret
SECRET_KEY=your_secret_key_change_in_production_12345678901234567890

# CORS (your frontend URL)
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173

# Frontend API URL (will be your Vercel backend URL)
VITE_API_URL=https://your-project.vercel.app/api
```

**Important:**
- Replace `your-project.vercel.app` with your actual Vercel project URL
- Set `VITE_API_URL` to point to your Vercel backend (same domain!)

### Step 5: Initialize Database

After deployment, initialize the database:

1. Go to your Vercel project → **Functions** tab
2. Find the `/api` function
3. Or use Vercel CLI:

```powershell
# Create a one-time script to initialize DB
vercel env pull .env.local

# Run initialization (you'll need to do this via a migration endpoint or Vercel CLI)
```

**Better: Create a migration endpoint**

I'll create a one-time migration script you can run.

### Step 6: Update Frontend API URL

In Vercel Dashboard → Your Frontend Project → Environment Variables:

Update `VITE_API_URL` to:
```
https://your-backend-project.vercel.app/api
```

Or if frontend and backend are in the same Vercel project:
```
https://your-project.vercel.app/api
```

---

## 🔧 Local Development

For local development, you can still use SQLite:

1. Create `backend/.env`:
```env
DATABASE_URL=sqlite:///./ai_therapist.db
GROQ_API_KEY=your_key
SECRET_KEY=your_secret
```

2. Run locally:
```powershell
cd backend
python -m uvicorn app.main:app --reload
```

---

## 🎯 Quick Deploy Script

I'll create a PowerShell script to automate this!

---

## ⚠️ Important Notes

1. **Database Migration:**
   - Your existing SQLite data won't automatically migrate
   - You'll need to export from SQLite and import to PostgreSQL
   - Or start fresh (users will need to re-register)

2. **Cold Starts:**
   - First request after inactivity may be slower (1-2 seconds)
   - Subsequent requests are fast

3. **Function Timeout:**
   - Vercel free tier: 10 seconds
   - Pro tier: 60 seconds
   - Long Groq API calls might timeout on free tier

4. **Same Domain:**
   - If frontend and backend are on same Vercel project, CORS is easier
   - Use relative URLs: `/api/...` instead of full URLs

---

## 🐛 Troubleshooting

### Error: "Module not found: mangum"
- Make sure `mangum==0.17.0` is in `backend/requirements.txt`
- Redeploy

### Error: "Database connection failed"
- Check `POSTGRES_URL` environment variable
- Make sure Vercel Postgres is created and running

### Error: "CORS error"
- Update `CORS_ORIGINS` to include your frontend URL
- Redeploy backend

### Error: "Function timeout"
- Groq API calls might be too slow
- Consider upgrading to Vercel Pro (60s timeout)

---

## ✅ Next Steps

1. Create Vercel Postgres database
2. Deploy to Vercel
3. Set environment variables
4. Initialize database
5. Update frontend API URL
6. Test!

Let me know when you're ready and I'll help with the deployment! 🚀

