# 🔧 Set Railway Environment Variables

## ✅ Backend Deployed Successfully!

**Railway URL:** https://mindalchemy-backend-production.up.railway.app

## ⚠️ Environment Variables Need to Be Set

The backend is deployed but needs environment variables to work properly.

## 📋 Quick Steps (Railway Dashboard)

1. **Go to Railway Dashboard:**
   - https://railway.com/project/90d25896-280a-4d87-a720-d3dad13ba3fc

2. **Click on your service** (mindalchemy-backend)

3. **Go to "Variables" tab**

4. **Add these variables:**
   ```
   GROQ_API_KEY = your_groq_api_key_here
   SECRET_KEY = your_secret_key_here
   ENVIRONMENT = production
   DEBUG = False
   CORS_ORIGINS = https://placeholder.vercel.app
   ```

5. **Save** - Railway will automatically redeploy

## ✅ After Setting Variables

Your backend will be fully functional! The Groq API warning will disappear.

## 🚀 Then Continue with Frontend

After variables are set, we can deploy the frontend to Vercel!

