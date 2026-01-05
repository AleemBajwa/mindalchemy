# Start backend server with virtual environment
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Activate virtual environment
& "$scriptPath\venv\Scripts\Activate.ps1"

# Start uvicorn server
& "$scriptPath\venv\Scripts\python.exe" -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

