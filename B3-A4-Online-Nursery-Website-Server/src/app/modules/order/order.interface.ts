import { Model } from 'mongoose';

//declaring type for orderItems
export type TCartItem = {
  _id?: string;
  title: string;
  price: number;
  stock: number;
  qty: number;
  image: string;
};

//declaring type for order
export interface TOrder {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  items: TCartItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  paid: number;
  transactionID: string;
  estimatedDelivery: number;
  status: string;
  isDeleted?: boolean;
}

//declaring type definition for doesCategoryExist static function
export interface OrderModel extends Model<TOrder> {
  doesOrderExist(id: string): Promise<TOrder>;
}
