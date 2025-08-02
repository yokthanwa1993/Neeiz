import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🏁 [1/5] Server script started.');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Correctly locate the root .env file ---
const envPath = path.join(__dirname, '..', '..', '..', '.env');
dotenv.config({ path: envPath });
console.log(`📂 [2/5] Attempting to load .env file from: ${envPath}`);

// --- Initialize Firebase Admin ---
console.log('🔐 [3/5] Initializing Firebase Admin...');
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is not set in environment variables.");
  }
  
  const decodedServiceAccount = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
  const serviceAccount = JSON.parse(decodedServiceAccount);
  
  // --- FIX: Check if app is already initialized ---
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin initialized successfully.');
  } else {
    console.warn('⚠️ Firebase Admin was already initialized.');
  }
} catch (error) {
    if (error instanceof Error) {
        console.error('❌ [FATAL] Failed during Firebase initialization:', error.message);
    } else {
        console.error('❌ [FATAL] Failed during Firebase initialization with an unknown error.');
    }
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🚀 [4/5] Configuring Express server...');

// Middleware
app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    firebase: admin.apps.length > 0 ? 'connected' : 'disconnected'
  });
});

// LINE Authentication endpoint
app.post('/api/auth/line', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: 'ID Token is required' });
    }

    const lineResponse = await axios.post('https://api.line.me/oauth2/v2.1/verify', 
      `id_token=${idToken}&client_id=${process.env.LINE_CHANNEL_ID}`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const lineUser = lineResponse.data;
    if (!lineUser.sub) {
      return res.status(401).json({ message: 'Invalid LINE token' });
    }

    const userProfile = {
      displayName: lineUser.name || 'ผู้ใช้ LINE',
      email: lineUser.email || '',
      pictureUrl: lineUser.picture || ''
    };

    const uid = `line_${lineUser.sub}`;
    
    try {
      await admin.auth().updateUser(uid, {
        displayName: userProfile.displayName,
        photoURL: userProfile.pictureUrl,
      });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        const createUserData: admin.auth.CreateRequest = {
          uid,
          displayName: userProfile.displayName,
          photoURL: userProfile.pictureUrl,
        };
        if (userProfile.email) {
            createUserData.email = userProfile.email;
        }
        await admin.auth().createUser(createUserData);
      } else {
        throw error;
      }
    }

    const customToken = await admin.auth().createCustomToken(uid);

    res.json({
      customToken,
      user: {
        uid,
        displayName: userProfile.displayName,
        email: userProfile.email,
        pictureUrl: userProfile.pictureUrl
      }
    });

  } catch (error) {
    if (error instanceof Error) {
        console.error('❌ LINE authentication error:', error.message);
        if (axios.isAxiosError(error) && error.response) {
            return res.status(401).json({ message: 'LINE token verification failed', details: error.response.data });
        }
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } else {
        console.error('❌ LINE authentication error with an unknown error.');
        res.status(500).json({ message: 'Internal server error' });
    }
  }
});


app.listen(PORT, () => {
  console.log(`✅ [5/5] Server is live and listening on http://localhost:${PORT}`);
});
