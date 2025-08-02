import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const RoleBasedProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    // ถ้ายังไม่ได้ login ให้ redirect ไปหน้า login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // ถ้า role ไม่ถูกต้อง อาจจะ redirect ไปหน้าหลักของ role ตัวเอง
    // หรือหน้า "Access Denied"
    const homePath = user.role === 'job_seeker' ? '/' : '/employer/dashboard';
    return <Navigate to={homePath} replace />;
  }

  // ถ้าทุกอย่างถูกต้อง ให้แสดงหน้าที่ต้องการ
  return <Outlet />;
};

export default RoleBasedProtectedRoute;
