# Deploy Backend to Vercel - Automated Script
Write-Host "`n=== DEPLOY BACKEND TO VERCEL ===" -ForegroundColor Cyan
Write-Host "`nThis script will help you deploy your backend to Vercel" -ForegroundColor Yellow

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "`nInstalling Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Failed to install Vercel CLI" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n✅ Vercel CLI is installed" -ForegroundColor Green

# Check if logged in
Write-Host "`nChecking Vercel login status..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n⚠️  Not logged in to Vercel" -ForegroundColor Yellow
    Write-Host "Please login:" -ForegroundColor Cyan
    vercel login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`n❌ Login failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Already logged in" -ForegroundColor Green
    Write-Host $loginCheck -ForegroundColor Gray
}

Write-Host "`n📋 IMPORTANT: Before deploying, make sure you have:" -ForegroundColor Yellow
Write-Host "  1. Created Vercel Postgres database" -ForegroundColor White
Write-Host "  2. Got the POSTGRES_URL connection string" -ForegroundColor White
Write-Host "  3. Set all environment variables in Vercel dashboard" -ForegroundColor White

$continue = Read-Host "`nContinue with deployment? (y/n)"
if ($continue -ne "y" -and $continue -ne "Y") {
    Write-Host "`nDeployment cancelled" -ForegroundColor Yellow
    exit 0
}

Write-Host "`n🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host "`nThis will:" -ForegroundColor Yellow
Write-Host "  - Deploy backend as serverless functions" -ForegroundColor White
Write-Host "  - Deploy frontend" -ForegroundColor White
Write-Host "  - Use vercel.json configuration" -ForegroundColor White

vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
    Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables" -ForegroundColor White
    Write-Host "  2. Add POSTGRES_URL (from Vercel Postgres)" -ForegroundColor White
    Write-Host "  3. Add GROQ_API_KEY" -ForegroundColor White
    Write-Host "  4. Add SECRET_KEY" -ForegroundColor White
    Write-Host "  5. Add CORS_ORIGINS (your frontend URL)" -ForegroundColor White
    Write-Host "  6. Initialize database: Visit https://your-project.vercel.app/api/migrate/init" -ForegroundColor White
    Write-Host "  7. Update frontend VITE_API_URL to point to your Vercel backend" -ForegroundColor White
} else {
    Write-Host "`n❌ Deployment failed" -ForegroundColor Red
    Write-Host "Check the error messages above" -ForegroundColor Yellow
    exit 1
}

