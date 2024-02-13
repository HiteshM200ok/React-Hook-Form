import z from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, {message: 'Email is required'})
      .email('Invalid email format'),
    password: z
      .string()
      .min(1, {message: 'Password is required'})
      .min(8, {message: 'Password length should be greater than 8 characters'})
      .max(40, {message: 'Password length should be less than 40 characters'})
      .regex(/^(?=.*?[A-Z]).{8,40}$/, {
        message: 'Password should contain at least one uppercase letter',
      })
      .regex(/^(?=.*?[a-z]).{8,40}$/, {
        message: 'Password should contain at least one lowercase letter',
      })
      .regex(/^(?=.*?[0-9]).{8,40}$/, {
        message: 'Password should contain at least one digit',
      })
      .regex(/^(?=.*?[#?!@$%^&*-]).{8,40}$/, {
        message: 'Password should contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(1, {message: 'Confirm password is required'}),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Confirm password must be the same as password',
    path: ['confirmPassword'], // path of error
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
