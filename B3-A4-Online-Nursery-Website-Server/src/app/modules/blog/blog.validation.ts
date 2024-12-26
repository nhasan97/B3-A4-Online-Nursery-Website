import { z } from 'zod';

//---------------------Validation schema for creating product---------------------
const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be string',
      })
      .trim(),

    thumbnail: z
      .string({
        required_error: 'Thumbnail is required',
        invalid_type_error: 'Description must be string',
      })
      .trim(),

    author: z
      .string({
        required_error: 'Author is required',
        invalid_type_error: 'Author must be string',
      })
      .trim(),

    authorImage: z
      .string({
        required_error: 'Authors image is required',
        invalid_type_error: 'Authors image must be string',
      })
      .trim(),

    authorEmail: z
      .string({
        required_error: 'Authors email is required',
        invalid_type_error: 'Authors email must be string',
      })
      .trim(),

    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be string',
      })
      .trim(),

    tags: z.object({ tag: z.string() }).optional().array(),

    readingTime: z
      .string({
        required_error: 'Reading Time is required',
        invalid_type_error: 'Reading Time must be string',
      })
      .trim(),
  }),
});

//---------------------Validation schema for updating product---------------------
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be string',
      })
      .trim()
      .optional(),

    thumbnail: z
      .string({
        invalid_type_error: 'Description must be string',
      })
      .trim()
      .optional(),

    author: z
      .string({
        invalid_type_error: 'Author must be string',
      })
      .trim()
      .optional(),

    authorImage: z
      .string({
        invalid_type_error: 'Authors image must be string',
      })
      .trim()
      .optional(),

    authorEmail: z
      .string({
        invalid_type_error: 'Authors email must be string',
      })
      .trim()
      .optional(),

    content: z
      .string({
        invalid_type_error: 'Content must be string',
      })
      .trim()
      .optional(),

    tags: z.object({ tag: z.string() }).optional().array(),

    readingTime: z
      .string({
        invalid_type_error: 'Reading Time must be string',
      })
      .trim()
      .optional(),
  }),
});

//exporting validation schemas through BlogValidations object
export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
