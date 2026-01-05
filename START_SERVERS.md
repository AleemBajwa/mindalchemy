# MindAlchemy - How to Start Servers

## 🚀 Starting the Application

### **Important**: Run commands from the correct directories!

---

## 📋 Step-by-Step Instructions

### **Terminal 1: Backend Server**

```powershell
# Navigate to backend directory
cd "D:\AI Therapist\backend"

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start backend server
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Backend will run on**: http://localhost:8000  
**API Docs**: http://localhost:8000/docs

---

### **Terminal 2: Frontend Server**

```powershell
# Navigate to frontend directory
cd "D:\AI Therapist\frontend"

# Start frontend server
npm run dev
```

**Frontend will run on**: http://localhost:3000 (or port shown in terminal)

---

## ⚠️ Common Mistakes

### ❌ Wrong: Running from root directory
```powershell
PS D:\AI Therapist> npm run dev
# ERROR: package.json not found
```

### ✅ Correct: Navigate to frontend first
```powershell
PS D:\AI Therapist> cd frontend
PS D:\AI Therapist\frontend> npm run dev
# SUCCESS: Frontend starts
```

---

## 🔍 Verify Servers Are Running

### Check Backend
- Open: http://localhost:8000/health
- Should see: `{"status":"healthy"}`

### Check Frontend
- Open: http://localhost:3000
- Should see: MindAlchemy login page

### Check API Docs
- Open: http://localhost:8000/docs
- Should see: Swagger UI with all endpoints

---

## 🛑 Stopping Servers

- **Backend**: Press `Ctrl+C` in backend terminal
- **Frontend**: Press `Ctrl+C` in frontend terminal

---

## 📝 Quick Reference

| Server | Directory | Command | URL |
|--------|-----------|---------|-----|
| Backend | `backend/` | `python -m uvicorn app.main:app --reload` | http://localhost:8000 |
| Frontend | `frontend/` | `npm run dev` | http://localhost:3000 |

---

**Remember**: Always navigate to the correct directory first! 🚀

