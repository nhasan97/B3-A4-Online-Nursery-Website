import { TProduct } from './product.interface';
import { productModel } from './product.model';
/*

----------------service function for inserting product data in DB----------------*/
const createProductIntoDB = async (productData: TProduct) => {
  const response = await productModel.create(productData);
  return response;
};

//exporting all the service functions through productServices object
export const productServices = {
  createProductIntoDB,
};
