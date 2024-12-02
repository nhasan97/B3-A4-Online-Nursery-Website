import { z } from 'zod';

//---------------------Validation schema for user signup---------------------
const userSignupValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be string',
      })
      .trim(),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' })
      .trim(),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .trim(),

    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone number must be string',
      })
      .min(11, { message: 'Phone number must be 11 characters long' })
      .max(11, { message: 'Phone number must be 11 characters long' })
      .trim(),

    role: z.enum(['admin', 'user']),

    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Address must be string',
      })
      .trim(),

    imageUrl: z
      .string({
        invalid_type_error: 'Url must be string',
      })
      .trim()
      .optional(),
  }),
});

//---------------------Validation schema for user login---------------------
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' })
      .trim(),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .trim(),
  }),
});

//---------------------Validation schema for refresh token---------------------
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const authValidations = {
  userSignupValidationSchema,
  userLoginValidationSchema,
  refreshTokenValidationSchema,
};
