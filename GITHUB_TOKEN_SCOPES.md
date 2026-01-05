# 🔑 Required GitHub Token Scopes for MindAlchemy

## ✅ Required Scopes

For deploying MindAlchemy to GitHub, you need to check **TWO scopes**:

### 1. `repo` - Full control of private repositories ✅
- **Status:** Already checked on your token
- **What it does:** Allows you to push code, create repositories, manage repository settings
- **Includes automatically:**
  - `repo:status` - Access commit status
  - `repo_deployment` - Access deployment status
  - `public_repo` - Access public repositories
  - `repo:invite` - Access repository invitations
  - `security_events` - Read and write security events

### 2. `workflow` - Update GitHub Action workflows ❌
- **Status:** **NOT CHECKED** - You need to check this!
- **What it does:** Allows you to push GitHub Actions workflow files (`.github/workflows/`)
- **Why needed:** Your project has GitHub Actions workflows for automated deployment
- **Files affected:** `.github/workflows/deploy-backend.yml` and `.github/workflows/deploy-frontend.yml`

---

## 📋 Quick Checklist

On your GitHub token settings page:

- [x] ✅ `repo` - Full control of private repositories (ALREADY CHECKED)
- [ ] ❌ `workflow` - Update GitHub Action workflows (**CHECK THIS!**)

---

## 🚀 After Checking `workflow`

1. Scroll to bottom of the page
2. Click **"Update token"** button
3. Your token will be updated with the new scope
4. Re-run the push script:
   ```powershell
   .\push-to-github-now.ps1 -GitHubToken YOUR_TOKEN
   ```

---

## 🔒 Security Note

These are the **minimum required scopes** for deployment. You don't need any other scopes like:
- ❌ `admin:org` - Not needed
- ❌ `gist` - Not needed
- ❌ `notifications` - Not needed
- ❌ `user` - Not needed
- ❌ Any other scopes - Not needed

**Only `repo` and `workflow` are required!**

---

## ✅ Summary

**Total scopes needed: 2**
- ✅ `repo` (already checked)
- ❌ `workflow` (check this now!)

That's it! Simple and secure. 🎉

