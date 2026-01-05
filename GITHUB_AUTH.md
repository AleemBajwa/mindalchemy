# GitHub Authentication Guide

To push code to GitHub, you need to authenticate. Here are your options:

## Option 1: GitHub Personal Access Token (Recommended)

### Create a Token:
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `MindAlchemy Deployment`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### Use the Token:
```powershell
.\push-to-github.ps1 -GitHubRepo "https://github.com/YOUR_USERNAME/YOUR_REPO.git" -GitHubToken "your_token_here"
```

---

## Option 2: GitHub CLI (gh)

### Install GitHub CLI:
```powershell
winget install GitHub.cli
```

### Login:
```powershell
gh auth login
```
Follow the prompts to authenticate.

### Then push:
```powershell
.\push-to-github.ps1 -GitHubRepo "https://github.com/YOUR_USERNAME/YOUR_REPO.git"
```

---

## Option 3: GitHub Desktop (Easiest - No Command Line)

1. Download: https://desktop.github.com
2. Sign in with your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Select: `D:\AI Therapist`
5. Click **"Publish repository"**
6. Choose name and visibility
7. Click **"Publish Repository"**

Done! No tokens or command line needed.

---

## Option 4: SSH Keys

### Generate SSH Key:
```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Add to GitHub:
1. Copy your public key: `cat ~/.ssh/id_ed25519.pub`
2. Go to: https://github.com/settings/keys
3. Click **"New SSH key"**
4. Paste your key
5. Save

### Use SSH URL:
```powershell
.\push-to-github.ps1 -GitHubRepo "git@github.com:YOUR_USERNAME/YOUR_REPO.git"
```

---

## Quick Start (Easiest Method)

**Use GitHub Desktop:**
1. Install: https://desktop.github.com
2. Add local repository
3. Publish to GitHub
4. Done!

**Or use Personal Access Token:**
1. Create token: https://github.com/settings/tokens
2. Run: `.\push-to-github.ps1 -GitHubRepo "YOUR_REPO_URL" -GitHubToken "YOUR_TOKEN"`

---

## Troubleshooting

**"Authentication failed"?**
- Check your token is valid
- Ensure token has `repo` scope
- Try using GitHub Desktop instead

**"Repository not found"?**
- Create the repository on GitHub first
- Check the repository URL is correct
- Ensure you have access to the repository

**Need help?**
- See GitHub docs: https://docs.github.com/en/authentication

