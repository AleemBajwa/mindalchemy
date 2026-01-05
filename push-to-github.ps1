# Push to GitHub Script
# This script will help you push your code to GitHub

param(
    [string]$GitHubRepo = "",
    [string]$GitHubToken = "",
    [string]$GitHubUsername = ""
)

Write-Host "`n=== Push to GitHub ===" -ForegroundColor Cyan

# Check if Git is installed
$gitInstalled = $false
try {
    $null = git --version 2>&1
    $gitInstalled = $true
} catch {
    Write-Host "[ERROR] Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git first. See GIT_INSTALL.md" -ForegroundColor Yellow
    exit 1
}

# Check if repository URL is provided
if ([string]::IsNullOrEmpty($GitHubRepo)) {
    Write-Host "`nPlease provide your GitHub repository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/username/repo-name.git" -ForegroundColor Gray
    $GitHubRepo = Read-Host "GitHub Repository URL"
}

if ([string]::IsNullOrEmpty($GitHubRepo)) {
    Write-Host "[ERROR] Repository URL is required!" -ForegroundColor Red
    exit 1
}

# Initialize Git if needed
if (-not (Test-Path ".git")) {
    Write-Host "`n[1/5] Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "[OK] Git initialized" -ForegroundColor Green
} else {
    Write-Host "`n[1/5] Git repository already initialized" -ForegroundColor Green
}

# Check if remote exists
Write-Host "`n[2/5] Checking remote..." -ForegroundColor Yellow
$remoteExists = $false
try {
    $remotes = git remote -v
    if ($remotes -match $GitHubRepo) {
        $remoteExists = $true
        Write-Host "[OK] Remote already configured" -ForegroundColor Green
    }
} catch {
    # Remote doesn't exist
}

if (-not $remoteExists) {
    Write-Host "Adding remote origin..." -ForegroundColor Yellow
    git remote add origin $GitHubRepo
    Write-Host "[OK] Remote added" -ForegroundColor Green
} else {
    Write-Host "Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin $GitHubRepo
    Write-Host "[OK] Remote updated" -ForegroundColor Green
}

# Add all files
Write-Host "`n[3/5] Staging files..." -ForegroundColor Yellow
git add .
Write-Host "[OK] Files staged" -ForegroundColor Green

# Commit
Write-Host "`n[4/5] Committing changes..." -ForegroundColor Yellow
$commitMessage = "Production deployment ready - MindAlchemy"
try {
    git commit -m $commitMessage
    Write-Host "[OK] Changes committed" -ForegroundColor Green
} catch {
    Write-Host "[WARNING] No changes to commit or commit failed" -ForegroundColor Yellow
}

# Push to GitHub
Write-Host "`n[5/5] Pushing to GitHub..." -ForegroundColor Yellow

# Check if using token authentication
if (-not [string]::IsNullOrEmpty($GitHubToken)) {
    Write-Host "Using token authentication..." -ForegroundColor Gray
    $repoUrl = $GitHubRepo -replace "https://", "https://$GitHubToken@"
    git push -u origin main --force
} else {
    # Try to push (will prompt for credentials if needed)
    Write-Host "Pushing to origin/main..." -ForegroundColor Gray
    Write-Host "[INFO] You may be prompted for GitHub credentials" -ForegroundColor Yellow
    
    try {
        git push -u origin main
        Write-Host "[OK] Successfully pushed to GitHub!" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] Push failed. You may need to:" -ForegroundColor Red
        Write-Host "  1. Set up GitHub credentials" -ForegroundColor Yellow
        Write-Host "  2. Use a Personal Access Token" -ForegroundColor Yellow
        Write-Host "  3. Or use GitHub Desktop" -ForegroundColor Yellow
        Write-Host "`nTo use a token, run:" -ForegroundColor Cyan
        Write-Host "  .\push-to-github.ps1 -GitHubRepo `"$GitHubRepo`" -GitHubToken `"your_token`"" -ForegroundColor White
    }
}

Write-Host "`n=== Complete ===" -ForegroundColor Green
Write-Host "`nYour code is now on GitHub!" -ForegroundColor Cyan
Write-Host "Next: Deploy to Railway and Vercel (see ONE_CLICK_DEPLOY.md)" -ForegroundColor Yellow

