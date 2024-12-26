import httpStatus from 'http-status';
import { categoryModel } from './category.model';
import AppError from '../../Errors/AppError';
import { TCategory } from './category.interface';
/*

----------------service function for fetching all categories data from DB----------------*/
const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const searchableFields = ['category'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = categoryModel.find({
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

  let sort = 'category';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
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

----------------service function for fetching categories count from DB----------------*/
const getCategoryCountFromDB = async () => {
  const response = await categoryModel.countDocuments({
    isDeleted: { $ne: true },
  });
  return response;
};
/*

----------------service function for inserting category data in DB----------------*/
const createCategoryIntoDB = async (categoryData: TCategory) => {
  const response = await categoryModel.create(categoryData);
  return response;
};
/*

----------------service function for updating category data in DB----------------*/
const updateCategoryIntoDB = async (
  id: string,
  updatedCategoryData: Partial<TCategory>,
) => {
  //checking if the selected category exists or not. If not throwing an error.
  const loadedCategory = await categoryModel.doesCategoryExist(id);
  if (!loadedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  //updating category data in DB
  const response = await categoryModel.findByIdAndUpdate(
    id,
    updatedCategoryData,
    { new: true },
  );

  //returning response
  return response;
};
/*

----------------service function for deleting specific category data from DB----------------*/
const deleteCategoryFromDB = async (id: string) => {
  //checking if the selected category exists or not. If not throwing an error.
  const loadedCategory = await categoryModel.doesCategoryExist(id);
  if (!loadedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  //deleting category from db
  const categoryDeleted = await categoryModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  if (!categoryDeleted) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete category',
    );
  }

  return categoryDeleted;
};

//exporting all the service functions through categoryServices object
export const categoryServices = {
  getAllCategoriesFromDB,
  getCategoryCountFromDB,
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
