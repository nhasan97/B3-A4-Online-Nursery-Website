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

    botanicalName: z
      .string({
        required_error: 'botanical Name is required',
        invalid_type_error: 'botanical Name must be string',
      })
      .trim(),

    plantType: z
      .string({
        required_error: 'plant Type is required',
        invalid_type_error: 'plant Type must be string',
      })
      .trim(),

    growthRate: z
      .string({
        required_error: 'growth Rate is required',
        invalid_type_error: 'growth Rate must be string',
      })
      .trim(),

    height: z
      .string({
        required_error: 'height is required',
        invalid_type_error: 'height must be string',
      })
      .trim(),

    spread: z
      .string({
        required_error: 'spread is required',
        invalid_type_error: 'spread must be string',
      })
      .trim(),

    sunlightRequirements: z
      .string({
        required_error: 'sunlight Requirements is required',
        invalid_type_error: 'sunlight Requirements must be string',
      })
      .trim(),

    wateringNeeds: z
      .string({
        required_error: 'watering Needs is required',
        invalid_type_error: 'watering Needs must be string',
      })
      .trim(),

    soilType: z
      .string({
        required_error: 'soil Type is required',
        invalid_type_error: 'soil Type must be string',
      })
      .trim(),

    careInstructions: z
      .string({
        required_error: 'care Instructions is required',
        invalid_type_error: 'care Instructions must be string',
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

    botanicalName: z
      .string({
        required_error: 'botanical Name is required',
        invalid_type_error: 'botanical Name must be string',
      })
      .trim()
      .optional(),

    plantType: z
      .string({
        required_error: 'plant Type is required',
        invalid_type_error: 'plant Type must be string',
      })
      .trim()
      .optional(),

    growthRate: z
      .string({
        required_error: 'growth Rate is required',
        invalid_type_error: 'growth Rate must be string',
      })
      .trim()
      .optional(),

    height: z
      .string({
        required_error: 'height is required',
        invalid_type_error: 'height must be string',
      })
      .trim()
      .optional(),

    spread: z
      .string({
        required_error: 'spread is required',
        invalid_type_error: 'spread must be string',
      })
      .trim()
      .optional(),

    sunlightRequirements: z
      .string({
        required_error: 'sunlight Requirements is required',
        invalid_type_error: 'sunlight Requirements must be string',
      })
      .trim()
      .optional(),

    wateringNeeds: z
      .string({
        required_error: 'watering Needs is required',
        invalid_type_error: 'watering Needs must be string',
      })
      .trim()
      .optional(),

    soilType: z
      .string({
        required_error: 'soil Type is required',
        invalid_type_error: 'soil Type must be string',
      })
      .trim()
      .optional(),

    careInstructions: z
      .string({
        required_error: 'care Instructions is required',
        invalid_type_error: 'care Instructions must be string',
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
