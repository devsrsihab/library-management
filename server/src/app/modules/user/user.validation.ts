import { z } from 'zod';
import {  USER_STATUS } from './user.constant';

// user Schema validation
const UserSchemaValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    gender: z.string(),
    image: z.string().url(),
    role: z.enum(['viewer', 'admin', 'author']),
  }),
});

// user edit
const UserEditSchemaValidation = z.object({
  body: z.object({
    name: z.string().optional().optional(),
    email: z.string().email().optional().optional(),
    password: z.string().optional().optional(),
    gender: z.string().optional(),
    image: z.string().url().optional(),
  }),
});

// change status validation
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]]),
  }),
});

export const UserValidations = {
  UserSchemaValidation,
  changeStatusValidationSchema,
  UserEditSchemaValidation,
};
