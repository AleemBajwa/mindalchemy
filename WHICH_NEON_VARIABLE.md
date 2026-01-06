# 🔑 Which Neon Variable to Use?

## ✅ **USE: `POSTGRES_URL`**

**This is the one you need!**

---

## 🎯 Why `POSTGRES_URL`?

1. ✅ **Your code checks for it first** - The `database.py` file specifically looks for `POSTGRES_URL`
2. ✅ **Optimized for Vercel** - Designed for serverless functions
3. ✅ **Connection pooling** - Handles multiple requests efficiently
4. ✅ **Perfect for FastAPI** - Works seamlessly with SQLAlchemy

---

## 📋 What to Do:

### Step 1: Copy `POSTGRES_URL`
Copy the entire value (it starts with `postgres://` or `postgresql://`)

### Step 2: Add to Vercel Environment Variables

1. Go to: https://vercel.com/bajwas-projects-f61b0cf1/mindalchemy/settings/environment-variables

2. Click **"Add New"**

3. Add:
   - **Key:** `POSTGRES_URL`
   - **Value:** Paste the `POSTGRES_URL` value from Neon
   - **Environment:** Select all (Production, Preview, Development)
   - Click **"Save"**

---

## 🔍 Other Variables Explained:

### `DATABASE_URL`
- ✅ Also works, has connection pooling
- ⚠️ But `POSTGRES_URL` is checked first by your code

### `DATABASE_URL_UNPOOLED`
- ❌ No pooling - not ideal for serverless
- ⚠️ May hit connection limits

### `POSTGRES_URL_NON_POOLING`
- ❌ No pooling - not ideal for serverless
- ⚠️ May hit connection limits

### `POSTGRES_PRISMA_URL`
- ✅ Your code checks this as fallback
- ⚠️ But `POSTGRES_URL` is better

### Individual Parameters (PGHOST, PGUSER, etc.)
- ❌ Don't use these - your code expects a connection string

---

## ✅ Summary:

**Use `POSTGRES_URL`** - It's the perfect choice for your setup! 🎯

---

## 📝 Complete Environment Variables List:

After adding `POSTGRES_URL`, also add:

1. ✅ `POSTGRES_URL` = (from Neon)
2. ✅ `GROQ_API_KEY` = your Groq API key
3. ✅ `SECRET_KEY` = random string (for JWT tokens)
4. ✅ `CORS_ORIGINS` = `https://mindalchemy-93ucz0w6t-bajwas-projects-f61b0cf1.vercel.app,http://localhost:5173`

Then **redeploy** and you're done! 🚀
