// src/controllers/authController.ts
import { Request, Response } from 'express';
import firebaseAdmin from '../config/firebase';
import { ResponseUtil } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { AuthenticatedRequest } from '../middleware/auth';

interface SignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface ResetPasswordRequest {
  email: string;
}

export const authController = {
  // Create user account
  signUp: catchAsync(async (req: Request, res: Response) => {
    const { email, password, displayName }: SignUpRequest = req.body;

    try {
      // Create user in Firebase Auth
      const userRecord = await firebaseAdmin.auth.createUser({
        email,
        password,
        displayName,
        emailVerified: false,
      });

      // Create user document in Firestore
      const userDoc = {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: displayName || null,
        role: 'user',
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profile: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          avatar: '',
        },
        preferences: {
          notifications: true,
          theme: 'light',
        },
      };

      await firebaseAdmin.firestore
        .collection('users')
        .doc(userRecord.uid)
        .set(userDoc);

      // Generate custom token for immediate sign-in
      const customToken = await firebaseAdmin.auth.createCustomToken(userRecord.uid);

      const responseData = {
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName,
          emailVerified: userRecord.emailVerified,
        },
        customToken,
      };

      return ResponseUtil.created(res, responseData, 'Account created successfully');
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      if (error.code === 'auth/email-already-exists') {
        throw new AppError('An account with this email already exists', 409);
      }
      
      throw new AppError('Failed to create account', 500);
    }
  }),

  // Create profile for social sign-in users
  createSocialProfile: catchAsync(async (req: Request, res: Response) => {
    const { uid, email, displayName, photoURL, provider } = req.body;

    console.log('Creating social profile for:', { uid, email, provider });

    try {
      // Check if user document already exists
      const existingDoc = await firebaseAdmin.firestore
        .collection('users')
        .doc(uid)
        .get();

      if (existingDoc.exists) {
        console.log('Profile already exists for UID:', uid);
        return ResponseUtil.success(res, existingDoc.data(), 'Profile already exists');
      }

      // Create user document in Firestore for social sign-in user
      const userDoc = {
        uid,
        email,
        displayName: displayName || null,
        role: 'user',
        emailVerified: true, // Social providers verify emails
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        provider,
        profile: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          avatar: photoURL || '',
        },
        preferences: {
          notifications: true,
          theme: 'light',
        },
      };

      await firebaseAdmin.firestore
        .collection('users')
        .doc(uid)
        .set(userDoc);

      console.log('Social profile created successfully for UID:', uid);
      return ResponseUtil.created(res, userDoc, 'Social profile created successfully');
    } catch (error: any) {
      console.error('Create social profile error:', error);
      throw new AppError('Failed to create social profile', 500);
    }
  }),

  // Verify user token and return user data
  verifyToken: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    // Get user data from Firestore
    const userDoc = await firebaseAdmin.firestore
      .collection('users')
      .doc(req.user.uid)
      .get();

    if (!userDoc.exists) {
      throw new AppError('User data not found', 404);
    }

    const userData = userDoc.data();

    return ResponseUtil.success(res, {
      user: {
        uid: req.user.uid,
        email: req.user.email,
        displayName: userData?.displayName,
        emailVerified: req.user.emailVerified,
        role: userData?.role || 'user',
        profile: userData?.profile || {},
        preferences: userData?.preferences || {},
      }
    }, 'Token verified successfully');
  }),

  // Get user profile
  getProfile: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    console.log('Getting profile for user:', req.user.uid);

    const userDoc = await firebaseAdmin.firestore
      .collection('users')
      .doc(req.user.uid)
      .get();

    if (!userDoc.exists) {
      console.log('User profile not found for UID:', req.user.uid);
      throw new AppError('User profile not found', 404);
    }

    const userData = userDoc.data();
    console.log('Profile found for user:', req.user.uid);

    return ResponseUtil.success(res, userData, 'Profile retrieved successfully');
  }),

  // Update user profile
  updateProfile: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { displayName, phoneNumber, firstName, lastName } = req.body;
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    // Update Firebase Auth profile
    const authUpdateData: any = {};
    if (displayName !== undefined) {
      authUpdateData.displayName = displayName;
      updateData.displayName = displayName;
    }
    if (phoneNumber !== undefined) {
      authUpdateData.phoneNumber = phoneNumber;
    }

    if (Object.keys(authUpdateData).length > 0) {
      await firebaseAdmin.auth.updateUser(req.user.uid, authUpdateData);
    }

    // Update Firestore profile
    if (firstName !== undefined || lastName !== undefined) {
      updateData.profile = {};
      if (firstName !== undefined) updateData.profile.firstName = firstName;
      if (lastName !== undefined) updateData.profile.lastName = lastName;
      if (phoneNumber !== undefined) updateData.profile.phoneNumber = phoneNumber;
    }

    await firebaseAdmin.firestore
      .collection('users')
      .doc(req.user.uid)
      .update(updateData);

    return ResponseUtil.success(res, updateData, 'Profile updated successfully');
  }),

  // Send password reset email
  resetPassword: catchAsync(async (req: Request, res: Response) => {
    const { email }: ResetPasswordRequest = req.body;

    try {
      // Generate password reset link
      const link = await firebaseAdmin.auth.generatePasswordResetLink(email);
      
      // In a real app, you'd send this via email service
      // For now, we'll just return success
      console.log('Password reset link:', link);

      return ResponseUtil.success(res, {}, 'Password reset email sent successfully');
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.code === 'auth/user-not-found') {
        // Don't reveal if email exists for security
        return ResponseUtil.success(res, {}, 'Password reset email sent successfully');
      }
      
      throw new AppError('Failed to send password reset email', 500);
    }
  }),

  // Delete user account
  deleteAccount: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    try {
      // Delete user from Firestore
      await firebaseAdmin.firestore
        .collection('users')
        .doc(req.user.uid)
        .delete();

      // Delete user from Firebase Auth
      await firebaseAdmin.auth.deleteUser(req.user.uid);

      return ResponseUtil.success(res, {}, 'Account deleted successfully');
    } catch (error) {
      console.error('Delete account error:', error);
      throw new AppError('Failed to delete account', 500);
    }
  }),

  // Refresh user token (create new custom token)
  refreshToken: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    try {
      const customToken = await firebaseAdmin.auth.createCustomToken(req.user.uid);

      return ResponseUtil.success(res, { customToken }, 'Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new AppError('Failed to refresh token', 500);
    }
  }),
};