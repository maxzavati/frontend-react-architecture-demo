import { z } from 'zod';

const emailPasswordSchemas = {
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password is required'),
};

export const registerFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  ...emailPasswordSchemas,
});

export const loginFormSchema = z.object({
  ...emailPasswordSchemas,
});
