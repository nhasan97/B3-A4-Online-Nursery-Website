import { z } from 'zod';

//---------------------Validation schema for creating product---------------------
const createProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be string',
      })
      .trim(),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be string',
      })
      .trim(),

    category: z
      .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be string',
      })
      .trim(),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .nonnegative({ message: 'Price cannot be a negative number' })
      .finite({ message: 'Price must be finite' }),

    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .nonnegative({ message: 'Rating cannot be a negative number' })
      .finite({ message: 'Rating must be finite' }),

    stock: z
      .number({
        required_error: 'Stock is required',
        invalid_type_error: 'Stock must be a number',
      })
      .nonnegative({ message: 'Stock cannot be a negative number' })
      .finite({ message: 'Stock must be finite' }),

    image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image must be string',
      })
      .trim(),
  }),
});

//---------------------Validation schema for updating product---------------------
const updateProductValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be string',
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

    category: z
      .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be string',
      })
      .trim()
      .optional(),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .nonnegative({ message: 'Price cannot be a negative number' })
      .finite({ message: 'Price must be finite' })
      .optional(),

    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .nonnegative({ message: 'Rating cannot be a negative number' })
      .finite({ message: 'Rating must be finite' })
      .optional(),

    stock: z
      .number({
        required_error: 'Stock is required',
        invalid_type_error: 'Stock must be a number',
      })
      .nonnegative({ message: 'Stock cannot be a negative number' })
      .finite({ message: 'Stock must be finite' })
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

//exporting validation schemas through ProductValidations object
export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
