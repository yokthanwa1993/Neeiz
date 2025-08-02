import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBvRiVMDAeqAKiylft59YPwc90oFz-WCXo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "neeiz-01.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "neeiz-01",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "neeiz-01.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "967647307195",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:967647307195:web:75dee1f61f4822a4da509e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-T1QDJYTSK9"
};

// Validate required config
const requiredKeys = ['apiKey', 'authDomain', 'projectId'];
const missingKeys = requiredKeys.filter(key => {
  const value = firebaseConfig[key as keyof typeof firebaseConfig];
  return !value || value.includes('dummy');
});

if (missingKeys.length > 0) {
  console.warn('⚠️ Firebase Config Warning: Using default values for:', missingKeys);
  console.log('📝 For production, set these environment variables in CapRover:');
  console.log('   - VITE_FIREBASE_API_KEY');
  console.log('   - VITE_FIREBASE_AUTH_DOMAIN'); 
  console.log('   - VITE_FIREBASE_PROJECT_ID');
  console.log('   - VITE_FIREBASE_STORAGE_BUCKET');
  console.log('   - VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.log('   - VITE_FIREBASE_APP_ID');
  console.log('   - VITE_FIREBASE_MEASUREMENT_ID');
}

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let analytics: Analytics | undefined;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Enable persistence for authentication
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('✅ Firebase Auth persistence enabled');
    })
    .catch((error) => {
      console.error('❌ Failed to enable Firebase Auth persistence:', error);
    });
  
  db = getFirestore(app);
  
  // Initialize Analytics only in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  console.log('✅ Firebase initialized successfully');
  console.log('🔥 Project ID:', firebaseConfig.projectId);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw new Error('Firebase configuration is invalid. Please check your environment variables.');
}

export { auth, db, analytics };
export default app;