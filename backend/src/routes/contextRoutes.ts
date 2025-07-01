// src/routes/contextRoutes.ts
import { Router } from 'express';
import { contextController } from '../controllers/contextController';
import { verifyToken } from '../middleware/auth';
import { validate, validateQuery, validateParams } from '../utils/validation';
import { contextSchemas, contextParamSchemas } from '../utils/validation';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for context operations
const contextLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 context operations per window
  message: {
    success: false,
    message: 'Too many context operations, please try again later',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting and authentication to all routes
router.use(contextLimiter);
router.use(verifyToken);

// Context CRUD routes
router.get(
  '/',
  validateQuery(contextSchemas.contextFilters),
  contextController.getContexts
);

router.get(
  '/:contextId',
  validateParams(contextParamSchemas.contextId),
  contextController.getContext
);

router.post(
  '/',
  validate(contextSchemas.createContext),
  contextController.createContext
);

router.patch(
  '/:contextId',
  validateParams(contextParamSchemas.contextId),
  validate(contextSchemas.updateContext),
  contextController.updateContext
);

router.delete(
  '/:contextId',
  validateParams(contextParamSchemas.contextId),
  contextController.deleteContext
);

// Context actions
router.post(
  '/:contextId/use',
  validateParams(contextParamSchemas.contextId),
  contextController.useContext
);

router.post(
  '/:contextId/deactivate',
  validateParams(contextParamSchemas.contextId),
  contextController.deactivateContext
);

// Category routes
router.get(
  '/categories/list',
  contextController.getCategories
);

router.post(
  '/categories',
  validate(contextSchemas.createCategory),
  contextController.createCategory
);

router.delete(
  '/categories/:categoryId',
  validateParams(contextParamSchemas.categoryId),
  contextController.deleteCategory
);

export default router;