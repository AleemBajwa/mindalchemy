# Complete Deployment Automation Script
# This script automates the entire deployment process

param(
    [string]$GitHubRepo = "",
    [string]$GitHubToken = "",
    [string]$GroqAPIKey = "",
    [string]$SecretKey = ""
)

Write-Host "`n=== MindAlchemy Complete Deployment Automation ===" -ForegroundColor Cyan
Write-Host "This will prepare and push everything for deployment`n" -ForegroundColor Yellow

# Step 1: Run setup script
Write-Host "[Step 1/3] Running setup script..." -ForegroundColor Yellow
& .\setup-deployment.ps1 -GroqAPIKey $GroqAPIKey -SecretKey $SecretKey
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Setup failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Push to GitHub
if (-not [string]::IsNullOrEmpty($GitHubRepo)) {
    Write-Host "`n[Step 2/3] Pushing to GitHub..." -ForegroundColor Yellow
    & .\push-to-github.ps1 -GitHubRepo $GitHubRepo -GitHubToken $GitHubToken
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[WARNING] GitHub push failed, but you can do it manually" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[Step 2/3] Skipping GitHub push (no repo URL provided)" -ForegroundColor Yellow
    Write-Host "Run manually: .\push-to-github.ps1 -GitHubRepo `"YOUR_REPO_URL`"" -ForegroundColor Gray
}

# Step 3: Display next steps
Write-Host "`n[Step 3/3] Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan

if ([string]::IsNullOrEmpty($GitHubRepo)) {
    Write-Host "`n1. Push to GitHub:" -ForegroundColor Yellow
    Write-Host "   .\push-to-github.ps1 -GitHubRepo `"https://github.com/YOUR_USERNAME/YOUR_REPO.git`"" -ForegroundColor White
    Write-Host "   (Or use GitHub Desktop - see GITHUB_AUTH.md)" -ForegroundColor Gray
} else {
    Write-Host "`n1. [OK] Code pushed to GitHub" -ForegroundColor Green
}

Write-Host "`n2. Deploy Backend to Railway:" -ForegroundColor Yellow
Write-Host "   - Go to: https://railway.app" -ForegroundColor White
Write-Host "   - New Project → Deploy from GitHub repo" -ForegroundColor White
Write-Host "   - Set Root Directory: backend" -ForegroundColor White
Write-Host "   - Add environment variables from backend/.env" -ForegroundColor White

Write-Host "`n3. Deploy Frontend to Vercel:" -ForegroundColor Yellow
Write-Host "   - Go to: https://vercel.com" -ForegroundColor White
Write-Host "   - Add New Project → Import GitHub repo" -ForegroundColor White
Write-Host "   - Set Root Directory: frontend" -ForegroundColor White
Write-Host "   - Add VITE_API_URL = your-railway-url/api" -ForegroundColor White

Write-Host "`n📖 For detailed instructions, see ONE_CLICK_DEPLOY.md" -ForegroundColor Cyan
Write-Host "`n"

