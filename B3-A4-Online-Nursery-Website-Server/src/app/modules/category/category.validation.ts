import { z } from 'zod';

//---------------------Validation schema for creating category---------------------
const createCategoryValidationSchema = z.object({
  body: z.object({
    category: z
      .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be string',
      })
      .trim(),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be string',
      })
      .trim(),

    image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image must be string',
      })
      .trim(),
  }),
});

//---------------------Validation schema for updating category---------------------
const updateCategoryValidationSchema = z.object({
  body: z.object({
    category: z
      .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be string',
      })
      .trim()
      .optional(),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be string',
      })
      .trim()
      .optional(),

    image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image must be string',
      })
      .trim()
      .optional(),
  }),
});

//exporting validation schemas through CategoryValidations object
export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
