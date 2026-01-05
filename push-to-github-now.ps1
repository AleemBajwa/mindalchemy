# Quick Push to GitHub Script
# This will push your code using your GitHub token

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken
)

Write-Host "`n=== PUSHING TO GITHUB ===" -ForegroundColor Cyan

# Refresh PATH to include Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check if Git is available
try {
    $null = git --version 2>&1
} catch {
    Write-Host "[ERROR] Git is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please restart your PowerShell terminal or install Git." -ForegroundColor Yellow
    exit 1
}

$repoUrl = "https://github.com/AleemBajwa/mindalchemy.git"

# Ensure we're on main branch
git branch -M main 2>&1 | Out-Null

# Add any new changes
Write-Host "Staging changes..." -ForegroundColor Yellow
git add .

# Commit if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Update: Production deployment ready" -q
}

# Push using token
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
$pushUrl = $repoUrl -replace "https://", "https://$GitHubToken@"
git remote set-url origin $pushUrl
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[OK] Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host "Repository: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host "`n[ERROR] Push failed. Check your token and try again." -ForegroundColor Red
    exit 1
}

# Reset remote URL (remove token)
git remote set-url origin $repoUrl

Write-Host "`n=== DONE ===" -ForegroundColor Green

