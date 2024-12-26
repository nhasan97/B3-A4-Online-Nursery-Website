import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { BlogModel, Tblog } from './blog.interface';

//creating mongoose schema as the first layer of validation for blog data
const blogSchema = new Schema<Tblog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    authorImage: {
      type: String,
      required: true,
      trim: true,
    },
    authorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [
        {
          tag: { type: String },
        },
      ],
      default: [],
    },
    readingTime: {
      type: String,
      required: true,
      trim: true,
    },
    like: {
      type: Number,
      required: true,
      default: 0,
    },
    dislike: {
      type: Number,
      required: true,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

//using document middleware for checking if the document already exists or not
blogSchema.pre('save', async function (next) {
  const doesExist = await blogModel.findOne({
    title: this.title,
    thumbnail: this.thumbnail,
    author: this.author,
    authorImage: this.authorImage,
    authorEmail: this.authorEmail,
    content: this.content,
    tags: this.tags,
    readingTime: this.readingTime,
  });
  if (doesExist) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Blog already exists');
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
blogSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
blogSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if the blog exists or not using static method
blogSchema.statics.doesBlogExist = async function (id: string) {
  return await blogModel.findById(id);
};

//creating and exporting model for blog
export const blogModel = model<Tblog, BlogModel>('Blog', blogSchema);
