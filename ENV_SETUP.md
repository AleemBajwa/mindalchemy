# Environment Variables Setup

## 📝 Create .env Files

I've created a PowerShell script to generate the `.env` files. Run it, or manually create them as shown below.

## 🔧 Backend .env File

Create `backend/.env` with the following content:

```env
# Groq API Configuration
# Get your API key from: https://console.groq.com/
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant

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
```

**Important**: Replace `your_groq_api_key_here` with your actual Groq API key from https://console.groq.com/

## 🎨 Frontend .env File

Create `frontend/.env` with the following content:

```env
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Therapist
```

## 🚀 Quick Setup

### Option 1: Use the Script
```powershell
cd "D:\AI Therapist"
powershell -ExecutionPolicy Bypass -File create_env_files.ps1
```

### Option 2: Manual Creation

1. **Backend**: Create `backend/.env` file and paste the backend content above
2. **Frontend**: Create `frontend/.env` file and paste the frontend content above
3. **Update**: Replace `your_groq_api_key_here` with your actual Groq API key

## 🔑 Getting Your Groq API Key

1. Go to https://console.groq.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key
6. Paste it in `backend/.env` replacing `your_groq_api_key_here`

## ✅ Verification

After creating the files, verify they exist:
- `backend/.env` ✓
- `frontend/.env` ✓

Then start the servers and test!

---

**Note**: The `.env` files are in `.gitignore` to keep your API keys secure.

