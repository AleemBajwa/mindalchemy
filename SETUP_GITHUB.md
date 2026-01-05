# 📦 Setting Up GitHub Repository

Quick guide to get your code on GitHub for deployment.

---

## Option 1: Create New Repository

### On GitHub:
1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name it: `mindalchemy` (or your preferred name)
4. Choose: **Public** or **Private**
5. **Don't** initialize with README (we already have files)
6. Click **"Create repository"**

### On Your Computer:
```bash
# Navigate to your project
cd "D:\AI Therapist"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Production ready"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mindalchemy.git

# Push
git branch -M main
git push -u origin main
```

---

## Option 2: Use Existing Repository

If you already have a GitHub repository:

```bash
# Navigate to your project
cd "D:\AI Therapist"

# Check if git is initialized
git status

# If not initialized:
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Add and commit
git add .
git commit -m "Production deployment ready"

# Push
git push -u origin main
```

---

## Option 3: GitHub Desktop (GUI)

1. Download [GitHub Desktop](https://desktop.github.com)
2. Sign in with your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Select: `D:\AI Therapist`
5. Click **"Publish repository"**
6. Choose name and visibility
7. Click **"Publish Repository"**

---

## Verify

After pushing, visit:
`https://github.com/YOUR_USERNAME/YOUR_REPO`

You should see all your files!

---

## Next Steps

Once your code is on GitHub:

1. **Deploy Backend**: See `ONE_CLICK_DEPLOY.md` → Step 2
2. **Deploy Frontend**: See `ONE_CLICK_DEPLOY.md` → Step 3

---

**Ready to deploy!** 🚀

