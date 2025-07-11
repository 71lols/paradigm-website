// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';

// Import routes
import authRoutes from './routes/authRoutes';
import contextRoutes from './routes/contextRoutes';
import activityRoutes from './routes/activityRoutes';
import downloadRoutes from './routes/downloadRoutes';

// Import utilities
import { AppError } from './utils/AppError';
import { ResponseUtil } from './utils/response';

// Create Express app
const app: Application = express();

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Global middleware

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          'https://paradigm-website-five.vercel.app',
          process.env.FRONTEND_URL
        ].filter(Boolean)
      : ['http://localhost:3000', 'http://127.0.0.1:3000'];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Global rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  ResponseUtil.success(res, {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  }, 'Server is healthy');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contexts', contextRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/download', downloadRoutes);

// Handle 404 routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
});

// Global error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);

  // Default error values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  // Handle specific Firebase errors
  if (error.code?.startsWith('auth/')) {
    statusCode = 400;
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'User not found';
        break;
      case 'auth/wrong-password':
        message = 'Invalid credentials';
        break;
      case 'auth/email-already-exists':
        message = 'Email already registered';
        statusCode = 409;
        break;
      case 'auth/weak-password':
        message = 'Password is too weak';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email format';
        break;
      default:
        message = 'Authentication error';
    }
  }

  // Handle Joi validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.details?.map((detail: any) => detail.message).join(', ') || 'Validation error';
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
  }

  ResponseUtil.error(res, message, statusCode, 
    process.env.NODE_ENV === 'development' ? error.stack : undefined
  );
});

export default app;