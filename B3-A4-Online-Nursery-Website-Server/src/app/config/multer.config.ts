/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinaryUpload } from './cloudinary.config';
import {
  ACCEPTED_FILE_TYPES,
  MAX_UPLOAD_SIZE,
} from '../modules/images/image.constant';

const removeExtension = (filename: string) => {
  return filename.split('.').slice(0, -1).join('.');
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: (req: any) => {
      return `Blooms and Beyond/${req.body.folderName}`;
    },
    public_id: (_req: any, file: any) =>
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      file.fieldname +
      '-' +
      removeExtension(file.originalname),
    format: 'webp',
    transformation: [{ quality: 'auto' }],
  } as any,
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // Ensure the file size is within 150 KB
  if (file.size > 150 * 1024) {
    return cb(new Error('File size should not exceed 150 KB'));
  }

  // Validate file type (if needed)

  if (
    !ACCEPTED_FILE_TYPES.includes(
      file.mimetype as (typeof ACCEPTED_FILE_TYPES)[number],
    )
  ) {
    return cb(
      new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'),
    );
  }

  cb(null, true); // Accept the file
};

export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_UPLOAD_SIZE,
    files: 5, // Maximum of 5 files
  },
  fileFilter: fileFilter,
});
