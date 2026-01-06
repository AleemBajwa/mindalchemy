# Fully Automated Deployment Script
# This will deploy both backend and frontend automatically

param(
    [string]$GroqAPIKey = "your_groq_api_key_here",
    [string]$SecretKey = "your_secret_key_here"
)

Write-Host "`n=== FULLY AUTOMATED DEPLOYMENT ===" -ForegroundColor Cyan
Write-Host "This will deploy both backend and frontend automatically`n" -ForegroundColor Yellow

# Step 1: Deploy Backend to Railway
Write-Host "[1/3] Deploying Backend to Railway..." -ForegroundColor Yellow
& .\deploy-backend-railway.ps1 -GroqAPIKey $GroqAPIKey -SecretKey $SecretKey

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Backend deployment failed. Please check Railway CLI login." -ForegroundColor Red
    Write-Host "Run: railway login" -ForegroundColor Yellow
    exit 1
}

# Get Railway URL (this might need manual input if CLI doesn't return it)
Write-Host "`n[2/3] Please enter your Railway backend URL:" -ForegroundColor Yellow
Write-Host "Example: https://mindalchemy-backend.railway.app" -ForegroundColor Gray
$railwayURL = Read-Host "Railway Backend URL"

if ([string]::IsNullOrEmpty($railwayURL)) {
    Write-Host "[ERROR] Railway URL is required!" -ForegroundColor Red
    exit 1
}

# Remove https:// if present
$railwayURL = $railwayURL -replace "https://", ""
$railwayURL = $railwayURL -replace "/$", ""

# Step 2: Deploy Frontend to Vercel
Write-Host "`n[3/3] Deploying Frontend to Vercel..." -ForegroundColor Yellow
& .\deploy-frontend-vercel.ps1 -RailwayBackendURL "https://$railwayURL"

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Frontend deployment failed. Please check Vercel CLI login." -ForegroundColor Red
    Write-Host "Run: vercel login" -ForegroundColor Yellow
    exit 1
}

# Step 3: Get Vercel URL and update CORS
Write-Host "`n[INFO] Please enter your Vercel frontend URL:" -ForegroundColor Yellow
Write-Host "Example: https://mindalchemy.vercel.app" -ForegroundColor Gray
$vercelURL = Read-Host "Vercel Frontend URL"

if (-not [string]::IsNullOrEmpty($vercelURL)) {
    Write-Host "`nUpdating CORS in Railway..." -ForegroundColor Yellow
    Set-Location backend
    railway variables set CORS_ORIGINS=$vercelURL
    Set-Location ..
    Write-Host "[OK] CORS updated!" -ForegroundColor Green
}

Write-Host "`n=== DEPLOYMENT COMPLETE ===" -ForegroundColor Green
Write-Host "`nYour app is now live!" -ForegroundColor Cyan
Write-Host "Backend: https://$railwayURL" -ForegroundColor Yellow
if (-not [string]::IsNullOrEmpty($vercelURL)) {
    Write-Host "Frontend: $vercelURL" -ForegroundColor Yellow
}

