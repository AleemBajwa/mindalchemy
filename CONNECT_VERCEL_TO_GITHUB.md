# 🔗 Connect Vercel to GitHub for Auto-Deploy

## ✅ Problem
Your Vercel project is **not connected to GitHub**, so it won't automatically deploy when you push code. You have to manually "Redeploy" each time.

## 🎯 Solution: Connect Vercel to GitHub

### Step 1: Go to Vercel Project Settings

1. Open your Vercel dashboard: https://vercel.com/dashboard
2. Click on your **`mindalchemy`** project
3. Click **Settings** (top navigation)
4. Click **Git** (left sidebar)

---

### Step 2: Connect GitHub Repository

**If you see "No Git Repository Connected":**

1. Click **"Connect Git Repository"** button
2. You'll see a list of your GitHub repositories
3. **Find and select** your repository (the one with `api/index.py`)
4. Click **"Import"** or **"Connect"**

**If you see a repository already listed but it's not working:**

1. Click **"Disconnect"** (if available)
2. Then click **"Connect Git Repository"** again
3. Select your repository
4. Click **"Import"**

---

### Step 3: Configure Auto-Deploy Settings

After connecting, you should see:

- **Production Branch:** `main` (should be selected)
- **Auto-deploy:** Should be **enabled** (toggle ON)

**Make sure:**
- ✅ Production Branch = `main`
- ✅ Auto-deploy = **ON** (green/enabled)

---

### Step 4: Test It!

1. **Make a small change** to any file (or just add a comment)
2. **Commit and push:**
   ```powershell
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. **Go back to Vercel** → **Deployments** tab
4. **You should see a NEW deployment starting automatically!** 🎉

---

## 🔍 How to Verify It's Connected

**In Vercel Project Settings → Git:**
- You should see your GitHub repository URL
- You should see "Production Branch: main"
- You should see "Auto-deploy: Enabled"

**In Vercel Deployments:**
- New deployments should show:
  - Git branch icon
  - Commit hash (e.g., `a639cfb`)
  - Commit message (e.g., "Fix Vercel Python handler for FastAPI")
  - NOT just "Redeploy of..."

---

## ⚠️ If You Can't Connect

**Possible issues:**

1. **GitHub permissions:**
   - Vercel needs access to your GitHub repos
   - Go to: https://github.com/settings/applications
   - Find "Vercel" in authorized apps
   - Make sure it has repo access

2. **Repository not found:**
   - Make sure the repo is **public**, OR
   - Make sure Vercel has access to your **private repos** (if it's private)

3. **Already connected to different repo:**
   - Disconnect the old one first
   - Then connect the correct one

---

## 🎯 After Connecting

Once connected, **every time you push to `main`**, Vercel will:
1. ✅ Automatically detect the push
2. ✅ Start a new deployment
3. ✅ Build and deploy your app
4. ✅ Make it live!

**No more manual redeploys needed!** 🚀

---

**Go to Vercel → Settings → Git and connect it now!**
