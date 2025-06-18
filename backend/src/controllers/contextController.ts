// src/controllers/contextController.ts
import { Response } from 'express';
import firebaseAdmin from '../config/firebase';
import { ResponseUtil } from '../utils/response';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { AuthenticatedRequest } from '../middleware/auth';
import { 
  AIContext, 
  CreateContextRequest, 
  UpdateContextRequest,
  ContextCategory,
  CreateCategoryRequest,
  ContextFilters 
} from '../types/context';

export const contextController = {
  // Get all contexts for the authenticated user
  getContexts: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const filters: ContextFilters = req.query as any;
    
    let query = firebaseAdmin.firestore
      .collection('contexts')
      .where('userId', '==', req.user.uid);

    // Apply filters
    if (filters.category) {
      query = query.where('category', '==', filters.category);
    }
    
    if (filters.isActive !== undefined) {
      query = query.where('isActive', '==', filters.isActive);
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'updatedAt';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.orderBy(sortBy, sortOrder);

    // Apply pagination
    const limit = filters.limit || 20;
    const offset = filters.offset || 0;
    
    if (offset > 0) {
      query = query.offset(offset);
    }
    query = query.limit(limit);

    const snapshot = await query.get();
    let contexts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AIContext[];

    // Apply search filter (Firestore doesn't support full-text search)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      contexts = contexts.filter(context => 
        context.title.toLowerCase().includes(searchLower) ||
        context.description.toLowerCase().includes(searchLower)
      );
    }

    return ResponseUtil.success(res, {
      contexts,
      total: contexts.length,
      filters: {
        ...filters,
        limit,
        offset
      }
    }, 'Contexts retrieved successfully');
  }),

  // Get a specific context by ID
  getContext: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { contextId } = req.params;

    const contextDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    if (!contextDoc.exists) {
      throw new AppError('Context not found', 404);
    }

    const contextData = contextDoc.data() as Omit<AIContext, 'id'>;
    
    // Check if user owns this context
    if (contextData.userId !== req.user.uid) {
      throw new AppError('Access denied', 403);
    }

    const context: AIContext = {
      id: contextDoc.id,
      ...contextData
    };

    return ResponseUtil.success(res, context, 'Context retrieved successfully');
  }),

  // Create a new context
  createContext: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const contextData: CreateContextRequest = req.body;
    const now = new Date().toISOString();

    const newContext: Omit<AIContext, 'id'> = {
      title: contextData.title,
      description: contextData.description || '',
      category: contextData.category,
      color: contextData.color,
      userId: req.user.uid,
      createdAt: now,
      updatedAt: now,
      lastUsed: now,
      isActive: false,
      settings: contextData.settings || {}
    };

    const docRef = await firebaseAdmin.firestore
      .collection('contexts')
      .add(newContext);

    const createdContext: AIContext = {
      id: docRef.id,
      ...newContext
    };

    return ResponseUtil.created(res, createdContext, 'Context created successfully');
  }),

  // Update an existing context
  updateContext: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { contextId } = req.params;
    const updateData: UpdateContextRequest = req.body;

    // Get existing context
    const contextDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    if (!contextDoc.exists) {
      throw new AppError('Context not found', 404);
    }

    const existingContext = contextDoc.data() as Omit<AIContext, 'id'>;
    
    // Check if user owns this context
    if (existingContext.userId !== req.user.uid) {
      throw new AppError('Access denied', 403);
    }

    // Prepare update data
    const updatedFields: Partial<AIContext> = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Remove undefined fields
    Object.keys(updatedFields).forEach(key => {
      if (updatedFields[key as keyof AIContext] === undefined) {
        delete updatedFields[key as keyof AIContext];
      }
    });

    // Update the context
    await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .update(updatedFields);

    // Get updated context
    const updatedDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    const updatedContext: AIContext = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    } as AIContext;

    return ResponseUtil.success(res, updatedContext, 'Context updated successfully');
  }),

  // Delete a context
  deleteContext: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { contextId } = req.params;

    // Get existing context
    const contextDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    if (!contextDoc.exists) {
      throw new AppError('Context not found', 404);
    }

    const contextData = contextDoc.data() as Omit<AIContext, 'id'>;
    
    // Check if user owns this context
    if (contextData.userId !== req.user.uid) {
      throw new AppError('Access denied', 403);
    }

    // Delete the context
    await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .delete();

    return ResponseUtil.success(res, { id: contextId }, 'Context deleted successfully');
  }),

  // Use/activate a context (updates lastUsed and sets as active)
  useContext: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { contextId } = req.params;

    // Get existing context
    const contextDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    if (!contextDoc.exists) {
      throw new AppError('Context not found', 404);
    }

    const contextData = contextDoc.data() as Omit<AIContext, 'id'>;
    
    // Check if user owns this context
    if (contextData.userId !== req.user.uid) {
      throw new AppError('Access denied', 403);
    }

    const batch = firebaseAdmin.firestore.batch();

    // Deactivate all other contexts for this user
    const userContextsSnapshot = await firebaseAdmin.firestore
      .collection('contexts')
      .where('userId', '==', req.user.uid)
      .where('isActive', '==', true)
      .get();

    userContextsSnapshot.docs.forEach(doc => {
      batch.update(doc.ref, { isActive: false });
    });

    // Activate and update the selected context
    batch.update(contextDoc.ref, {
      isActive: true,
      lastUsed: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    await batch.commit();

    // Get updated context
    const updatedDoc = await firebaseAdmin.firestore
      .collection('contexts')
      .doc(contextId)
      .get();

    const updatedContext: AIContext = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    } as AIContext;

    return ResponseUtil.success(res, updatedContext, 'Context activated successfully');
  }),

  // Get user's custom categories
  getCategories: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const snapshot = await firebaseAdmin.firestore
      .collection('categories')
      .where('userId', '==', req.user.uid)
      .orderBy('name', 'asc')
      .get();

    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ContextCategory[];

    // Add default categories if they don't exist
    const defaultCategories = ['Business', 'Education', 'Personal', 'Creative'];
    const existingNames = categories.map(c => c.name);
    
    const missingDefaults = defaultCategories
      .filter(name => !existingNames.includes(name))
      .map(name => ({
        id: `default-${name.toLowerCase()}`,
        name,
        userId: req.user!.uid,
        createdAt: new Date().toISOString(),
        isDefault: true
      }));

    const allCategories = [...missingDefaults, ...categories];

    return ResponseUtil.success(res, allCategories, 'Categories retrieved successfully');
  }),

  // Create a new category
  createCategory: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { name }: CreateCategoryRequest = req.body;

    // Check if category already exists for this user
    const existingSnapshot = await firebaseAdmin.firestore
      .collection('categories')
      .where('userId', '==', req.user.uid)
      .where('name', '==', name)
      .get();

    if (!existingSnapshot.empty) {
      throw new AppError('Category with this name already exists', 409);
    }

    const newCategory: Omit<ContextCategory, 'id'> = {
      name,
      userId: req.user.uid,
      createdAt: new Date().toISOString(),
      isDefault: false
    };

    const docRef = await firebaseAdmin.firestore
      .collection('categories')
      .add(newCategory);

    const createdCategory: ContextCategory = {
      id: docRef.id,
      ...newCategory
    };

    return ResponseUtil.created(res, createdCategory, 'Category created successfully');
  }),

  // Delete a custom category
  deleteCategory: catchAsync(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    const { categoryId } = req.params;

    // Get existing category
    const categoryDoc = await firebaseAdmin.firestore
      .collection('categories')
      .doc(categoryId)
      .get();

    if (!categoryDoc.exists) {
      throw new AppError('Category not found', 404);
    }

    const categoryData = categoryDoc.data() as ContextCategory;
    
    // Check if user owns this category
    if (categoryData.userId !== req.user.uid) {
      throw new AppError('Access denied', 403);
    }

    // Check if it's a default category
    if (categoryData.isDefault) {
      throw new AppError('Cannot delete default categories', 400);
    }

    // Check if any contexts use this category
    const contextsUsingCategory = await firebaseAdmin.firestore
      .collection('contexts')
      .where('userId', '==', req.user.uid)
      .where('category', '==', categoryData.name)
      .get();

    if (!contextsUsingCategory.empty) {
      throw new AppError('Cannot delete category that is in use by contexts', 400);
    }

    // Delete the category
    await firebaseAdmin.firestore
      .collection('categories')
      .doc(categoryId)
      .delete();

    return ResponseUtil.success(res, { id: categoryId }, 'Category deleted successfully');
  })
};