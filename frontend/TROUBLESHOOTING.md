# MindAlchemy - Troubleshooting Blank Page

## 🔍 If You See a Blank Page

### Step 1: Check Browser Console
1. Press `F12` or `Ctrl+Shift+I` to open Developer Tools
2. Go to **Console** tab
3. Look for **red error messages**
4. Share the errors with me

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Refresh the page (`F5`)
3. Check if files are loading (200 status) or failing (404/500)

### Step 3: Common Issues & Fixes

#### Issue: JavaScript Errors
**Symptoms**: Errors in console, blank page

**Fix**:
```powershell
cd frontend
npm install
npm run dev
```

#### Issue: Missing Dependencies
**Symptoms**: Module not found errors

**Fix**:
```powershell
cd frontend
rm -rf node_modules
npm install
```

#### Issue: Port Conflict
**Symptoms**: Server won't start or wrong port

**Fix**: Vite will automatically use next available port (3001, 3002, etc.)

#### Issue: Backend Not Running
**Symptoms**: API calls fail, blank page after login attempt

**Fix**: Start backend server:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

---

## 🛠️ Quick Fixes

### Reinstall Dependencies
```powershell
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Clear Browser Cache
- Press `Ctrl+Shift+Delete`
- Clear cached images and files
- Refresh page

### Check File Structure
Make sure these files exist:
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/index.css`
- `frontend/index.html`

---

## 📋 Debug Checklist

- [ ] Browser console shows no errors
- [ ] Network tab shows files loading (200 status)
- [ ] `node_modules` folder exists
- [ ] Backend server is running
- [ ] Port matches URL (3000, 3001, 3002, etc.)
- [ ] No firewall blocking localhost

---

## 🆘 Still Blank?

1. **Check Console**: What errors do you see?
2. **Check Network**: Are files loading?
3. **Check Terminal**: Any errors in npm run dev output?
4. **Try Different Browser**: Chrome, Firefox, Edge

**Share the console errors and I'll help fix them!**

