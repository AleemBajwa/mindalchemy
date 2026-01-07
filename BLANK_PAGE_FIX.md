# 🔧 Fix Blank Page Issue

## Quick Diagnostic Steps

### 1. **Check Browser Console** (Most Important!)
Press `F12` → Go to **Console** tab

**Look for:**
- Red error messages
- Failed imports
- React errors
- Network errors

**Share the error message with me!**

---

### 2. **Check Which Page is Blank**

**Is it:**
- ✅ The whole app (login page, dashboard, everything)?
- ✅ Just the Reports page?
- ✅ Just after clicking "Reports" in navigation?

---

### 3. **Quick Fixes to Try**

#### Fix 1: Hard Refresh
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- This clears cached files

#### Fix 2: Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Clear "Cached images and files"
- Refresh page

#### Fix 3: Check if Backend is Running
If you're testing locally:
```powershell
# Check if backend is running on port 8000
# If not, start it:
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

#### Fix 4: Check Service Worker
The service worker might be caching an old broken version:

1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in left sidebar
4. Click **Unregister** for any registered workers
5. Refresh page

---

### 4. **If Reports Page is Blank**

The Reports page might be failing to load. Try:

1. Go to a different page (Dashboard, Chat, etc.)
2. If other pages work, the issue is with Reports
3. Check console for errors when clicking Reports

---

### 5. **Common Errors & Fixes**

#### Error: "Cannot read property of undefined"
**Fix**: The insights API might be failing. I've added error handling, but if you see this, share the full error.

#### Error: "Failed to fetch" or Network Error
**Fix**: 
- Check if backend is running
- Check if API URL is correct in `.env` file
- Check CORS settings

#### Error: "Module not found"
**Fix**:
```powershell
cd frontend
npm install
npm run dev
```

---

## 🆘 What I Need to Help

Please share:
1. **Console errors** (F12 → Console → Copy the red error)
2. **Which page is blank** (whole app or just Reports?)
3. **Network errors** (F12 → Network → Look for red items)
4. **Are you testing locally or on Vercel?**

---

## ✅ Quick Test

Try accessing these URLs directly:
- `/` - Should show Dashboard
- `/chat` - Should show Chat
- `/mood` - Should show Mood Tracker
- `/reports` - Should show Reports (might be blank if API fails)

If all pages are blank, it's a React/app issue.
If only Reports is blank, it's a Reports page issue.

---

**Share the console error and I'll fix it immediately!** 🚀
