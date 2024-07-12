import httpStatus from 'http-status';
import { categoryModel } from './category.model';
import AppError from '../../Errors/AppError';
import { TCategory } from './category.interface';
/*

----------------service function for fetching all categories data from DB----------------*/
const getAllCategoriesFromDB = async () => {
  const response = await categoryModel.find();
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
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
