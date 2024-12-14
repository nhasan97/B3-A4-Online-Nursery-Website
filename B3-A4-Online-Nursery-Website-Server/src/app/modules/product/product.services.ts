import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { productModel } from './product.model';
import AppError from '../../Errors/AppError';
/*

----------------service function for fetching all products data from DB----------------*/
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const searchableFields = ['title', 'category'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = productModel.find({
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

  let sort = 'title';
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

const getSingleProductFromDB = async (id: string) => {
  const response = await productModel.findById(id);
  return response;
};

const getProductCountFromDB = async () => {
  const response = await productModel.countDocuments({
    isDeleted: { $ne: true },
  });
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
  getSingleProductFromDB,
  getProductCountFromDB,
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
