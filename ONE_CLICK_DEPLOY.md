# ⚡ One-Click Deployment Guide

This is the **fastest way** to deploy your application. Follow these steps in order.

---

## 🎯 Quick Overview

1. **Push code to GitHub** (2 minutes)
2. **Deploy backend to Railway** (5 minutes)
3. **Deploy frontend to Vercel** (3 minutes)
4. **Update CORS** (1 minute)
5. **Test** (2 minutes)

**Total time: ~13 minutes**

---

## 📋 Step-by-Step Instructions

### Step 1: Push to GitHub

```bash
# If you haven't initialized git:
git init
git add .
git commit -m "Production ready"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

**Or if you already have a repo:**
```bash
git add .
git commit -m "Production deployment"
git push origin main
```

---

### Step 2: Deploy Backend (Railway)

1. **Go to**: [railway.app](https://railway.app)
2. **Sign up** with GitHub (one click)
3. **Click**: "New Project" → "Deploy from GitHub repo"
4. **Select**: Your repository
5. **Settings**:
   - Root Directory: `backend`
   - Build Command: (auto-detected)
   - Start Command: (auto-detected)
6. **Add Variables** (click "Variables" tab):
   ```
   GROQ_API_KEY = your_groq_api_key_here
   SECRET_KEY = generate_random_32_char_string
   ENVIRONMENT = production
   DEBUG = False
   CORS_ORIGINS = https://placeholder.vercel.app
   ```
   *(We'll update CORS_ORIGINS after getting Vercel URL)*

7. **Wait for deployment** (2-3 minutes)
8. **Copy your Railway URL**: `https://your-app.railway.app`

---

### Step 3: Deploy Frontend (Vercel)

1. **Go to**: [vercel.com](https://vercel.com)
2. **Sign up** with GitHub (one click)
3. **Click**: "Add New Project"
4. **Import**: Your GitHub repository
5. **Configure**:
   - Framework Preset: **Vite** (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
6. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-url.railway.app/api`
   *(Use the Railway URL from Step 2)*

7. **Click**: "Deploy"
8. **Wait for deployment** (2-3 minutes)
9. **Copy your Vercel URL**: `https://your-app.vercel.app`

---

### Step 4: Update CORS

1. **Go back to Railway** dashboard
2. **Open** your backend service
3. **Click**: "Variables" tab
4. **Update** `CORS_ORIGINS`:
   ```
   https://your-app.vercel.app
   ```
   *(Use your Vercel URL from Step 3)*

5. **Railway will auto-redeploy** (1-2 minutes)

---

### Step 5: Test

1. **Visit your Vercel URL**
2. **Register** a new account
3. **Login**
4. **Test chat** - send a message
5. **Check backend health**: `https://your-railway-url.railway.app/health`

---

## 🔑 Generate SECRET_KEY

You need a random 32+ character string for `SECRET_KEY`. Generate one:

**Python:**
```python
import secrets
print(secrets.token_urlsafe(32))
```

**Online:**
- Visit: [randomkeygen.com](https://randomkeygen.com)
- Use "CodeIgniter Encryption Keys" (256-bit)

**Or use this PowerShell command:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

---

## ✅ Checklist

Before starting, make sure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Railway account (sign up with GitHub)
- [ ] Groq API key ([console.groq.com](https://console.groq.com))
- [ ] Generated SECRET_KEY (32+ characters)

---

## 🆘 Troubleshooting

**Railway deployment fails?**
- Check logs in Railway dashboard
- Verify `GROQ_API_KEY` is correct
- Ensure Root Directory is set to `backend`

**Vercel deployment fails?**
- Check build logs in Vercel
- Verify `VITE_API_URL` is correct
- Ensure Root Directory is set to `frontend`

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` includes `/api`
- Check CORS_ORIGINS includes your Vercel URL
- Check Railway logs for CORS errors

**Need help?**
- Railway docs: [docs.railway.app](https://docs.railway.app)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

## 🎉 You're Done!

Your application is now live at your Vercel URL!

**Next steps:**
- Share your app URL
- Monitor usage in Railway/Vercel dashboards
- Set up custom domain (optional)
- Enable GitHub Actions for auto-deploy (see `DEPLOY_SCRIPT.md`)

---

**That's it! Your app is deployed!** 🚀

