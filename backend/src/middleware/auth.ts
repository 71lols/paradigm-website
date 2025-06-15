// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import firebaseAdmin from '../config/firebase';
import { AppError } from '../utils/AppError';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email: string;
    emailVerified: boolean;
    role?: string;
    [key: string]: any;
  };
}

/**
 * Middleware to verify Firebase ID token
 */
export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided or invalid format', 401);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    // Verify the Firebase ID token
    const decodedToken = await firebaseAdmin.auth.verifyIdToken(token);
    
    // Get additional user data from Firebase Auth
    const userRecord = await firebaseAdmin.auth.getUser(decodedToken.uid);
    
    // Destructure to avoid property conflicts
    const { uid, email, email_verified, ...otherClaims } = decodedToken;
    
    // Attach user info to request object
    req.user = {
      uid,
      email: email || userRecord.email || '',
      emailVerified: email_verified || userRecord.emailVerified,
      role: (decodedToken as any).role || 'user', // Default role
      ...otherClaims
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      console.error('Auth middleware error:', error);
      next(new AppError('Invalid or expired token', 401));
    }
  }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (roles: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const userRole = req.user.role || 'user';
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      throw new AppError('Insufficient permissions', 403);
    }

    next();
  };
};

/**
 * Optional auth middleware - doesn't throw error if no token
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next();
    }

    const decodedToken = await firebaseAdmin.auth.verifyIdToken(token);
    const userRecordOptional = await firebaseAdmin.auth.getUser(decodedToken.uid);
    
    // Destructure to avoid property conflicts
    const { uid, email, email_verified, ...otherClaims } = decodedToken;
    
    req.user = {
      uid,
      email: email || userRecordOptional.email || '',
      emailVerified: email_verified || userRecordOptional.emailVerified,
      role: (decodedToken as any).role || 'user',
      ...otherClaims
    };

    next();
  } catch (error) {
    // Don't throw error for optional auth
    console.warn('Optional auth failed:', error);
    next();
  }
};