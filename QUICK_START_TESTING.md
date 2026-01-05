# MindAlchemy - Quick Start Testing

## 🚀 Servers Started!

Two PowerShell windows should have opened:
1. **Backend Server** - Running on http://localhost:8000
2. **Frontend Server** - Running on http://localhost:3000

The browser should open automatically to http://localhost:3000

---

## ✅ Quick Test Steps

### 1. **Registration** (2 minutes)
1. You should see the **MindAlchemy** login page
2. Click "Sign up" or go to http://localhost:3000/register
3. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: test123456
   - Confirm: test123456
4. Click "Create Account"
5. ✅ Should redirect to dashboard

### 2. **Dashboard** (1 minute)
- ✅ See "Hello, [Your Name] 👋"
- ✅ See quick mood selector (5 emojis)
- ✅ See stats cards (Sessions, Streak, Entries)
- ✅ See quick action cards

### 3. **Mood Tracking** (2 minutes)
1. Click on a mood emoji (😊, 😌, etc.)
2. Or click "Log Mood" quick action
3. Select a mood
4. Adjust intensity slider
5. Add notes (optional)
6. Click "Save Mood"
7. ✅ Mood appears in recent logs

### 4. **Journal** (2 minutes)
1. Click "Journal" in bottom nav
2. Click "+ New Entry"
3. Add title and content
4. Add tags (optional)
5. Save
6. ✅ Entry appears in list

### 5. **Chat** (3 minutes)
1. Click "Chat" in bottom nav
2. See welcome message from MindAlchemy AI guide
3. Type: "I'm feeling stressed"
4. Press Enter or click Send
5. ✅ Get AI response (if Groq API key is set)
6. ✅ Messages appear in chat

**Note**: Chat requires Groq API key in `backend/.env`

### 6. **Crisis Detection** (1 minute)
1. In chat, type: "I want to hurt myself"
2. ✅ Crisis modal appears
3. ✅ Emergency resources shown
4. Click "I understand, continue"

### 7. **Progress** (1 minute)
1. Click "Progress" in bottom nav
2. ✅ See stats and achievements
3. ✅ See mood statistics

---

## 🔍 What to Check

### Visual
- [ ] "MindAlchemy" appears in header (🧪 icon)
- [ ] All pages load correctly
- [ ] Navigation works smoothly
- [ ] Colors and styling look good

### Functionality
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard displays data
- [ ] Mood tracking saves
- [ ] Journal entries save
- [ ] Chat sends messages (if API key set)
- [ ] Crisis detection works
- [ ] Progress page shows data

---

## ⚠️ If Chat Doesn't Work

Chat requires Groq API key:
1. Open `backend/.env`
2. Replace `your_groq_api_key_here` with your actual key
3. Restart backend server
4. Try chat again

Get API key from: https://console.groq.com/

---

## 🐛 Troubleshooting

### Backend Issues
- Check PowerShell window for errors
- Verify .env file exists
- Check port 8000 is free

### Frontend Issues
- Check PowerShell window for errors
- Try http://localhost:5173 (Vite default)
- Clear browser cache

### API Errors
- Check backend logs
- Verify database is initialized
- Check .env configuration

---

## 📊 Test Results

**Backend Status**: ✅ Running  
**Frontend Status**: ✅ Running  
**Database**: ✅ Initialized  

**Ready to test!** 🧪✨

---

**Open http://localhost:3000 and start testing!**

