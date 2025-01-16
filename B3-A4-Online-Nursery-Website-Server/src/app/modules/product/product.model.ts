import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';

//creating mongoose schema as the first layer of validation for product data
const productSchema = new Schema<TProduct, ProductModel>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    trim: true,
  },
  botanicalName: {
    type: String,
    required: true,
    trim: true,
  },
  plantType: {
    type: String,
    required: true,
    trim: true,
  },
  growthRate: {
    type: String,
    required: true,
    trim: true,
  },
  height: {
    type: String,
    required: true,
    trim: true,
  },
  spread: {
    type: String,
    required: true,
    trim: true,
  },
  sunlightRequirements: {
    type: String,
    required: true,
    trim: true,
  },
  wateringNeeds: {
    type: String,
    required: true,
    trim: true,
  },
  soilType: {
    type: String,
    required: true,
    trim: true,
  },
  careInstructions: {
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
productSchema.pre('save', async function (next) {
  const doesExist = await productModel.findOne({
    title: this.title,
    description: this.description,
    category: this.category,
    price: this.price,
    rating: this.rating,
    stock: this.stock,
    images: this.images,
    botanicalName: this.botanicalName,
    plantType: this.plantType,
    growthRate: this.growthRate,
    height: this.height,
    spread: this.spread,
    sunlightRequirements: this.sunlightRequirements,
    wateringNeeds: this.wateringNeeds,
    soilType: this.soilType,
    careInstructions: this.careInstructions,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Product already exists',
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
productSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
productSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if the product exists or not using static method
productSchema.statics.doesProductExist = async function (id: string) {
  return await productModel.findById(id);
};

//creating and exporting model for product
export const productModel = model<TProduct, ProductModel>(
  'Product',
  productSchema,
);
