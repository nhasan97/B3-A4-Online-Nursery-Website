import { Model } from 'mongoose';

//declaring type for product
export interface TProduct {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images?: string[];
  botanicalName: string;
  plantType: string;
  growthRate: string;
  height: string;
  spread: string;
  sunlightRequirements: string;
  wateringNeeds: string;
  soilType: string;
  careInstructions: string;
  isDeleted?: boolean;
}

//declaring type definition for doesProductExist static function
export interface ProductModel extends Model<TProduct> {
  doesProductExist(id: string): Promise<TProduct>;
}
