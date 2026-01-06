# Automated Vercel Frontend Deployment Script
# This will deploy your frontend to Vercel automatically

param(
    [Parameter(Mandatory=$true)]
    [string]$RailwayBackendURL
)

Write-Host "`n=== VERCEL FRONTEND DEPLOYMENT ===" -ForegroundColor Cyan

# Check if Vercel CLI is installed
try {
    $null = vercel --version 2>&1
    Write-Host "[OK] Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

# Check if logged in
Write-Host "`nChecking Vercel login status..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[INFO] Not logged in to Vercel. Please login:" -ForegroundColor Yellow
    Write-Host "  vercel login" -ForegroundColor Cyan
    Write-Host "`nAfter logging in, run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] Logged in to Vercel" -ForegroundColor Green

# Navigate to frontend directory
Set-Location frontend

# Set environment variable
$env:VITE_API_URL = "$RailwayBackendURL/api"
Write-Host "`nSet VITE_API_URL=$env:VITE_API_URL" -ForegroundColor Gray

# Deploy to Vercel
Write-Host "`nDeploying to Vercel..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[OK] Frontend deployed successfully!" -ForegroundColor Green
    
    # Get the deployment URL
    Write-Host "`nGetting deployment URL..." -ForegroundColor Yellow
    $url = vercel ls --prod --json | ConvertFrom-Json | Select-Object -First 1 -ExpandProperty url
    if ($url) {
        Write-Host "[OK] Frontend URL: https://$url" -ForegroundColor Green
        Write-Host "`nSave this URL - you'll need it to update CORS in Railway!" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[ERROR] Deployment failed" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host "`n=== FRONTEND DEPLOYMENT COMPLETE ===" -ForegroundColor Green

