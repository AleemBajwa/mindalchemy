import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import MoodTracker from './pages/MoodTracker'
import Journal from './pages/Journal'
import JournalEntry from './pages/JournalEntry'
import Progress from './pages/Progress'
import CBT from './pages/CBT'
import ThoughtRecord from './pages/ThoughtRecord'
import CrisisResources from './pages/CrisisResources'
import DBT from './pages/DBT'
import DBTTool from './pages/DBTTool'
import Meditation from './pages/Meditation'
import MeditationCategory from './pages/MeditationCategory'
import MeditationSession from './pages/MeditationSession'
import MeditationTimer from './pages/MeditationTimer'
import BreathingExercise from './components/BreathingExercise'
import Goals from './pages/Goals'
import Sleep from './pages/Sleep'
import Resources from './pages/Resources'
import Onboarding from './pages/Onboarding'
import CognitiveRestructuring from './pages/CognitiveRestructuring'
import BehavioralActivation from './pages/BehavioralActivation'
import NotificationSettings from './pages/NotificationSettings'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import WhiteNoise from './pages/WhiteNoise'
import ExposureTherapy from './pages/ExposureTherapy'
import ProblemSolving from './pages/ProblemSolving'
import Layout from './components/Layout'

function PrivateRoute({ children }) {
  const { isAuthenticated, token } = useAuthStore()
  const location = useLocation()

  // If there is no token and not authenticated, send to login.
  // If a token exists (e.g. after refresh), allow access and let
  // API 401s handle logout. This prevents refresh → forced logout.
  if (!token && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/onboarding"
          element={
            <PrivateRoute>
              <Onboarding />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/:id" element={<JournalEntry />} />
          <Route path="progress" element={<Progress />} />
          <Route path="cbt" element={<CBT />} />
          <Route path="cbt/thought-record/:id" element={<ThoughtRecord />} />
          <Route path="crisis" element={<CrisisResources />} />
          <Route path="dbt" element={<DBT />} />
          <Route path="dbt/:toolId" element={<DBTTool />} />
          <Route path="meditation" element={<Meditation />} />
          <Route path="meditation/breathing" element={<BreathingExercise />} />
          <Route path="meditation/timer" element={<MeditationTimer />} />
          <Route path="meditation/:category/:duration" element={<MeditationSession />} />
          <Route path="meditation/:category" element={<MeditationCategory />} />
          <Route path="goals" element={<Goals />} />
          <Route path="sleep" element={<Sleep />} />
          <Route path="resources" element={<Resources />} />
          <Route path="cbt/cognitive-restructuring" element={<CognitiveRestructuring />} />
          <Route path="cbt/behavioral-activation" element={<BehavioralActivation />} />
          <Route path="cbt/exposure-therapy" element={<ExposureTherapy />} />
          <Route path="cbt/problem-solving" element={<ProblemSolving />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="white-noise" element={<WhiteNoise />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

