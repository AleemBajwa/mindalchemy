# 🚀 Single Command Start - Setup Complete!

## ✅ What's Changed

Now you can start **both frontend AND backend** with just one command:

```powershell
cd frontend
npm run dev
```

That's it! Both servers will start automatically.

---

## 📋 How It Works

The `npm run dev` command now:
1. ✅ Starts the backend server (with venv activation)
2. ✅ Starts the frontend server (Vite)
3. ✅ Runs both concurrently in the same terminal

---

## 🎯 Usage

### From Frontend Directory:
```powershell
cd "D:\AI Therapist\frontend"
npm run dev
```

### What You'll See:
```
[0] Starting backend...
[0] INFO:     Uvicorn running on http://127.0.0.1:8000
[1] Starting frontend...
[1] VITE v5.x.x  ready in XXX ms
[1] ➜  Local:   http://localhost:3000/
```

---

## 🛑 Stopping

Press `Ctrl+C` once - it will stop both servers.

---

## 🔧 Individual Commands (Optional)

If you need to run them separately:

**Backend only:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Frontend only:**
```powershell
cd frontend
npm run dev:frontend
```

---

## ✅ That's It!

Just run `npm run dev` from the frontend directory and everything starts automatically! 🎉


