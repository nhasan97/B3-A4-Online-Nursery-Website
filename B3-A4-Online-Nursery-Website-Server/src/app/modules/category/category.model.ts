import { Schema, model } from 'mongoose';
import { CategoryModel, TCategory } from './category.interface';

import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';

//creating mongoose schema as the first layer of validation for category data
const categorySchema = new Schema<TCategory, CategoryModel>({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//using document middleware for checking if the document already exists or not
categorySchema.pre('save', async function (next) {
  const doesExist = await categoryModel.findOne({
    category: this.category,
    description: this.description,
    image: this.image,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Category already exists',
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
categorySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
categorySchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if the category exists or not using static method
categorySchema.statics.doesCategoryExist = async function (id: string) {
  return await categoryModel.findById(id);
};

//creating and exporting model for category
export const categoryModel = model<TCategory, CategoryModel>(
  'Category',
  categorySchema,
);
