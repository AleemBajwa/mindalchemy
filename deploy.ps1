# MindAlchemy - Automated Deployment Script
# This script prepares everything for deployment

Write-Host "`n=== MindAlchemy Deployment Setup ===" -ForegroundColor Cyan
Write-Host "This script will help you deploy to GitHub, Railway, and Vercel`n" -ForegroundColor Yellow

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git already initialized" -ForegroundColor Green
}

# Check if .gitignore exists
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore..." -ForegroundColor Yellow
    @"
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc

# Environment
.env
.env.local
.env.*.local

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

# Temporary
*.tmp
.cache/
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Host "✓ .gitignore created" -ForegroundColor Green
}

# Check for environment files
Write-Host "`nChecking environment files..." -ForegroundColor Yellow

if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠ backend/.env not found" -ForegroundColor Yellow
    Write-Host "  Creating from .env.example..." -ForegroundColor Gray
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "  ✓ Created backend/.env - Please update with your values!" -ForegroundColor Green
    }
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "⚠ frontend/.env not found" -ForegroundColor Yellow
    Write-Host "  Creating from .env.example..." -ForegroundColor Gray
    if (Test-Path "frontend\.env.example") {
        Copy-Item "frontend\.env.example" "frontend\.env"
        Write-Host "  ✓ Created frontend/.env - Please update with your values!" -ForegroundColor Green
    }
}

# Build frontend
Write-Host "`nBuilding frontend for production..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Check git status
Write-Host "`nChecking git status..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "`nFiles ready to commit:" -ForegroundColor Cyan
    git status --short
    
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Review the files above" -ForegroundColor White
    Write-Host "2. Commit and push to GitHub:" -ForegroundColor White
    Write-Host "   git add ." -ForegroundColor Gray
    Write-Host "   git commit -m 'Production deployment ready'" -ForegroundColor Gray
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host "`n3. Follow ONE_CLICK_DEPLOY.md for deployment steps" -ForegroundColor White
} else {
    Write-Host "✓ All changes committed" -ForegroundColor Green
    Write-Host "`nReady to push to GitHub!" -ForegroundColor Cyan
}

Write-Host "`n=== Setup Complete ===" -ForegroundColor Green
Write-Host "`n📖 Read ONE_CLICK_DEPLOY.md for deployment instructions" -ForegroundColor Cyan
Write-Host "`n🚀 Quick start:" -ForegroundColor Yellow
Write-Host "   1. Push to GitHub (see SETUP_GITHUB.md)" -ForegroundColor White
Write-Host "   2. Deploy backend to Railway (5 min)" -ForegroundColor White
Write-Host "   3. Deploy frontend to Vercel (3 min)" -ForegroundColor White
Write-Host "`n" -ForegroundColor White

