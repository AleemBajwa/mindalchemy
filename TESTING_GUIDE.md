# AI Therapist - Testing Guide

## ✅ Setup Complete!

The application has been set up and is ready for testing.

## 🚀 How to Start

### Backend (Terminal 1)
```bash
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend will be available at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## ⚙️ Configuration Required

### 1. Groq API Key
You need to add your Groq API key to test the AI chat feature:

1. Get your API key from: https://console.groq.com/
2. Create `backend/.env` file with:
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

### 2. Frontend Environment
Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Therapist
```

## 🧪 Testing Steps

### 1. Test Backend API
1. Open `http://localhost:8000/docs` in browser
2. Test registration:
   - POST `/api/auth/register`
   - Body: `{"email": "test@example.com", "password": "test123", "full_name": "Test User"}`
3. Test login:
   - POST `/api/auth/login`
   - Form data: `username=test@example.com&password=test123`
   - Copy the `access_token`
4. Test chat (with token):
   - POST `/api/chat/`
   - Headers: `Authorization: Bearer <token>`
   - Body: `{"message": "Hello, I'm feeling anxious"}`
5. Test mood logging:
   - POST `/api/mood/`
   - Body: `{"mood_type": "anxious", "mood_value": 7}`

### 2. Test Frontend
1. Open `http://localhost:3000`
2. Register a new account
3. Login
4. Test features:
   - **Dashboard**: View stats and quick actions
   - **Chat**: Send messages to AI therapist (requires Groq API key)
   - **Mood Tracker**: Log your mood
   - **Journal**: Create journal entries
   - **Progress**: View analytics

## 🔍 What to Test

### ✅ Authentication
- [ ] User registration
- [ ] User login
- [ ] Protected routes (should redirect to login if not authenticated)
- [ ] Logout

### ✅ Chat Feature
- [ ] Send message to AI therapist
- [ ] Receive AI response
- [ ] Crisis detection (try: "I want to hurt myself")
- [ ] Crisis modal appears with resources
- [ ] Conversation history

### ✅ Mood Tracking
- [ ] Log mood with emoji selector
- [ ] Add intensity, trigger, notes
- [ ] View mood history
- [ ] View mood statistics

### ✅ Journal
- [ ] Create journal entry
- [ ] View journal entries list
- [ ] Edit journal entry
- [ ] Delete journal entry
- [ ] Add tags

### ✅ Progress
- [ ] View dashboard stats
- [ ] View mood trends
- [ ] View achievements
- [ ] View recent activity

## 🐛 Known Issues

1. **Groq API Key Required**: Chat feature won't work without a valid Groq API key
2. **Database**: SQLite database is created automatically on first run
3. **CORS**: Backend is configured to allow requests from `localhost:3000` and `localhost:5173`

## 📝 Notes

- Backend uses SQLite for easy setup (can be upgraded to PostgreSQL later)
- Frontend uses Vite dev server with hot reload
- All API endpoints require authentication except `/api/auth/register` and `/api/auth/login`
- Crisis detection is built-in and will show emergency resources

## 🎯 Next Steps

1. Add your Groq API key to test AI chat
2. Test all features
3. Report any issues
4. Enhance UI/UX as needed

---

**Happy Testing!** 🚀

