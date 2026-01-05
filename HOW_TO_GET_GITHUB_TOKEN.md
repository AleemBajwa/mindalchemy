# 🔑 How to Get GitHub Personal Access Token

Step-by-step guide to create a GitHub Personal Access Token for deployment.

---

## Step-by-Step Instructions

### Step 1: Go to GitHub Settings
1. Open your browser
2. Go to: **https://github.com/settings/tokens**
3. Or navigate manually:
   - Click your profile picture (top right)
   - Click **"Settings"**
   - Scroll down to **"Developer settings"** (left sidebar)
   - Click **"Personal access tokens"**
   - Click **"Tokens (classic)"**

### Step 2: Generate New Token
1. Click the **"Generate new token"** button
2. Select **"Generate new token (classic)"** (not fine-grained)
   - *Note: Fine-grained tokens are newer but classic tokens work better for automation*

### Step 3: Configure Token
Fill in the form:

**Note:** 
- Give it a descriptive name like: `MindAlchemy Deployment` or `AI Therapist Deploy`

**Expiration:**
- Choose: **"No expiration"** (for permanent use)
- Or: **"90 days"** / **"Custom"** (if you prefer expiration)

**Select scopes (permissions):**
Check these boxes:
- ✅ **`repo`** - Full control of private repositories
  - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
- ✅ **`workflow`** - Update GitHub Action workflows (optional, for CI/CD)

**That's all you need!** The `repo` scope is the most important one.

### Step 4: Generate and Copy Token
1. Scroll down and click **"Generate token"** (green button at bottom)
2. **⚠️ IMPORTANT:** Copy the token immediately!
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You'll see it only once - GitHub won't show it again!
   - If you lose it, you'll need to create a new one

3. **Save it somewhere safe:**
   - Copy to a text file
   - Or use a password manager
   - You'll need it for the deployment script

### Step 5: Use the Token
Now you can use this token in the deployment script:

```powershell
.\RUN_THIS_NOW.ps1
```

When prompted for "GitHub Personal Access Token", paste your token.

---

## Visual Guide

```
GitHub.com
  ↓
Your Profile Picture (top right)
  ↓
Settings
  ↓
Developer settings (left sidebar)
  ↓
Personal access tokens
  ↓
Tokens (classic)
  ↓
Generate new token (classic)
  ↓
Fill form → Generate token
  ↓
Copy token immediately!
```

---

## Token Format

Your token will look like this:
```
ghp_1234567890abcdefghijklmnopqrstuvwxyz123456
```

It starts with `ghp_` followed by a long string of characters.

---

## Security Tips

1. **Never share your token publicly**
   - Don't commit it to GitHub
   - Don't share it in screenshots
   - Don't post it online

2. **Use different tokens for different purposes**
   - One for deployment
   - One for development
   - One for CI/CD

3. **Revoke old tokens**
   - If you suspect a token is compromised
   - Go back to: https://github.com/settings/tokens
   - Click the token → Click "Revoke"

4. **Set expiration dates**
   - For production: Consider 90 days or custom
   - Rotate tokens regularly

---

## Troubleshooting

### "Token has expired"
- Create a new token
- Update it in your deployment script

### "Bad credentials"
- Check you copied the entire token
- Make sure there are no extra spaces
- Verify the token hasn't been revoked

### "Insufficient permissions"
- Make sure you selected the `repo` scope
- Check the token has the right permissions
- Create a new token with correct scopes

### "Can't find Developer settings"
- Make sure you're logged into GitHub
- Try direct link: https://github.com/settings/tokens

---

## Quick Link

**Direct link to create token:**
👉 https://github.com/settings/tokens/new

**Direct link to manage tokens:**
👉 https://github.com/settings/tokens

---

## Alternative: GitHub CLI

If you prefer using GitHub CLI instead:

1. Install: `winget install GitHub.cli`
2. Login: `gh auth login`
3. Follow prompts to authenticate
4. No token needed - CLI handles it!

---

## Ready to Deploy?

Once you have your token:

1. Run: `.\RUN_THIS_NOW.ps1`
2. Enter your GitHub username
3. Paste your token when prompted
4. Enter your Groq API key
5. Script does the rest!

---

**That's it! You now have a GitHub Personal Access Token!** 🎉

