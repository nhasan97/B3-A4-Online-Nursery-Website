import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { Tblog } from './blog.interface';
import { blogModel } from './blog.model';

/*

----------------service function for fetching all blogs data from DB----------------*/
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const searchableFields = ['title', 'author', 'readingTime'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = blogModel.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);
  const filterQuery = searchQuery.find({
    isDeleted: { $ne: true },
    ...queryObject,
  });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 10;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};
/*

----------------service function for fetching blogs count from DB----------------*/
const getTopBlogsFromDB = async () => {
  const response = await blogModel
    .find({
      isDeleted: { $ne: true },
    })
    .sort('-likes')
    .limit(3);
  return response;
};
/*

----------------service function for fetching top blogs from DB----------------*/
const getBlogCountFromDB = async () => {
  const response = await blogModel.countDocuments({
    isDeleted: { $ne: true },
  });
  return response;
};
/*

----------------service function for fetching single blog from DB----------------*/
const getSingleBlogFromDB = async (id: string) => {
  const response = await blogModel.findById(id);
  return response;
};

/*

----------------service function for inserting blog data in DB----------------*/
const createBlogIntoDB = async (blogData: Tblog) => {
  const response = await blogModel.create(blogData);
  return response;
};

/*

----------------service function for updating blog data in DB----------------*/
const updateBlogIntoDB = async (
  id: string,
  updatedBlogData: Partial<Tblog>,
) => {
  //checking if the selected blog exists or not. If not throwing an error.
  const loadedBlog = await blogModel.doesBlogExist(id);
  if (!loadedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  //updating blog data in DB
  const response = await blogModel.findByIdAndUpdate(id, updatedBlogData, {
    new: true,
  });

  //returning response
  return response;
};
/*

----------------service function for deleting specific product data from DB----------------*/
const deleteBlogFromDB = async (id: string) => {
  //checking if the selected product exists or not. If not throwing an error.
  const loadedProduct = await blogModel.doesBlogExist(id);
  if (!loadedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  //deleting product from db
  const blogDeleted = await blogModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  if (!blogDeleted) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete product',
    );
  }

  return blogDeleted;
};

//exporting all the service functions through blogServices object
export const blogServices = {
  getAllBlogsFromDB,
  getBlogCountFromDB,
  getTopBlogsFromDB,
  getSingleBlogFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
