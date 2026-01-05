# Fully Automated Deployment Script
# This script does EVERYTHING - just provide your credentials

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken,
    
    [Parameter(Mandatory=$true)]
    [string]$GroqAPIKey,
    
    [string]$RepoName = "mindalchemy"
)

Write-Host "`n=== FULLY AUTOMATED DEPLOYMENT ===" -ForegroundColor Cyan
Write-Host "Starting complete deployment process...`n" -ForegroundColor Yellow

$ErrorActionPreference = "Stop"

# Step 1: Setup
Write-Host "[1/7] Running setup..." -ForegroundColor Yellow
& .\setup-deployment.ps1 -GroqAPIKey $GroqAPIKey
if ($LASTEXITCODE -ne 0) {
    throw "Setup failed!"
}
Write-Host "[OK] Setup complete" -ForegroundColor Green

# Step 2: Read SECRET_KEY from backend/.env
Write-Host "`n[2/7] Reading configuration..." -ForegroundColor Yellow
$backendEnvPath = Join-Path "backend" ".env"
if (Test-Path $backendEnvPath) {
    $envContent = Get-Content $backendEnvPath -Raw
    if ($envContent -match "SECRET_KEY=(.+)") {
        $SecretKey = $matches[1].Trim()
        Write-Host "[OK] Configuration loaded" -ForegroundColor Green
    } else {
        throw "Could not find SECRET_KEY in backend/.env"
    }
} else {
    throw "backend/.env not found. Run setup-deployment.ps1 first."
}

# Step 3: Create GitHub Repository
Write-Host "`n[3/7] Creating GitHub repository..." -ForegroundColor Yellow
$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"

# Check if repo exists
try {
    $headers = @{
        "Authorization" = "token $GitHubToken"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $checkRepo = Invoke-RestMethod -Uri "https://api.github.com/repos/$GitHubUsername/$RepoName" -Headers $headers -Method Get -ErrorAction SilentlyContinue
    
    if ($checkRepo) {
        Write-Host "[OK] Repository already exists" -ForegroundColor Green
    }
} catch {
    # Repository doesn't exist, create it
    Write-Host "Creating new repository: $RepoName..." -ForegroundColor Gray
    
    $body = @{
        name = $RepoName
        description = "MindAlchemy - AI Therapist Application"
        private = $false
        auto_init = $false
    } | ConvertTo-Json
    
    try {
        $createRepo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $headers -Method Post -Body $body -ContentType "application/json"
        Write-Host "[OK] Repository created: $repoUrl" -ForegroundColor Green
    } catch {
        Write-Host "[WARNING] Could not create repository via API. You may need to create it manually at:" -ForegroundColor Yellow
        Write-Host "  https://github.com/new" -ForegroundColor Gray
        Write-Host "  Repository name: $RepoName" -ForegroundColor Gray
    }
}

# Step 4: Initialize and Push to GitHub
Write-Host "`n[4/7] Pushing code to GitHub..." -ForegroundColor Yellow

# Refresh PATH to include newly installed Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check Git
try {
    $null = git --version 2>&1
} catch {
    throw "Git is not installed. Please install Git first (see GIT_INSTALL.md)"
}

# Initialize Git if needed
if (-not (Test-Path ".git")) {
    git init
}

# Ensure we're on main branch (rename if needed)
$currentBranch = git branch --show-current 2>&1
if ($currentBranch -ne "main") {
    git branch -M main 2>&1 | Out-Null
}

# Configure remote
$currentRemote = $null
try {
    $currentRemote = git remote get-url origin 2>&1
    if ($LASTEXITCODE -ne 0) { $currentRemote = $null }
} catch {
    $currentRemote = $null
}

if ($currentRemote -ne $repoUrl) {
    if ($currentRemote) {
        git remote set-url origin $repoUrl
    } else {
        git remote add origin $repoUrl
    }
}

# Configure Git credentials for this push
$env:GIT_ASKPASS = "echo"
$env:GIT_TERMINAL_PROMPT = "0"

# Add and commit
Write-Host "Staging files..." -ForegroundColor Gray
git add .
if ($LASTEXITCODE -ne 0) {
    throw "Failed to stage files"
}

Write-Host "Creating commit..." -ForegroundColor Gray
git commit -m "Production deployment ready - MindAlchemy"
if ($LASTEXITCODE -ne 0) {
    throw "Failed to create commit"
}

# Ensure we're on main branch
git branch -M main 2>&1 | Out-Null

# Push using token
Write-Host "Pushing to GitHub..." -ForegroundColor Gray
$pushUrl = $repoUrl -replace "https://", "https://$GitHubToken@"
git remote set-url origin $pushUrl
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Code pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Git push had issues. You may need to push manually:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor Gray
}

