// src/config/firebase.ts
import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface FirebaseConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}

class FirebaseAdmin {
  private static instance: FirebaseAdmin;
  public admin: admin.app.App;

  private constructor() {
    // Validate required environment variables
    const requiredEnvVars = [
      'FIREBASE_PROJECT_ID',
      'FIREBASE_PRIVATE_KEY', 
      'FIREBASE_CLIENT_EMAIL'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing required Firebase environment variables:', missingVars.join(', '));
      console.error('💡 Make sure your .env file exists and contains all required Firebase credentials');
      process.exit(1);
    }

    if (admin.apps.length === 0) {
      const config: FirebaseConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      };

      try {
        this.admin = admin.initializeApp({
          credential: admin.credential.cert(config),
          projectId: config.projectId,
        });
        
        console.log('✅ Firebase Admin initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Firebase Admin:', error);
        process.exit(1);
      }
    } else {
      this.admin = admin.app();
    }
  }

  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) {
      FirebaseAdmin.instance = new FirebaseAdmin();
    }
    return FirebaseAdmin.instance;
  }

  public get auth() {
    return this.admin.auth();
  }

  public get firestore() {
    return this.admin.firestore();
  }

  public get storage() {
    return this.admin.storage();
  }
}

export default FirebaseAdmin.getInstance();