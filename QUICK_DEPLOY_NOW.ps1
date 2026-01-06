# Quick Deploy Script - Run this after logging in to Railway and Vercel
# This will deploy everything automatically

Write-Host "`n=== QUICK DEPLOY - MIN DALCHEMY ===" -ForegroundColor Cyan
Write-Host "This will deploy your app automatically!`n" -ForegroundColor Yellow

# Check Railway login
Write-Host "[1/4] Checking Railway login..." -ForegroundColor Yellow
$railwayCheck = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Not logged in to Railway!" -ForegroundColor Red
    Write-Host "Please run: railway login" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Gray
    exit 1
}
Write-Host "[OK] Logged in to Railway as: $railwayCheck" -ForegroundColor Green

# Check Vercel login
Write-Host "`n[2/4] Checking Vercel login..." -ForegroundColor Yellow
$vercelCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Not logged in to Vercel!" -ForegroundColor Red
    Write-Host "Please run: vercel login" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Gray
    exit 1
}
Write-Host "[OK] Logged in to Vercel as: $vercelCheck" -ForegroundColor Green

# Deploy Backend
Write-Host "`n[3/4] Deploying Backend to Railway..." -ForegroundColor Yellow
& .\deploy-backend-railway.ps1

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Backend deployment failed!" -ForegroundColor Red
    exit 1
}

# Get Railway URL
Write-Host "`n[INFO] Getting Railway URL..." -ForegroundColor Yellow
Set-Location backend
$railwayDomain = railway domain 2>&1
Set-Location ..

if ($railwayDomain -and $railwayDomain -notmatch "error|not found") {
    $railwayURL = $railwayDomain.Trim()
    if (-not $railwayURL.StartsWith("http")) {
        $railwayURL = "https://$railwayURL"
    }
    Write-Host "[OK] Backend URL: $railwayURL" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Could not get Railway URL automatically." -ForegroundColor Yellow
    $railwayURL = Read-Host "Please enter your Railway backend URL (e.g., https://xxx.railway.app)"
}

# Deploy Frontend
Write-Host "`n[4/4] Deploying Frontend to Vercel..." -ForegroundColor Yellow
$apiURL = "$railwayURL/api"
& .\deploy-frontend-vercel.ps1 -RailwayBackendURL $apiURL

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Frontend deployment failed!" -ForegroundColor Red
    exit 1
}

# Get Vercel URL and update CORS
Write-Host "`n[INFO] Getting Vercel URL..." -ForegroundColor Yellow
Set-Location frontend
$vercelInfo = vercel ls --prod --json 2>&1 | ConvertFrom-Json | Select-Object -First 1
Set-Location ..

if ($vercelInfo -and $vercelInfo.url) {
    $vercelURL = "https://$($vercelInfo.url)"
    Write-Host "[OK] Frontend URL: $vercelURL" -ForegroundColor Green
    
    # Update CORS
    Write-Host "`nUpdating CORS in Railway..." -ForegroundColor Yellow
    Set-Location backend
    railway variables set CORS_ORIGINS=$vercelURL
    Set-Location ..
    Write-Host "[OK] CORS updated!" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Could not get Vercel URL automatically." -ForegroundColor Yellow
    $vercelURL = Read-Host "Please enter your Vercel frontend URL (e.g., https://xxx.vercel.app)"
    if ($vercelURL) {
        Set-Location backend
        railway variables set CORS_ORIGINS=$vercelURL
        Set-Location ..
    }
}

Write-Host "`n=== DEPLOYMENT COMPLETE! ===" -ForegroundColor Green
Write-Host "`nYour app is now live:" -ForegroundColor Cyan
Write-Host "  Backend:  $railwayURL" -ForegroundColor Yellow
Write-Host "  Frontend: $vercelURL" -ForegroundColor Yellow
Write-Host "`n🎉 Congratulations! Your MindAlchemy app is deployed!" -ForegroundColor Green

