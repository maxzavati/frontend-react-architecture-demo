import { z } from 'zod';
import { loginFormSchema, registerFormSchema } from './schemas';

export type LoginForm = z.infer<typeof loginFormSchema>;
export type RegisterForm = z.infer<typeof registerFormSchema>;
