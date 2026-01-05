# MindAlchemy - Frontend

React + Vite frontend for MindAlchemy application. Transform your mind, discover your gold.

## 🚀 Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `VITE_API_URL` if your backend is running on a different port.

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── store/              # State management (Zustand)
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Features

- **Authentication**: Login and registration
- **Dashboard**: Overview with stats and quick actions
- **Chat**: Real-time chat with MindAlchemy AI guide
- **Mood Tracking**: Log and track moods
- **Journal**: Create and manage journal entries
- **Progress**: View analytics and achievements

## 🔧 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **date-fns** - Date formatting

## 📱 Pages

- `/login` - Login page
- `/register` - Registration page
- `/` - Dashboard
- `/chat` - Chat with MindAlchemy AI guide
- `/mood` - Mood tracking
- `/journal` - Journal entries
- `/progress` - Progress and analytics

## 🔐 Authentication

The app uses JWT tokens stored in localStorage. Tokens are automatically included in API requests.

## 🎯 Next Steps

- Add journal entry creation/edit pages
- Enhance mood calendar view
- Add more analytics charts
- Improve responsive design
- Add loading states and error handling

