import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, User as FirebaseUser, signInWithCustomToken } from 'firebase/auth';

// 1. กำหนดประเภทของ Role
export type UserRole = 'job_seeker' | 'employer';

interface User {
  id: string;
  name: string;
  picture?: string;
  email?: string;
  role: UserRole; // 2. เพิ่ม role เข้าไปใน User interface
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const getMockUser = (): User | null => {
  if (import.meta.env.DEV) {
    console.log('🔧 DEV MODE: Using mock user.');
    return {
      id: 'dev_user_01',
      name: 'นักพัฒนา',
      email: 'dev@example.com',
      picture: `https://i.pravatar.cc/150?u=dev_user_01`,
      role: 'job_seeker', // 3. เพิ่ม role ให้กับ mock user สำหรับทดสอบ
    };
  }
  return null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const mockUser = getMockUser();
    if (mockUser) return mockUser;

    try {
      const savedUser = localStorage.getItem('auth_user');
      console.log('🔍 Loading user from localStorage:', savedUser);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      return null;
    }
  });
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(() => {
    if (import.meta.env.DEV) return false;

    const cachedUser = localStorage.getItem('auth_user');
    const authCompleted = localStorage.getItem('auth_completed_at');
    const hasUserData = cachedUser && authCompleted;
    console.log('🔍 Initial loading state check:', { cachedUser: !!cachedUser, authCompleted: !!authCompleted, hasUserData });
    return !hasUserData;
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      return; 
    }

    console.log('🚀 AuthContext initialized, user state:', user);
    
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setIsLoading(false);
      return;
    }

    const loadUserData = async () => {
      try {
        console.log('🔄 Starting to load user data...');
        
        const cachedUser = localStorage.getItem('auth_user');
        const authCompleted = localStorage.getItem('auth_completed_at');
        
        if (cachedUser && authCompleted) {
          console.log('✅ Found cached user data, using immediately');
          try {
            const userData = JSON.parse(cachedUser) as User; // Cast to User
            // 4. ตรวจสอบว่ามี role หรือไม่ ถ้าไม่มีอาจจะต้องให้ผู้ใช้เลือก
            if (!userData.role) {
                console.warn('⚠️ User data from cache is missing a role. User might need to select one.');
                // คุณอาจจะ redirect ผู้ใช้ไปหน้าเลือก role ตรงนี้
            }
            if (!user) {
              setUser(userData);
              console.log('👤 User restored from cache:', userData);
            }
            setIsLoading(false);
            return;
          } catch (error) {
            console.warn('⚠️ Error parsing cached user data:', error);
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_completed_at');
          }
        }
        
        const storedCustomToken = localStorage.getItem('firebase_custom_token');
        const storedUserData = localStorage.getItem('firebase_user_data');
        
        console.log('🔍 Stored token exists:', !!storedCustomToken);
        console.log('🔍 Stored user data exists:', !!storedUserData);
        
        if (storedCustomToken && storedUserData) {
          console.log('🔄 Found stored Firebase token, signing in...');
          
          try {
            await signInWithCustomToken(auth, storedCustomToken);
            console.log('✅ Signed in to Firebase with stored token');
            
            const userData = JSON.parse(storedUserData);
            console.log('📋 Parsed user data:', userData);
            
            // 5. ดึง role มาจากข้อมูลที่ได้จาก backend
            //    สมมติว่า backend ส่ง role กลับมาใน object userData
            const userObj: User = {
              id: userData.uid,
              name: userData.displayName || 'ผู้ใช้ LINE',
              email: userData.email || '',
              picture: userData.pictureUrl || undefined,
              role: userData.role || 'job_seeker' // <-- **สำคัญ** ดึง role มาตรงนี้
                                                    // ควรมีค่า default หรือบังคับให้ผู้ใช้เลือก
            };
            
            console.log('👤 Setting user object:', userObj);
            setUser(userObj);
            localStorage.setItem('auth_user', JSON.stringify(userObj));
            localStorage.setItem('auth_completed_at', new Date().toISOString());
            console.log('✅ User data loaded from localStorage');
          } catch (tokenError) {
            console.warn('⚠️ Stored token is invalid, clearing stored data');
            console.error('Token error:', tokenError);
            localStorage.removeItem('firebase_custom_token');
            localStorage.removeItem('firebase_user_data');
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_completed_at');
          }
        } else {
          console.log('ℹ️ No stored Firebase token found');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        console.log('🔥 Firebase auth state changed:', firebaseUser ? 'logged in' : 'logged out');
        console.log('🔥 Firebase user:', firebaseUser);
        
        if (firebaseUser) {
          setFirebaseUser(firebaseUser);
          
          if (!user) {
            console.log('🔄 Setting user data from Firebase user...');
            
            // 6. เมื่อดึงข้อมูลจาก Firebase ควรจะต้องดึง role จากฐานข้อมูลของคุณ (เช่น Firestore)
            //    ในส่วนนี้ผมจะ hardcode ไว้ก่อนเพื่อเป็นตัวอย่าง
            //    const userRole = await fetchUserRoleFromDatabase(firebaseUser.uid);
            
            const userData: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'ผู้ใช้',
              email: firebaseUser.email || '',
              picture: firebaseUser.photoURL || undefined,
              role: 'job_seeker' // <-- **สำคัญ** ปกติต้องดึงค่านี้จาก Database ของคุณ
            };
            
            console.log('👤 User data from Firebase:', userData);
            setUser(userData);
            localStorage.setItem('auth_user', JSON.stringify(userData));
            console.log('✅ User data saved to localStorage from Firebase');
          } else {
            console.log('ℹ️ User data already exists, not updating from Firebase');
          }
        } else {
          setFirebaseUser(null);
          setUser(null);
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_completed_at');
          console.log('🚪 Firebase user is null. Cleared local user data.');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
      } finally {
        setIsLoading(false);
        console.log('🏁 Auth loading completed, isLoading:', false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const logout = async () => {
    if (import.meta.env.DEV) {
      console.log('🔧 DEV MODE: Logging out mock user and reloading.');
      setUser(null);
      localStorage.clear();
      window.location.reload();
      return;
    }

    try {
      console.log('🚪 Starting logout process...');
      
      if (auth) {
        await signOut(auth);
      }
      
      setUser(null);
      setFirebaseUser(null);
      
      localStorage.removeItem('auth_user');
      localStorage.removeItem('firebase_custom_token');
      localStorage.removeItem('firebase_user_data');
      localStorage.removeItem('liff_id_token');
      localStorage.removeItem('liff_user_id');
      localStorage.removeItem('liff_display_name');
      localStorage.removeItem('liff_picture_url');
      localStorage.removeItem('auth_completed_at');
      
      console.log('🚪 User logged out successfully, cleared all stored data');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    firebaseUser,
    setUser: (newUser: User | null) => {
      console.log('🔄 Setting user in AuthContext:', newUser);
      setUser(newUser);
      if (newUser) {
        localStorage.setItem('auth_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('auth_user');
      }
    },
    logout,
    isLoading,
  };

  console.log('🔄 AuthContext value updated:', { user, firebaseUser, isLoading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
