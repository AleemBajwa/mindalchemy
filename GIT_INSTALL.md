# Git Installation Guide

The deployment script detected that Git is not installed on your system. You'll need Git to push your code to GitHub.

## Quick Install

### Option 1: Download Git for Windows
1. Go to: https://git-scm.com/download/win
2. Download the installer
3. Run the installer (use default settings)
4. Restart your terminal/PowerShell
5. Verify: `git --version`

### Option 2: Install via Winget (Windows Package Manager)
```powershell
winget install --id Git.Git -e --source winget
```

### Option 3: Install via Chocolatey
```powershell
choco install git
```

## After Installing Git

1. **Restart your terminal/PowerShell**
2. **Verify installation**:
   ```powershell
   git --version
   ```
3. **Configure Git** (first time only):
   ```powershell
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
4. **Re-run the deployment script**:
   ```powershell
   .\setup-deployment.ps1
   ```

## Alternative: Use GitHub Desktop

If you prefer a GUI:
1. Download: https://desktop.github.com
2. Sign in with your GitHub account
3. Use "Add Local Repository" to add your project
4. Push from the GUI

---

**Note**: The deployment script will work without Git, but you'll need Git installed to push your code to GitHub for deployment.

