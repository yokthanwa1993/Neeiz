import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LiffProvider } from './contexts/LiffContext';
import LineLogin from './components/LineLogin';
import ProfilePage from './components/ProfilePage';
import Wallet from './components/Wallet';
import MyShifts from './components/MyShifts';
import Onboarding from './components/Onboarding';
import JobDetail from './components/JobDetail';
import JobFeed from './components/JobFeed';
import HomeScreen from './components/HomeScreen';
import ChatPage from './components/ChatPage';
import SettingsPage from './pages/SettingsPage';
import ChatHistoryPage from './pages/ChatHistoryPage';
import NotificationsPage from './pages/NotificationsPage';
import FullTimeJobs from './pages/FullTimeJobs';
import LineCallback from './components/LineCallback';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const protectedRoute = (element: React.ReactElement) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/callback" element={<LineCallback />} />
          <Route path="/login" element={<LineLogin onLoginSuccess={() => navigate('/')} />} />
          <Route path="/profile" element={protectedRoute(<ProfilePage />)} />
          <Route path="/wallet" element={protectedRoute(<Wallet />)} />
          <Route path="/my-shifts" element={protectedRoute(<MyShifts />)} />
          <Route path="/onboarding" element={protectedRoute(<Onboarding />)} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/full-time-jobs" element={<FullTimeJobs />} />
          <Route path="/chat/:id" element={protectedRoute(<ChatPage />)} />
          <Route path="/settings" element={protectedRoute(<SettingsPage />)} />
          <Route path="/chat-history" element={protectedRoute(<ChatHistoryPage />)} />
          <Route path="/notifications" element={protectedRoute(<NotificationsPage />)} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LiffProvider>
        <Router>
          <AppContent />
        </Router>
      </LiffProvider>
    </AuthProvider>
  );
}

export default App;