import { z } from 'zod';

// create
const createBookValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    category: z.string().min(1).max(50),
    quantity: z.number().positive().int(),
    shortDescription: z.string().min(10).max(500),
    image: z.string().url(),
  }),
});

// update
const updateBookValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(50).optional(),
    quantity: z.number().positive().int().optional(),
    shortDescription: z.string().min(10).max(500).optional(),
    image: z.string().url().optional(),
  }),
});

export const BookValidation = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
