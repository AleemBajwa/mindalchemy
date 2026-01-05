# 🚀 Run These Scripts - Simple Guide

Follow these scripts in order to deploy your application.

---

## Step 1: Setup & Prepare (Run Once)

```powershell
.\setup-deployment.ps1
```

**What it does:**
- Initializes Git
- Creates .gitignore
- Generates SECRET_KEY
- Creates backend/.env
- Creates frontend/.env
- Builds frontend

**Time:** ~2-3 minutes

---

## Step 2: Push to GitHub

### Option A: Using Script (Recommended)

**First, get your GitHub token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select `repo` scope
4. Copy the token

**Then run:**
```powershell
.\push-to-github.ps1 -GitHubRepo "https://github.com/YOUR_USERNAME/YOUR_REPO.git" -GitHubToken "YOUR_TOKEN_HERE"
```

**Replace:**
- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO` - Your repository name
- `YOUR_TOKEN_HERE` - Your GitHub token

### Option B: Manual (If script doesn't work)

```powershell
git add .
git commit -m "Production deployment ready"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Time:** ~1 minute

---

## Step 3: Deploy Backend to Railway

**Go to:** https://railway.app

1. Sign up/Login with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. **Settings:**
   - Root Directory: `backend`
6. **Add Environment Variables:**
   - `GROQ_API_KEY` = Your Groq API key
   - `SECRET_KEY` = (from Step 1 output)
   - `ENVIRONMENT` = `production`
   - `DEBUG` = `False`
   - `CORS_ORIGINS` = `https://placeholder.vercel.app` (update after Step 4)
7. Wait for deployment (~2-3 minutes)
8. **Copy your Railway URL:** `https://your-app.railway.app`

**Time:** ~5 minutes

---

## Step 4: Deploy Frontend to Vercel

**Go to:** https://vercel.com

1. Sign up/Login with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. **Settings:**
   - Framework Preset: `Vite` (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
5. **Add Environment Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-url.railway.app/api`
   *(Use your Railway URL from Step 3)*
6. Click "Deploy"
7. Wait for deployment (~2-3 minutes)
8. **Copy your Vercel URL:** `https://your-app.vercel.app`

**Time:** ~3 minutes

---

## Step 5: Update CORS in Railway

**Go back to Railway:**

1. Open your backend service
2. Go to "Variables" tab
3. Update `CORS_ORIGINS`:
   - Value: `https://your-vercel-url.vercel.app`
   *(Use your Vercel URL from Step 4)*
4. Railway will auto-redeploy (~1-2 minutes)

**Time:** ~2 minutes

---

## Step 6: Test Your Deployment

1. **Test Backend:**
   - Visit: `https://your-railway-url.railway.app/health`
   - Should see: `{"status": "healthy"}`

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try registering a new account
   - Test login
   - Test chat functionality

**Time:** ~2 minutes

---

## 🎯 Quick Summary - All Commands

```powershell
# 1. Setup
.\setup-deployment.ps1

# 2. Push to GitHub (replace with your details)
.\push-to-github.ps1 -GitHubRepo "https://github.com/YOUR_USERNAME/YOUR_REPO.git" -GitHubToken "YOUR_TOKEN"

# 3-6. Follow web UI steps in Railway and Vercel (see above)
```

---

## ⚡ All-in-One Script (Alternative)

If you have all your credentials ready:

```powershell
.\deploy-all.ps1 -GitHubRepo "https://github.com/YOUR_USERNAME/YOUR_REPO.git" -GitHubToken "YOUR_TOKEN" -GroqAPIKey "YOUR_GROQ_KEY"
```

This runs Step 1 and Step 2 automatically, then you do Steps 3-6 in the web UIs.

---

## 📋 What You Need

Before starting, make sure you have:

- [ ] GitHub account
- [ ] GitHub Personal Access Token (see GITHUB_AUTH.md)
- [ ] Groq API Key (from console.groq.com)
- [ ] Railway account (sign up at railway.app)
- [ ] Vercel account (sign up at vercel.com)

---

## ⏱️ Total Time

- **Scripts:** ~5 minutes
- **Railway deployment:** ~5 minutes
- **Vercel deployment:** ~3 minutes
- **CORS update:** ~2 minutes
- **Testing:** ~2 minutes

**Total: ~17 minutes**

---

## 🆘 Troubleshooting

**Script fails?**
- Check GIT_INSTALL.md if Git is missing
- Check GITHUB_AUTH.md for token issues

**Railway fails?**
- Check environment variables are set
- Verify GROQ_API_KEY is correct
- Check Railway logs

**Vercel fails?**
- Verify VITE_API_URL is correct
- Check build logs in Vercel
- Ensure Root Directory is `frontend`

**Frontend can't connect?**
- Check CORS_ORIGINS includes Vercel URL
- Verify VITE_API_URL includes `/api`
- Check Railway logs for CORS errors

---

**That's it! Follow these steps and your app will be live!** 🚀

