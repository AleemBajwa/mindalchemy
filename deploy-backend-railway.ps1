# Automated Railway Backend Deployment Script
# This will deploy your backend to Railway automatically

param(
    [string]$GroqAPIKey = "your_groq_api_key_here",
    [string]$SecretKey = "your_secret_key_here"
)

Write-Host "`n=== RAILWAY BACKEND DEPLOYMENT ===" -ForegroundColor Cyan

# Check if Railway CLI is installed
try {
    $null = railway --version 2>&1
    Write-Host "[OK] Railway CLI found" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Railway CLI not found. Installing..." -ForegroundColor Red
    npm install -g @railway/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install Railway CLI" -ForegroundColor Red
        exit 1
    }
}

# Check if logged in
Write-Host "`nChecking Railway login status..." -ForegroundColor Yellow
$loginCheck = railway whoami 2>&1
if ($LASTEXITCODE -ne 0 -or $loginCheck -match "not logged in") {
    Write-Host "[INFO] Not logged in to Railway. Please login:" -ForegroundColor Yellow
    Write-Host "  railway login" -ForegroundColor Cyan
    Write-Host "`nAfter logging in, run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Logged in to Railway" -ForegroundColor Green

# Navigate to backend directory
Set-Location backend

# Initialize Railway project if needed
if (-not (Test-Path ".railway")) {
    Write-Host "`nInitializing Railway project..." -ForegroundColor Yellow
    railway init --name mindalchemy-backend
}

# Link to existing project or create new
Write-Host "`nSetting up Railway project..." -ForegroundColor Yellow
# Check if already linked
$linked = railway status 2>&1
if ($LASTEXITCODE -ne 0 -or $linked -match "not linked") {
    # Link to project (will prompt if multiple projects exist)
    Write-Host "Linking to Railway project..." -ForegroundColor Gray
    railway link
} else {
    Write-Host "[OK] Already linked to Railway project" -ForegroundColor Green
}

# Set environment variables
Write-Host "`nSetting environment variables..." -ForegroundColor Yellow
railway variables --set "GROQ_API_KEY=$GroqAPIKey"
railway variables --set "SECRET_KEY=$SecretKey"
railway variables --set "ENVIRONMENT=production"
railway variables --set "DEBUG=False"
railway variables --set "CORS_ORIGINS=https://placeholder.vercel.app"

Write-Host "[OK] Environment variables set" -ForegroundColor Green

# Deploy
Write-Host "`nDeploying to Railway..." -ForegroundColor Yellow
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[OK] Backend deployed successfully!" -ForegroundColor Green
    
    # Get the deployment URL
    Write-Host "`nGetting deployment URL..." -ForegroundColor Yellow
    $url = railway domain
    if ($url) {
        Write-Host "[OK] Backend URL: $url" -ForegroundColor Green
        Write-Host "`nSave this URL - you'll need it for Vercel deployment!" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[ERROR] Deployment failed" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host "`n=== BACKEND DEPLOYMENT COMPLETE ===" -ForegroundColor Green

