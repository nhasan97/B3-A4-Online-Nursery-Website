import { z } from 'zod';
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './image.constant';

const ImageFileZodSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.enum(ACCEPTED_FILE_TYPES),
  path: z.string(),
  size: z
    .number()
    .refine(
      (size) => size <= MAX_UPLOAD_SIZE,
      'File size must be less than 3MB',
    ),
  filename: z.string(),
});

export const ImageFilesArrayZodSchema = z.object({
  files: z.record(z.string(), z.array(ImageFileZodSchema)).refine((files) => {
    return Object.keys(files).length > 0;
  }, 'Image is required'),
});
