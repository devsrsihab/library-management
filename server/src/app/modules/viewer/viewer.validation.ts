import { z } from 'zod';

// create validation
const createViewerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string(),
    image: z.string().url(),
  }),
});

// update validation
const updateViewerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    gender: z.string(),
    image: z.string().url(),
  }),
});

export const ViewerValidations = {
  createViewerValidationSchema,
  updateViewerValidationSchema,
};
