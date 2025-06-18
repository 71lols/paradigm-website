// src/utils/validation.ts
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

// Validation schemas
export const authSchemas = {
  signUp: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'any.required': 'Password is required'
      }),
    displayName: Joi.string()
      .min(2)
      .max(50)
      .optional()
      .messages({
        'string.min': 'Display name must be at least 2 characters long',
        'string.max': 'Display name cannot exceed 50 characters'
      })
  }),

  signIn: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  resetPassword: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      })
  }),

  updateProfile: Joi.object({
    displayName: Joi.string()
      .min(2)
      .max(50)
      .optional(),
    phoneNumber: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Phone number must be in international format (e.g., +1234567890)'
      })
  })
};

// Validation middleware
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      
      throw new AppError(errorMessage, 400);
    }

    req.body = value;
    next();
  };
};

// Query validation
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      
      throw new AppError(errorMessage, 400);
    }

    req.query = value;
    next();
  };
};

// Params validation
export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      
      throw new AppError(errorMessage, 400);
    }

    req.params = value;
    next();
  };
};

export const contextSchemas = {
  createContext: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .required()
      .messages({
        'string.min': 'Context title cannot be empty',
        'string.max': 'Context title cannot exceed 100 characters',
        'any.required': 'Context title is required'
      }),
    description: Joi.string()
      .max(500)
      .allow('')
      .optional()
      .messages({
        'string.max': 'Description cannot exceed 500 characters'
      }),
    category: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        'string.min': 'Category cannot be empty',
        'string.max': 'Category cannot exceed 50 characters',
        'any.required': 'Category is required'
      }),
    color: Joi.string()
      .valid('blue', 'purple', 'green', 'pink', 'orange', 'red')
      .required()
      .messages({
        'any.only': 'Color must be one of: blue, purple, green, pink, orange, red',
        'any.required': 'Color is required'
      }),
    settings: Joi.object({
      temperature: Joi.number()
        .min(0)
        .max(2)
        .optional(),
      maxTokens: Joi.number()
        .min(1)
        .max(4000)
        .optional(),
      systemPrompt: Joi.string()
        .max(2000)
        .optional()
    }).optional()
  }),

  updateContext: Joi.object({
    title: Joi.string()
      .min(1)
      .max(100)
      .optional()
      .messages({
        'string.min': 'Context title cannot be empty',
        'string.max': 'Context title cannot exceed 100 characters'
      }),
    description: Joi.string()
      .max(500)
      .allow('')
      .optional()
      .messages({
        'string.max': 'Description cannot exceed 500 characters'
      }),
    category: Joi.string()
      .min(1)
      .max(50)
      .optional()
      .messages({
        'string.min': 'Category cannot be empty',
        'string.max': 'Category cannot exceed 50 characters'
      }),
    color: Joi.string()
      .valid('blue', 'purple', 'green', 'pink', 'orange', 'red')
      .optional()
      .messages({
        'any.only': 'Color must be one of: blue, purple, green, pink, orange, red'
      }),
    settings: Joi.object({
      temperature: Joi.number()
        .min(0)
        .max(2)
        .optional(),
      maxTokens: Joi.number()
        .min(1)
        .max(4000)
        .optional(),
      systemPrompt: Joi.string()
        .max(2000)
        .optional()
    }).optional()
  }),

  createCategory: Joi.object({
    name: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        'string.min': 'Category name cannot be empty',
        'string.max': 'Category name cannot exceed 50 characters',
        'any.required': 'Category name is required'
      })
  }),

  contextFilters: Joi.object({
    category: Joi.string().optional(),
    search: Joi.string().max(100).optional(),
    isActive: Joi.boolean().optional(),
    sortBy: Joi.string()
      .valid('title', 'lastUsed', 'createdAt', 'updatedAt')
      .default('updatedAt')
      .optional(),
    sortOrder: Joi.string()
      .valid('asc', 'desc')
      .default('desc')
      .optional(),
    limit: Joi.number()
      .min(1)
      .max(100)
      .default(20)
      .optional(),
    offset: Joi.number()
      .min(0)
      .default(0)
      .optional()
  })
};

// Params validation schemas
export const contextParamSchemas = {
  contextId: Joi.object({
    contextId: Joi.string()
      .required()
      .messages({
        'any.required': 'Context ID is required'
      })
  }),
  categoryId: Joi.object({
    categoryId: Joi.string()
      .required()
      .messages({
        'any.required': 'Category ID is required'
      })
  })
};