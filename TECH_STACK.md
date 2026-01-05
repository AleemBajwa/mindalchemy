# AI Therapist - Technology Stack

## 🎯 PRIMARY TECHNOLOGIES

### **AI/ML Backend**
- **Groq API** - Primary AI service for conversational therapy
  - Model: `llama-3.1-70b-versatile` (recommended)
  - Alternative: `llama-3.1-8b-instant` (faster responses)
  - SDK: `groq` (Python) / `groq-sdk` (Node.js)

### **Backend Framework Options**

**Option 1: Python (Recommended)**
- **Framework**: FastAPI or Flask
- **Database**: PostgreSQL / SQLite (development)
- **ORM**: SQLAlchemy
- **Authentication**: JWT tokens
- **API**: RESTful API

**Option 2: Node.js**
- **Framework**: Express.js / Next.js (API routes)
- **Database**: PostgreSQL / MongoDB
- **ORM/ODM**: Prisma / Mongoose
- **Authentication**: JWT tokens
- **API**: RESTful API

### **Frontend Framework Options**

**Option 1: React (Recommended)**
- **Framework**: React 18+
- **UI Library**: 
  - Material-UI (MUI)
  - Tailwind CSS + Headless UI
  - Chakra UI
- **State Management**: Redux Toolkit / Zustand
- **Routing**: React Router
- **HTTP Client**: Axios / Fetch API

**Option 2: Next.js (Full-Stack)**
- **Framework**: Next.js 14+ (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: React Context / Zustand
- **API Routes**: Built-in Next.js API

**Option 3: Vue.js**
- **Framework**: Vue 3
- **UI**: Vuetify / Quasar
- **State**: Pinia
- **Routing**: Vue Router

### **Mobile App (Optional)**
- **React Native** - Cross-platform mobile
- **Flutter** - Alternative cross-platform
- **Progressive Web App (PWA)** - Web-based mobile experience

---

## 🗄️ DATABASE STRUCTURE

### **Core Tables/Collections:**

1. **Users**
   - id, email, password_hash, created_at, updated_at
   - profile_data (goals, concerns, preferences)

2. **Sessions**
   - id, user_id, messages (JSON), created_at, sentiment
   - session_summary, duration

3. **Mood Logs**
   - id, user_id, mood_value, mood_type, notes, created_at
   - triggers, intensity

4. **Journal Entries**
   - id, user_id, title, content, tags, created_at, updated_at

5. **CBT Exercises**
   - id, user_id, exercise_type, data (JSON), completed_at
   - progress, results

6. **Progress Data**
   - id, user_id, metric_type, value, date, notes

---

## 🔧 DEVELOPMENT TOOLS

### **Version Control**
- Git
- GitHub / GitLab

### **Package Management**
- **Python**: pip, poetry, or conda
- **Node.js**: npm or yarn
- **Python Virtual Environment**: venv or virtualenv

### **Code Quality**
- **Linting**: ESLint (JS/TS), Pylint/Flake8 (Python)
- **Formatting**: Prettier (JS/TS), Black (Python)
- **Type Checking**: TypeScript, mypy (Python)

### **Testing**
- **Unit Tests**: Jest (JS), pytest (Python)
- **Integration Tests**: Supertest (Node), pytest (Python)
- **E2E Tests**: Playwright, Cypress

### **Environment Management**
- `.env` files
- `python-dotenv` (Python)
- `dotenv` (Node.js)

---

## 📦 RECOMMENDED PROJECT STRUCTURE

```
ai-therapist/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI/Flask app
│   │   ├── models/              # Database models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── api/                 # API routes
│   │   │   ├── auth.py
│   │   │   ├── chat.py
│   │   │   ├── mood.py
│   │   │   └── journal.py
│   │   ├── services/            # Business logic
│   │   │   ├── groq_service.py  # Groq API integration
│   │   │   ├── auth_service.py
│   │   │   └── crisis_detector.py
│   │   └── utils/               # Utilities
│   ├── requirements.txt
│   ├── .env.example
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Chat/
│   │   │   ├── MoodTracker/
│   │   │   ├── Journal/
│   │   │   └── Dashboard/
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── store/               # State management
│   │   ├── utils/               # Utilities
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
├── docs/                        # Documentation
│   ├── WORKFLOW_AND_FEATURES.md
│   ├── GROQ_IMPLEMENTATION_GUIDE.md
│   └── API_DOCUMENTATION.md
│
├── .gitignore
├── README.md
└── docker-compose.yml           # Optional: Docker setup
```

---

## 🚀 RECOMMENDED STACK (MVP)

### **Backend:**
- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: SQLAlchemy
- **AI**: Groq API (llama-3.1-70b-versatile)

### **Frontend:**
- **Framework**: React 18+ with Vite
- **UI**: Tailwind CSS + Headless UI
- **State**: Zustand
- **HTTP**: Axios
- **Routing**: React Router

### **Why This Stack?**
- ✅ Fast development
- ✅ Easy Groq integration
- ✅ Modern, maintainable code
- ✅ Good performance
- ✅ Large community support

---

## 📋 DEPENDENCIES (Python Backend)

```txt
# requirements.txt
fastapi==0.104.1
uvicorn==0.24.0
groq==0.4.0
sqlalchemy==2.0.23
pydantic==2.5.0
python-dotenv==1.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
```

---

## 📋 DEPENDENCIES (React Frontend)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "zustand": "^4.4.7",
    "tailwindcss": "^3.3.6",
    "@headlessui/react": "^1.7.17",
    "lucide-react": "^0.294.0"
  }
}
```

---

## 🔐 ENVIRONMENT VARIABLES

### **Backend (.env)**
```env
# Groq API
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-70b-versatile

# Database
DATABASE_URL=sqlite:///./ai_therapist.db
# or PostgreSQL: postgresql://user:pass@localhost/dbname

# JWT
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# App
ENVIRONMENT=development
DEBUG=True
```

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AI Therapist
```

---

## 🐳 DOCKER SETUP (Optional)

```dockerfile
# Dockerfile (Backend)
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GROQ_API_KEY=${GROQ_API_KEY}
    volumes:
      - ./backend:/app
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

---

## 📱 DEPLOYMENT OPTIONS

### **Backend:**
- **Cloud**: AWS, Google Cloud, Azure
- **PaaS**: Railway, Render, Heroku
- **Serverless**: Vercel, AWS Lambda

### **Frontend:**
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront

### **Database:**
- **Cloud**: AWS RDS, Google Cloud SQL, Supabase
- **Managed**: PlanetScale, Neon

---

## 🎯 QUICK START COMMANDS

### **Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Groq API key
uvicorn app.main:app --reload
```

### **Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm run dev
```

---

## ✅ TECHNOLOGY DECISION MATRIX

| Feature | Technology | Reason |
|---------|-----------|--------|
| AI Service | Groq API | Fast, cost-effective, OpenAI-compatible |
| Backend | FastAPI | Fast, modern, async support |
| Frontend | React | Popular, large ecosystem |
| Database | PostgreSQL | Reliable, feature-rich |
| Auth | JWT | Stateless, scalable |
| UI | Tailwind CSS | Fast development, modern |

---

**Ready to start building!** 🚀

