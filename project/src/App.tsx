import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LoginForm } from './components/auth/LoginForm';
import { EventsList } from './components/events/EventsList';
import { DocumentRequest } from './components/documents/DocumentRequest';
import { CourseLibrary } from './components/courses/CourseLibrary';
import { Schedule } from './components/schedule/Schedule';
import { Profile } from './components/profile/Profile';
import { Community } from './components/community/Community';
import { Notifications } from './components/notifications/Notifications';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { getCurrentUser, signOut } from './lib/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<EventsList />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/profile" replace /> : 
                <LoginForm onLogin={handleLogin} />
              } 
            />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Schedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DocumentRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CourseLibrary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Community />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;