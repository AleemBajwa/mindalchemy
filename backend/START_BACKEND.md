# How to Start Backend Server

## ⚠️ Important: Activate Virtual Environment First!

### Step-by-Step:

```powershell
# 1. Navigate to backend directory
cd "D:\AI Therapist\backend"

# 2. Activate virtual environment (REQUIRED!)
.\venv\Scripts\Activate.ps1

# 3. You should see (venv) in your prompt
# Example: (venv) PS D:\AI Therapist\backend>

# 4. Now start the server
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

## ✅ Success Indicators

When it's working, you'll see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## ❌ Common Error

**Error**: `No module named uvicorn`

**Cause**: Virtual environment not activated

**Fix**: Run `.\venv\Scripts\Activate.ps1` first!

## 🔍 Verify Virtual Environment

After activating, you should see:
- `(venv)` prefix in your PowerShell prompt
- Or run: `python --version` (should show Python from venv)

---

**Remember**: Always activate the virtual environment before running Python commands! 🚀

