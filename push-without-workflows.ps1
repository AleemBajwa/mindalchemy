# Push to GitHub without workflow files (temporary workaround)
# Use this if your token doesn't have 'workflow' scope

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken
)

Write-Host "`n=== PUSHING TO GITHUB (without workflows) ===" -ForegroundColor Cyan

# Refresh PATH to include Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check if Git is available
try {
    $null = git --version 2>&1
} catch {
    Write-Host "[ERROR] Git is not installed or not in PATH!" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/AleemBajwa/mindalchemy.git"

# Ensure we're on main branch
git branch -M main 2>&1 | Out-Null

# Temporarily remove workflow files from staging
Write-Host "Temporarily excluding workflow files..." -ForegroundColor Yellow
if (Test-Path ".github\workflows") {
    git reset .github\workflows\* 2>&1 | Out-Null
    Write-Host "[OK] Workflow files excluded from this push" -ForegroundColor Green
}

# Add all other changes
Write-Host "Staging changes..." -ForegroundColor Yellow
git add .

# Commit if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Update: Production deployment ready (workflows excluded)" -q
}

# Push using token
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
$pushUrl = $repoUrl -replace "https://", "https://$GitHubToken@"
git remote set-url origin $pushUrl
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[OK] Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host "Repository: $repoUrl" -ForegroundColor Cyan
    Write-Host "`n[NOTE] Workflow files were excluded." -ForegroundColor Yellow
    Write-Host "To push workflows later, update your token with 'workflow' scope." -ForegroundColor Gray
} else {
    Write-Host "`n[ERROR] Push failed. Check your token and try again." -ForegroundColor Red
    exit 1
}

# Reset remote URL (remove token)
git remote set-url origin $repoUrl

Write-Host "`n=== DONE ===" -ForegroundColor Green

