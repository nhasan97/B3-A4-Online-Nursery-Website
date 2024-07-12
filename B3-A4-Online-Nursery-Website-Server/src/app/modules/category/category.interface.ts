import { Model } from 'mongoose';

//declaring type for category
export interface TCategory {
  category: string;
  description: string;
  image: string;
  isDeleted?: boolean;
}

//declaring type definition for doesCategoryExist static function
export interface CategoryModel extends Model<TCategory> {
  doesCategoryExist(id: string): Promise<TCategory>;
}