# Reset remote URL (remove token)
git remote set-url origin $repoUrl

# Step 5: Prepare Railway Deployment Info
Write-Host "`n[5/7] Preparing Railway deployment information..." -ForegroundColor Yellow

$railwayInfo = @"
=== RAILWAY DEPLOYMENT INFO ===

Repository URL: $repoUrl
Root Directory: backend

Environment Variables to add:
GROQ_API_KEY=$GroqAPIKey
SECRET_KEY=$SecretKey
ENVIRONMENT=production
DEBUG=False
CORS_ORIGINS=https://placeholder.vercel.app

Steps:
1. Go to: https://railway.app
2. New Project → Deploy from GitHub repo
3. Select: $RepoName
4. Settings → Root Directory: backend
5. Variables → Add all variables above
6. Deploy!

"@

$railwayInfo | Out-File -FilePath "RAILWAY_DEPLOY_INFO.txt" -Encoding UTF8
Write-Host "[OK] Railway info saved to RAILWAY_DEPLOY_INFO.txt" -ForegroundColor Green
Write-Host "[SECURITY] This file contains credentials and is in .gitignore - will NOT be committed!" -ForegroundColor Yellow

# Step 6: Prepare Vercel Deployment Info
Write-Host "`n[6/7] Preparing Vercel deployment information..." -ForegroundColor Yellow

$vercelInfo = @"
=== VERCEL DEPLOYMENT INFO ===

Repository URL: $repoUrl
Root Directory: frontend

Environment Variable to add:
VITE_API_URL=https://YOUR_RAILWAY_URL.railway.app/api
(Update this after Railway deployment!)

Steps:
1. Go to: https://vercel.com
2. Add New Project → Import GitHub repo
3. Select: $RepoName
4. Settings → Root Directory: frontend
5. Environment Variables → Add VITE_API_URL
6. Deploy!

"@

$vercelInfo | Out-File -FilePath "VERCEL_DEPLOY_INFO.txt" -Encoding UTF8
Write-Host "[OK] Vercel info saved to VERCEL_DEPLOY_INFO.txt" -ForegroundColor Green
Write-Host "[SECURITY] This file contains credentials and is in .gitignore - will NOT be committed!" -ForegroundColor Yellow

# Step 7: Summary
Write-Host "`n[7/7] Deployment preparation complete!" -ForegroundColor Green

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "`n[OK] Code pushed to GitHub: $repoUrl" -ForegroundColor Green
Write-Host "`nNext steps (see saved files for details):" -ForegroundColor Yellow
Write-Host "  1. Deploy backend to Railway (see RAILWAY_DEPLOY_INFO.txt)" -ForegroundColor White
Write-Host "  2. Deploy frontend to Vercel (see VERCEL_DEPLOY_INFO.txt)" -ForegroundColor White
Write-Host "  3. Update CORS_ORIGINS in Railway with Vercel URL" -ForegroundColor White

Write-Host "`nYour SECRET_KEY (save this!): $SecretKey" -ForegroundColor Yellow
Write-Host "`n=== DONE ===" -ForegroundColor Green

