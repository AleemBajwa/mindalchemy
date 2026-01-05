# Complete Deployment Setup Script
# Run this to prepare everything for deployment

param(
    [string]$GitHubRepo = "",
    [string]$GroqAPIKey = "",
    [string]$SecretKey = ""
)

Write-Host "`n=== MindAlchemy Complete Deployment Setup ===" -ForegroundColor Cyan
Write-Host "This will prepare your project for deployment`n" -ForegroundColor Yellow

# Step 1: Initialize Git
Write-Host "[1/6] Setting up Git..." -ForegroundColor Yellow

# Refresh PATH to include newly installed Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$gitInstalled = $false
try {
    $null = git --version 2>&1
    $gitInstalled = $true
} catch {
    $gitInstalled = $false
}

if ($gitInstalled) {
    if (-not (Test-Path ".git")) {
        git init
        Write-Host "  [OK] Git initialized" -ForegroundColor Green
    } else {
        Write-Host "  [OK] Git already initialized" -ForegroundColor Green
    }
} else {
    Write-Host "  [WARNING] Git is not installed or not in PATH" -ForegroundColor Yellow
    Write-Host "  [INFO] You can still continue, but you'll need Git to push to GitHub" -ForegroundColor Gray
    Write-Host "  [INFO] See GIT_INSTALL.md for installation instructions" -ForegroundColor Gray
}

# Step 2: Create .gitignore
Write-Host "[2/6] Creating .gitignore..." -ForegroundColor Yellow
if (-not (Test-Path ".gitignore")) {
    $gitignore = @"
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc
*.pyo
*.pyd

# Environment
.env
.env.local
.env.*.local
*.env

# Build
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite
*.sqlite3
backend/ai_therapist.db

# Temporary
*.tmp
.cache/
"@
    $gitignore | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Host "  [OK] .gitignore created" -ForegroundColor Green
}

# Step 3: Generate Secret Key if not provided
Write-Host "[3/6] Generating secrets..." -ForegroundColor Yellow
if ([string]::IsNullOrEmpty($SecretKey)) {
    $SecretKey = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    Write-Host "  [OK] Generated SECRET_KEY: $SecretKey" -ForegroundColor Green
    Write-Host "  [WARNING] Save this key! You'll need it for Railway deployment" -ForegroundColor Yellow
}

# Step 4: Create backend .env
Write-Host "[4/6] Setting up backend environment..." -ForegroundColor Yellow
$backendEnvPath = Join-Path "backend" ".env"
if (-not (Test-Path $backendEnvPath)) {
    $backendEnv = @"
# Groq API Configuration
GROQ_API_KEY=$GroqAPIKey
GROQ_MODEL=llama-3.1-8b-instant

# Database
DATABASE_URL=sqlite:///./ai_therapist.db

# JWT Security
SECRET_KEY=$SecretKey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Application
ENVIRONMENT=production
DEBUG=False

# CORS Origins (update after getting Vercel URL)
CORS_ORIGINS=https://placeholder.vercel.app
"@
    $backendEnv | Out-File -FilePath $backendEnvPath -Encoding UTF8
    Write-Host "  [OK] Created backend/.env" -ForegroundColor Green
    Write-Host "  [WARNING] Update GROQ_API_KEY and CORS_ORIGINS before deploying!" -ForegroundColor Yellow
}

# Step 5: Create frontend .env
Write-Host "[5/6] Setting up frontend environment..." -ForegroundColor Yellow
$frontendEnvPath = Join-Path "frontend" ".env"
if (-not (Test-Path $frontendEnvPath)) {
    $frontendEnv = @"
# API URL - Update this after deploying backend to Railway
VITE_API_URL=https://your-railway-url.railway.app/api

# Environment
VITE_ENVIRONMENT=production
"@
    $frontendEnv | Out-File -FilePath $frontendEnvPath -Encoding UTF8
    Write-Host "  [OK] Created frontend/.env" -ForegroundColor Green
    Write-Host "  [WARNING] Update VITE_API_URL after deploying backend!" -ForegroundColor Yellow
}

# Step 6: Build frontend
Write-Host "[6/6] Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Frontend build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Summary
Write-Host "`n=== Setup Complete! ===" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "`n1. Push to GitHub:" -ForegroundColor Yellow
if (-not [string]::IsNullOrEmpty($GitHubRepo)) {
    Write-Host "   git remote add origin $GitHubRepo" -ForegroundColor Gray
} else {
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
}
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Production deployment ready'" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray

Write-Host "`n2. Deploy Backend to Railway:" -ForegroundColor Yellow
Write-Host "   - Go to railway.app" -ForegroundColor Gray
Write-Host "   - New Project → Deploy from GitHub" -ForegroundColor Gray
Write-Host "   - Set Root Directory: backend" -ForegroundColor Gray
Write-Host "   - Add environment variables from backend/.env" -ForegroundColor Gray

Write-Host "`n3. Deploy Frontend to Vercel:" -ForegroundColor Yellow
Write-Host "   - Go to vercel.com" -ForegroundColor Gray
Write-Host "   - Add New Project → Import GitHub repo" -ForegroundColor Gray
Write-Host "   - Set Root Directory: frontend" -ForegroundColor Gray
Write-Host "   - Add VITE_API_URL = your-railway-url/api" -ForegroundColor Gray

Write-Host "`nFor detailed instructions, see ONE_CLICK_DEPLOY.md" -ForegroundColor Cyan
Write-Host "`nYour SECRET_KEY (save this!): $SecretKey" -ForegroundColor Yellow
Write-Host "`n"

