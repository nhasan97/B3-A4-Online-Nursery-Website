import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { productModel } from './product.model';
import AppError from '../../Errors/AppError';
/*

----------------service function for fetching all products data from DB----------------*/
const getAllProductsFromDB = async () => {
  const response = await productModel.find();
  return response;
};
/*

----------------service function for inserting product data in DB----------------*/
const createProductIntoDB = async (productData: TProduct) => {
  const response = await productModel.create(productData);
  return response;
};
/*

----------------service function for updating product data in DB----------------*/
const updateProductIntoDB = async (
  id: string,
  updatedProductData: Partial<TProduct>,
) => {
  //checking if the selected product exists or not. If not throwing an error.
  const loadedProduct = await productModel.doesProductExist(id);
  if (!loadedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  //updating product data in DB
  const response = await productModel.findByIdAndUpdate(
    id,
    updatedProductData,
    { new: true },
  );

  //returning response
  return response;
};
/*

----------------service function for deleting specific product data from DB----------------*/
const deleteProductFromDB = async (id: string) => {
  //checking if the selected product exists or not. If not throwing an error.
  const loadedProduct = await productModel.doesProductExist(id);
  if (!loadedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  //deleting product from db
  const productDeleted = await productModel.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  if (!productDeleted) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete product',
    );
  }

  return productDeleted;
};

//exporting all the service functions through productServices object
export const productServices = {
  getAllProductsFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
