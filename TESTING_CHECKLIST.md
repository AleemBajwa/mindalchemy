# MindAlchemy - Testing Checklist

## 🧪 Testing Guide

### ✅ Server Status
- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000 (or port shown)
- [ ] Both servers started successfully

---

## 🔐 Authentication Testing

### Registration
- [ ] Open http://localhost:3000
- [ ] Click "Sign up" or navigate to /register
- [ ] Fill in registration form:
  - Full Name: Test User
  - Email: test@example.com
  - Password: test123456
  - Confirm Password: test123456
- [ ] Click "Create Account"
- [ ] ✅ Should redirect to dashboard after successful registration

### Login
- [ ] Navigate to /login
- [ ] Enter credentials:
  - Email: test@example.com
  - Password: test123456
- [ ] Click "Sign In"
- [ ] ✅ Should redirect to dashboard

### Logout
- [ ] Click logout button in header
- [ ] ✅ Should redirect to login page

---

## 🏠 Dashboard Testing

- [ ] Dashboard loads with greeting
- [ ] Quick mood selector displays (5 emojis)
- [ ] Stats cards show:
  - Sessions count
  - Day streak
  - Journal entries
- [ ] Quick action cards display:
  - Chat with AI
  - Log Mood
  - Journal
  - Progress
- [ ] Recent activity section displays (if any)
- [ ] Bottom navigation works

---

## 💬 Chat Testing

### Basic Chat
- [ ] Navigate to Chat page
- [ ] See welcome message from MindAlchemy AI guide
- [ ] Type a message: "I'm feeling anxious about work"
- [ ] Click Send or press Enter
- [ ] ✅ See typing indicator
- [ ] ✅ Receive AI response
- [ ] ✅ Message appears in chat history

### Crisis Detection
- [ ] Type: "I want to hurt myself"
- [ ] ✅ Crisis modal should appear
- [ ] ✅ Emergency resources displayed:
  - National Suicide Prevention: 988
  - Crisis Text Line: 741741
  - Emergency Services: 911
- [ ] Click "I understand, continue"
- [ ] ✅ Modal closes, conversation continues

### Chat History
- [ ] Send multiple messages
- [ ] ✅ All messages appear in order
- [ ] ✅ Timestamps display correctly
- [ ] ✅ User messages on right, AI on left

**Note**: Chat requires Groq API key in backend/.env to work fully

---

## 😊 Mood Tracking Testing

### Log Mood
- [ ] Navigate to Mood page
- [ ] Select a mood (e.g., 😊 Happy)
- [ ] ✅ Mood details form appears
- [ ] Adjust intensity slider (1-10)
- [ ] Add trigger (optional): "Had a good day"
- [ ] Add notes (optional): "Feeling great!"
- [ ] Click "Save Mood"
- [ ] ✅ Mood saved successfully
- [ ] ✅ Appears in recent mood logs

### View Mood History
- [ ] Scroll to "Recent Mood Logs" section
- [ ] ✅ See saved moods with:
  - Emoji
  - Mood type
  - Timestamp
  - Notes (if added)
  - Intensity value

---

## 📝 Journal Testing

### Create Entry
- [ ] Navigate to Journal page
- [ ] Click "+ New Entry" button
- [ ] Add title: "My First Entry"
- [ ] Add content: "Today I learned about MindAlchemy..."
- [ ] Add tags: "reflection, growth"
- [ ] Click "Save Entry"
- [ ] ✅ Entry saved and appears in list

### View Entries
- [ ] See list of journal entries
- [ ] ✅ Each entry shows:
  - Title
  - Date
  - Preview of content
  - Tags

### Edit Entry
- [ ] Click on an entry
- [ ] ✅ Entry opens for editing
- [ ] Make changes
- [ ] Save
- [ ] ✅ Changes reflected

---

## 📊 Progress Testing

- [ ] Navigate to Progress page
- [ ] ✅ See stats cards:
  - Day streak
  - Chat sessions
  - Journal entries
- [ ] ✅ See mood statistics:
  - Total mood logs
  - Average mood
  - Recent trend
  - Mood distribution
- [ ] ✅ See achievements section
- [ ] ✅ Achievements show earned/unearned status

---

## 🔧 API Testing (Optional)

### Using API Docs
- [ ] Open http://localhost:8000/docs
- [ ] ✅ Swagger UI loads
- [ ] Test endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me
  - POST /api/chat/
  - POST /api/mood/
  - GET /api/mood/
  - POST /api/journal/
  - GET /api/user/dashboard

---

## 🐛 Common Issues & Solutions

### Backend Not Starting
- Check if port 8000 is available
- Verify virtual environment is activated
- Check .env file exists
- Look for error messages in terminal

### Frontend Not Starting
- Check if port 3000 is available
- Run `npm install` if needed
- Check for error messages in terminal

### Chat Not Working
- Verify Groq API key in backend/.env
- Check backend logs for API errors
- Test API directly at /docs

### Authentication Issues
- Clear browser localStorage
- Check backend logs
- Verify JWT secret key in .env

---

## ✅ Success Criteria

All features working:
- [x] User can register and login
- [x] Dashboard displays correctly
- [x] Chat interface works (with Groq API key)
- [x] Mood tracking saves and displays
- [x] Journal entries can be created
- [x] Progress page shows data
- [x] Crisis detection works
- [x] Navigation works between pages

---

## 📝 Test Results

**Date**: _______________  
**Tester**: _______________  

**Issues Found**:
1. 
2. 
3. 

**Notes**:
- 

---

**Happy Testing!** 🧪✨

