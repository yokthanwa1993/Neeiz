import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LiffProvider } from './contexts/LiffContext';

// --- Public Routes ---
import LineLogin from './components/LineLogin';
import LineCallback from './components/LineCallback';
import JobDetail from './components/JobDetail'; // สมมติว่าหน้ารายละเอียดงานดูได้ทุกคน
import NotFound from './pages/NotFound'; // หน้า 404

// --- Role-Based Route Protector ---
import RoleBasedProtectedRoute from './components/RoleBasedProtectedRoute';

// --- Job Seeker Components ---
import HomeScreen from './components/HomeScreen';
import JobFeed from './components/JobFeed';
import ProfilePage from './components/ProfilePage';
import MyShifts from './components/MyShifts';
import Wallet from './components/Wallet';
import ChatPage from './components/ChatPage';
import ChatHistoryPage from './pages/ChatHistoryPage';
import NotificationsPage from './pages/NotificationsPage';

// --- Employer Components (ตัวอย่าง) ---
// คุณจะต้องสร้างหน้าเหล่านี้ขึ้นมาใหม่
const EmployerDashboard = () => <div><h1>Employer Dashboard</h1><p>Welcome, employer!</p></div>;
const PostJob = () => <div><h1>Post a New Job</h1></div>;


const AppContent = () => {
  const { isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full">
        <Routes>
          {/* === Public Routes: ทุกคนสามารถเข้าได้ === */}
          <Route path="/login" element={<LineLogin onLoginSuccess={() => navigate('/')} />} />
          <Route path="/callback" element={<LineCallback />} />
          <Route path="/job/:id" element={<JobDetail />} />

          {/* === Job Seeker Routes: สำหรับผู้หางานเท่านั้น === */}
          <Route element={<RoleBasedProtectedRoute allowedRoles={['job_seeker']} />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/jobs" element={<JobFeed />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-shifts" element={<MyShifts />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/chat-history" element={<ChatHistoryPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            {/* หน้าย่อยอื่นๆ ของผู้หางาน */}
          </Route>

          {/* === Employer Routes: สำหรับผู้จ้างงานเท่านั้น === */}
          <Route path="/employer" element={<RoleBasedProtectedRoute allowedRoles={['employer']} />}>
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="post-job" element={<PostJob />} />
            {/* หน้าย่อยอื่นๆ ของผู้จ้างงาน เช่น /employer/applicants, /employer/profile */}
          </Route>
          
          {/* === Not Found Route === */}
          <Route path="*" element={<NotFound />} />
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
