# Debugging Blank Page Issue

## 🔍 Quick Diagnosis Steps

### 1. Open Browser Console
Press `F12` → Go to **Console** tab

**What to look for:**
- Red error messages
- Failed imports
- React errors
- Network errors

### 2. Check Network Tab
Press `F12` → Go to **Network** tab → Refresh page

**What to look for:**
- Files returning 404 (not found)
- Files returning 500 (server error)
- Files not loading at all

### 3. Common Issues

#### Issue 1: JavaScript Error
**Console shows**: `Uncaught Error: ...`

**Fix**: Check console for specific error message

#### Issue 2: Module Not Found
**Console shows**: `Cannot find module '...'`

**Fix**:
```powershell
cd frontend
npm install
```

#### Issue 3: React Not Rendering
**Console shows**: No errors, but blank page

**Fix**: Check if `#root` element exists in HTML

#### Issue 4: API Connection Error
**Console shows**: Network errors to `/api/...`

**Fix**: Make sure backend is running on port 8000

---

## 🛠️ Quick Fixes

### Fix 1: Reinstall Dependencies
```powershell
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Fix 2: Clear Browser Cache
- `Ctrl + Shift + Delete`
- Clear cached files
- Hard refresh: `Ctrl + Shift + R`

### Fix 3: Check Terminal Output
Look at the terminal where you ran `npm run dev`:
- Any error messages?
- Does it say "Local: http://localhost:XXXX"?
- Any build errors?

---

## 📋 What I Need to Help

Please share:
1. **Console errors** (F12 → Console tab)
2. **Terminal output** (from `npm run dev`)
3. **Network errors** (F12 → Network tab → look for red items)

---

## ✅ Quick Test

Try this in browser console (F12):
```javascript
console.log('Test - page loaded')
document.getElementById('root')
```

If you see the root element, React should be mounting there.

---

**Share the console errors and I'll fix them!**

