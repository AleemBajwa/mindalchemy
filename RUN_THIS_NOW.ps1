# RUN THIS SCRIPT - It does everything!
# Just provide your credentials when prompted

Write-Host "`n=== MIN DALCHEMY FULLY AUTOMATED DEPLOYMENT ===" -ForegroundColor Cyan
Write-Host "This script will do EVERYTHING for you!`n" -ForegroundColor Yellow

# Get credentials
Write-Host "Please provide your credentials:" -ForegroundColor Yellow
Write-Host ""

$GitHubUsername = Read-Host "GitHub Username"
$GitHubToken = Read-Host "GitHub Personal Access Token" -AsSecureString
$GitHubTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($GitHubToken))

$GroqAPIKey = Read-Host "Groq API Key" -AsSecureString
$GroqAPIKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($GroqAPIKey))

$RepoName = Read-Host "Repository Name (default: mindalchemy)"
if ([string]::IsNullOrEmpty($RepoName)) {
    $RepoName = "mindalchemy"
}

Write-Host "`nStarting automated deployment..." -ForegroundColor Cyan
Write-Host "This may take a few minutes...`n" -ForegroundColor Yellow

# Run the fully automated script
& .\FULLY_AUTOMATED_DEPLOY.ps1 -GitHubUsername $GitHubUsername -GitHubToken $GitHubTokenPlain -GroqAPIKey $GroqAPIKeyPlain -RepoName $RepoName

Write-Host "`n=== COMPLETE ===" -ForegroundColor Green
Write-Host "Check RAILWAY_DEPLOY_INFO.txt and VERCEL_DEPLOY_INFO.txt for next steps!" -ForegroundColor Cyan

