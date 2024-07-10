import { Model } from 'mongoose';

//declaring type for product
export interface TProduct {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  isDeleted?: boolean;
}

//declaring type definition for doesProductExist static function
export interface ProductModel extends Model<TProduct> {
  doesProductExist(id: string): Promise<TProduct>;
}
