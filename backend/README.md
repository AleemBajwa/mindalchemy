# MindAlchemy - Backend API

FastAPI backend for MindAlchemy application with Groq API integration. Transform your mind, discover your gold.

## 🚀 Setup

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `GROQ_API_KEY` - Your Groq API key from [console.groq.com](https://console.groq.com/)
- `SECRET_KEY` - Random secret key for JWT tokens
- `DATABASE_URL` - Database connection string (SQLite for development)

### 3. Initialize Database

```bash
python -c "from app.database import engine, Base; Base.metadata.create_all(bind=engine)"
```

### 4. Run the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user info

### Chat
- `POST /api/chat/` - Send message to MindAlchemy AI guide
- `GET /api/chat/sessions` - Get all chat sessions
- `GET /api/chat/sessions/{id}` - Get specific session
- `DELETE /api/chat/sessions/{id}` - Delete session

### Mood Tracking
- `POST /api/mood/` - Log mood
- `GET /api/mood/` - Get mood logs
- `GET /api/mood/stats` - Get mood statistics
- `GET /api/mood/{id}` - Get specific mood log

### Journal
- `POST /api/journal/` - Create journal entry
- `GET /api/journal/` - Get all entries
- `GET /api/journal/{id}` - Get specific entry
- `PUT /api/journal/{id}` - Update entry
- `DELETE /api/journal/{id}` - Delete entry

### User
- `GET /api/user/dashboard` - Get dashboard data

## 🔐 Authentication

All endpoints except `/api/auth/register` and `/api/auth/login` require authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## 🧪 Testing

Test the API using the interactive docs at `http://localhost:8000/docs` or use tools like Postman/curl.

Example registration:
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "full_name": "Test User"}'
```

Example login:
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=password123"
```

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/          # API routes
│   ├── models.py     # Database models
│   ├── schemas.py    # Pydantic schemas
│   ├── database.py   # Database configuration
│   ├── config.py     # App configuration
│   ├── main.py       # FastAPI app
│   └── services/     # Business logic
│       ├── groq_service.py
│       └── auth_service.py
├── requirements.txt
├── .env.example
└── README.md
```

## 🔧 Development

- The server runs with auto-reload on code changes
- Database is SQLite by default (easy to switch to PostgreSQL)
- All API endpoints are documented at `/docs`

## 🚨 Crisis Detection

The chat service automatically detects crisis keywords and provides immediate resources. Crisis detection is built into the Groq service.

