// src/routes/authRoutes.ts
import { Router } from 'express';
import { authController } from '../controllers/authController';
import { verifyToken, optionalAuth } from '../middleware/auth';
import { validate } from '../utils/validation';
import { authSchemas } from '../utils/validation';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 password reset attempts per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later',
    timestamp: new Date().toISOString(),
  },
});

// Public routes
router.post(
  '/signup',
  authLimiter,
  validate(authSchemas.signUp),
  authController.signUp
);

router.post(
  '/create-social-profile',
  authLimiter,
  authController.createSocialProfile
);

router.post(
  '/verify-token',
  verifyToken,
  authController.verifyToken
);

router.post(
  '/reset-password',
  resetPasswordLimiter,
  validate(authSchemas.resetPassword),
  authController.resetPassword
);

// Protected routes (require authentication)
router.use(verifyToken); // All routes below require authentication

router.get('/profile', authController.getProfile);

router.patch(
  '/profile',
  validate(authSchemas.updateProfile),
  authController.updateProfile
);

router.post('/refresh-token', authController.refreshToken);

router.delete('/account', authController.deleteAccount);

export default router;