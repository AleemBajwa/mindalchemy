# Create .env files for AI Therapist

Write-Host "Creating .env files..." -ForegroundColor Green

# Backend .env
$backendEnv = @"
# Groq API Configuration
# Get your API key from: https://console.groq.com/
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-70b-versatile

# Database
DATABASE_URL=sqlite:///./ai_therapist.db

# JWT Configuration
# Change this to a random secret key in production
SECRET_KEY=your_secret_key_change_in_production_12345678901234567890
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# App Configuration
ENVIRONMENT=development
DEBUG=True
"@

# Frontend .env
$frontendEnv = @"
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Therapist
"@

# Write backend .env
$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8
Write-Host "✓ Created backend/.env" -ForegroundColor Green

# Write frontend .env
$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding utf8
Write-Host "✓ Created frontend/.env" -ForegroundColor Green

Write-Host "`n.env files created successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Edit backend/.env and add your GROQ_API_KEY" -ForegroundColor Cyan
Write-Host "2. Get your API key from: https://console.groq.com/" -ForegroundColor Cyan
Write-Host "3. Replace 'your_groq_api_key_here' with your actual API key" -ForegroundColor Cyan

