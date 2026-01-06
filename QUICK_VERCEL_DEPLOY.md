# 🚀 Quick Deploy to Vercel - Step by Step

## ✅ Your Backend is Ready for Vercel!

All code changes are done. Now just follow these steps:

---

## Step 1: Create Vercel Postgres Database (2 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** (left sidebar)
3. Click **Create Database**
4. Select **Postgres**
5. Choose **Hobby** plan (Free)
6. Name: `mindalchemy-db`
7. Region: Choose closest to you
8. Click **Create**

**After creation:**
- Click on your database
- Go to **.env.local** tab
- **Copy the `POSTGRES_URL`** - you'll need it in Step 3

---

## Step 2: Deploy to Vercel (5 minutes)

### Option A: Using PowerShell Script (Easiest)

```powershell
.\deploy-vercel-backend.ps1
```

### Option B: Using Vercel CLI

```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option C: Using GitHub (Recommended for auto-deploy)

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

---

## Step 3: Set Environment Variables (3 minutes)

After deployment, go to:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

```
POSTGRES_URL=postgres://user:pass@host:5432/dbname
```
*(Copy from Step 1)*

```
GROQ_API_KEY=your_groq_api_key_here
```

```
SECRET_KEY=your_secret_key_change_in_production_12345678901234567890
```
*(Generate a random string)*

```
CORS_ORIGINS=https://your-project.vercel.app,http://localhost:5173
```
*(Replace `your-project` with your actual Vercel project name)*

**Important:** After adding variables, **redeploy** your project!

---

## Step 4: Initialize Database (1 minute)

After deployment and setting environment variables:

1. Visit: `https://your-project.vercel.app/api/migrate/init`
2. You should see: `{"success": true, "message": "Database initialized successfully!"}`
3. Done! ✅

---

## Step 5: Update Frontend API URL (2 minutes)

**If frontend and backend are in the same Vercel project:**

The frontend will automatically use `/api` (same domain), so no changes needed!

**If frontend is separate:**

1. Go to **Frontend Project → Settings → Environment Variables**
2. Add/Update:
   ```
   VITE_API_URL=https://your-backend-project.vercel.app/api
   ```
3. Redeploy frontend

---

## Step 6: Test! (1 minute)

1. Visit your deployed app: `https://your-project.vercel.app`
2. Try registering a new user
3. Try logging in
4. Test AI chat

---

## ✅ Done!

Your backend is now on Vercel with PostgreSQL! 🎉

---

## 🐛 Troubleshooting

### "Module not found: mangum"
- Make sure `api/requirements.txt` exists
- Redeploy

### "Database connection failed"
- Check `POSTGRES_URL` is set correctly
- Make sure Vercel Postgres is running
- Redeploy after setting environment variables

### "CORS error"
- Update `CORS_ORIGINS` to include your frontend URL
- Redeploy

### "Function timeout"
- Vercel free tier: 10 seconds max
- Groq API calls might be slow
- Consider upgrading to Pro (60 seconds)

---

## 📊 What Changed?

✅ **Database:** SQLite → PostgreSQL (Vercel Postgres)
✅ **Deployment:** Railway → Vercel Serverless
✅ **No more Railway errors!** 🎉

---

## 🎯 Next Steps

1. Test all features
2. Monitor Vercel logs for any issues
3. Set up custom domain (optional)
4. Enable Vercel Analytics (optional)

**You're all set!** 🚀

