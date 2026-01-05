# 🚀 Automated Deployment Script

This guide will help you deploy your application to GitHub, Railway, and Vercel.

## Prerequisites

1. **GitHub Account** - [github.com](https://github.com)
2. **Vercel Account** - [vercel.com](https://vercel.com) (sign up with GitHub)
3. **Railway Account** - [railway.app](https://railway.app) (sign up with GitHub)
4. **Git installed** on your computer

---

## Step 1: Push to GitHub

### If you don't have a GitHub repository yet:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Production ready"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If you already have a repository:

```bash
git add .
git commit -m "Production deployment ready"
git push origin main
```

---

## Step 2: Deploy Backend to Railway

### Option A: Using Railway Dashboard (Easiest)

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will auto-detect it's a Python project
6. Set the **Root Directory** to `backend`
7. Add these environment variables:
   ```
   GROQ_API_KEY=your_groq_api_key
   SECRET_KEY=your_random_secret_key_32_chars_min
   ENVIRONMENT=production
   DEBUG=False
   CORS_ORIGINS=https://your-vercel-url.vercel.app
   ```
8. Railway will automatically deploy!
9. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project (or create new)
railway link

# Set environment variables
railway variables set GROQ_API_KEY=your_key
railway variables set SECRET_KEY=your_secret
railway variables set ENVIRONMENT=production
railway variables set DEBUG=False

# Deploy
railway up
```

---

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
5. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.railway.app/api`
6. Click **"Deploy"**
7. Vercel will deploy and give you a URL!

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No (first time)
# - Project name? mindalchemy-frontend
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add VITE_API_URL
# Enter: https://your-railway-url.railway.app/api

# Deploy to production
vercel --prod
```

---

## Step 4: Update CORS in Railway

After you get your Vercel URL:

1. Go to Railway dashboard
2. Open your backend service
3. Go to **Variables**
4. Update `CORS_ORIGINS` to include your Vercel URL:
   ```
   https://your-app.vercel.app,https://your-app.vercel.app
   ```
5. Railway will automatically redeploy

---

## Step 5: Test Deployment

1. **Test Backend**:
   - Visit: `https://your-railway-url.railway.app/health`
   - Should see: `{"status": "healthy"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try registering a new account
   - Test login
   - Test chat functionality

---

## GitHub Actions (Optional - Automated Deployments)

If you want automatic deployments on every push:

### 1. Get Railway Token:
- Go to Railway → Account Settings → Tokens
- Create new token
- Copy the token

### 2. Get Vercel Tokens:
- Go to Vercel → Settings → Tokens
- Create new token
- Copy the token
- Get your Org ID and Project ID from Vercel dashboard

### 3. Add GitHub Secrets:
- Go to your GitHub repo → Settings → Secrets and variables → Actions
- Add these secrets:
  - `RAILWAY_TOKEN` - Your Railway token
  - `VERCEL_TOKEN` - Your Vercel token
  - `VERCEL_ORG_ID` - Your Vercel organization ID
  - `VERCEL_PROJECT_ID` - Your Vercel project ID
  - `VITE_API_URL` - Your Railway backend URL + `/api`

### 4. Push to GitHub:
```bash
git push origin main
```

GitHub Actions will automatically deploy!

---

## Quick Commands Summary

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to production"
git push origin main

# 2. Deploy Backend (Railway CLI)
cd backend
railway up

# 3. Deploy Frontend (Vercel CLI)
cd frontend
vercel --prod
```

---

## Troubleshooting

**Backend not starting?**
- Check Railway logs
- Verify environment variables are set
- Check `GROQ_API_KEY` is valid

**Frontend can't connect?**
- Verify `VITE_API_URL` is correct in Vercel
- Check CORS settings in Railway
- Ensure backend URL includes `/api`

**GitHub Actions failing?**
- Check secrets are set correctly
- Verify tokens are valid
- Check workflow logs in Actions tab

---

## Need Help?

1. Check Railway logs: Railway dashboard → Your service → Logs
2. Check Vercel logs: Vercel dashboard → Your project → Deployments → View logs
3. Check GitHub Actions: Your repo → Actions tab

---

**You're all set! Your app will be live in minutes!** 🚀

