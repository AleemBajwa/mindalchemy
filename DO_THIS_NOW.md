# 🚀 DO THIS NOW - Step by Step

## ✅ Step 1: Create Vercel Postgres Database (2 minutes)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Make sure you're logged in

2. **Create Database:**
   - Click **"Storage"** in the left sidebar
   - Click **"Create Database"**
   - Select **"Postgres"**
   - Choose **"Hobby"** plan (Free tier)
   - Name it: `mindalchemy-db`
   - Select region closest to you
   - Click **"Create"**

3. **Get Connection String:**
   - Click on your newly created database
   - Go to **".env.local"** tab
   - **Copy the `POSTGRES_URL`** value
   - Save it somewhere - you'll need it in Step 3!

---

## ✅ Step 2: Deploy to Vercel (5 minutes)

### Option A: Using PowerShell Script (Easiest) ⭐

Open PowerShell in your project directory and run:

```powershell
.\deploy-vercel-backend.ps1
```

This will:
- Check if Vercel CLI is installed
- Login to Vercel (if needed)
- Deploy your project

### Option B: Using Vercel CLI Directly

```powershell
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option C: Using GitHub (Recommended for auto-deploy)

1. **Push code to GitHub** (if not already):
   ```powershell
   git add .
   git commit -m "Migrate backend to Vercel"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** `./` (root)
     - **Build Command:** `cd frontend && npm install && npm run build`
     - **Output Directory:** `frontend/dist`
   - Click **"Deploy"**

**After deployment, note your project URL!** (e.g., `https://mindalchemy.vercel.app`)

---

## ✅ Step 3: Set Environment Variables (3 minutes)

1. **Go to Vercel Dashboard:**
   - Click on your deployed project
   - Go to **"Settings"** tab
   - Click **"Environment Variables"**

2. **Add these variables:**

   **a) POSTGRES_URL**
   ```
   POSTGRES_URL=postgres://user:pass@host:5432/dbname
   ```
   *(Paste the value you copied in Step 1)*

   **b) GROQ_API_KEY**
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Your Groq API key from console.groq.com)*

   **c) SECRET_KEY**
   ```
   SECRET_KEY=your_secret_key_change_in_production_12345678901234567890
   ```
   *(Generate a random string - use this for JWT tokens)*

   **d) CORS_ORIGINS**
   ```
   CORS_ORIGINS=https://your-project.vercel.app,http://localhost:5173
   ```
   *(Replace `your-project` with your actual Vercel project name)*

3. **Important:** After adding all variables, click **"Redeploy"** or go to **"Deployments"** and redeploy the latest deployment!

---

## ✅ Step 4: Initialize Database (1 minute)

After redeploying with environment variables:

1. **Visit the migration endpoint:**
   ```
   https://your-project.vercel.app/api/migrate/init
   ```

2. **You should see:**
   ```json
   {
     "success": true,
     "message": "Database initialized successfully!",
     "tables": ["users", "sessions", "mood_logs", ...]
   }
   ```

3. **If you see an error:**
   - Check that `POSTGRES_URL` is set correctly
   - Make sure you redeployed after adding environment variables
   - Check Vercel logs for details

---

## ✅ Step 5: Update Frontend API URL (2 minutes)

**If frontend and backend are in the SAME Vercel project:**
- No changes needed! Frontend will use `/api` automatically ✅

**If frontend is SEPARATE:**

1. Go to **Frontend Project → Settings → Environment Variables**
2. Add/Update:
   ```
   VITE_API_URL=https://your-backend-project.vercel.app/api
   ```
   *(Replace with your actual backend URL)*
3. **Redeploy frontend**

---

## ✅ Step 6: Test Everything! (2 minutes)

1. **Visit your app:**
   ```
   https://your-project.vercel.app
   ```

2. **Test these:**
   - ✅ Register a new user
   - ✅ Login
   - ✅ AI Chat (test Groq integration)
   - ✅ Mood tracking
   - ✅ Journal entries

3. **If something doesn't work:**
   - Check Vercel logs: **Project → Deployments → Click deployment → Logs**
   - Check browser console for errors
   - Verify environment variables are set

---

## 🎉 Done!

Your backend is now on Vercel with PostgreSQL! No more Railway errors! 🚀

---

## 🐛 Troubleshooting

### "Module not found: mangum"
- Make sure `api/requirements.txt` exists
- Redeploy

### "Database connection failed"
- Double-check `POSTGRES_URL` is correct
- Make sure Vercel Postgres is running
- Redeploy after setting environment variables

### "CORS error"
- Update `CORS_ORIGINS` to include your frontend URL
- Redeploy

### "Function timeout"
- Vercel free tier: 10 seconds max
- Groq API calls might be slow
- Consider upgrading to Pro (60 seconds) if needed

---

## 📞 Need Help?

Check these files:
- `QUICK_VERCEL_DEPLOY.md` - Quick reference
- `DEPLOY_VERCEL_BACKEND.md` - Detailed guide

**You've got this!** 🎯
