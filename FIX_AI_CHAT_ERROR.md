# 🔧 Fix AI Chat Error - "I'm having trouble processing that right now"

## 🔍 What's Happening

The AI is returning error messages instead of responses. This usually means:
1. **Groq API key is missing or invalid**
2. **API key not loaded from `.env` file**
3. **Network/API connection issue**

---

## ✅ Quick Fix Steps

### Step 1: Check Backend Logs

When you send a message in the chat, check your **backend terminal** (where `uvicorn` is running). You should now see detailed error messages like:

```
ERROR - Groq API error: [actual error message]
```

This will tell you exactly what's wrong.

---

### Step 2: Verify `.env` File

1. **Check if `backend/.env` exists:**
   ```powershell
   cd "D:\AI Therapist\backend"
   Test-Path .env
   ```
   Should return `True`

2. **Check the API key:**
   ```powershell
   Get-Content .env | Select-String "GROQ_API_KEY"
   ```
   Should show: `GROQ_API_KEY=gsk_...` (not `your_groq_api_key_here`)

---

### Step 3: Create/Update `.env` File

If the file doesn't exist or has placeholder values:

1. **Create `backend/.env`:**
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   GROQ_MODEL=llama-3.1-70b-versatile
   SECRET_KEY=your_secret_key_change_in_production_12345678901234567890
   DATABASE_URL=sqlite:///./ai_therapist.db
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ENVIRONMENT=development
   DEBUG=True
   ```

2. **Get your Groq API key:**
   - Go to: https://console.groq.com/
   - Sign up or log in
   - Navigate to API Keys
   - Create a new key
   - Copy it and replace `your_actual_groq_api_key_here` in `.env`

---

### Step 4: Restart Backend

**Important:** After updating `.env`, you MUST restart the backend:

1. In the backend terminal, press `Ctrl+C` to stop
2. Restart it:
   ```powershell
   cd "D:\AI Therapist\backend"
   .\venv\Scripts\Activate.ps1
   python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

Or if using the single command:
```powershell
cd "D:\AI Therapist\frontend"
npm run dev
```

---

## 🐛 Common Errors & Solutions

### Error: "AI service is not configured"
**Cause:** API key is missing or still has placeholder value  
**Fix:** Update `GROQ_API_KEY` in `backend/.env` with your actual key

### Error: "AI service authentication failed"
**Cause:** Invalid API key  
**Fix:** 
- Verify the key is correct (no extra spaces)
- Get a new key from https://console.groq.com/
- Make sure it starts with `gsk_`

### Error: "rate limit" or "quota"
**Cause:** Too many API requests  
**Fix:** Wait a few minutes and try again

### Error: "model" in error message
**Cause:** Model name is incorrect  
**Fix:** Check `GROQ_MODEL` in `.env` is set to `llama-3.1-70b-versatile`

---

## ✅ Verification

After fixing, you should see in backend logs:
```
INFO - Groq client initialized successfully
INFO - Sending message to Groq API with model: llama-3.1-70b-versatile
INFO - Successfully received response from Groq API
```

And in the chat, you'll get actual AI responses instead of error messages!

---

## 📋 Checklist

- [ ] `backend/.env` file exists
- [ ] `GROQ_API_KEY` is set (not placeholder)
- [ ] API key is valid (starts with `gsk_`)
- [ ] Backend server restarted after updating `.env`
- [ ] Check backend terminal for error logs
- [ ] Try sending a message in chat

---

**Need help?** Check the backend terminal logs - they now show detailed error messages!

