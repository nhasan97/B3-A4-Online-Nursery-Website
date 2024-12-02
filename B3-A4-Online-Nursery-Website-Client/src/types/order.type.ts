export type TCartItem = {
  _id?: string;
  title: string;
  price: number;
  stock: number;
  qty: number;
  image: string;
};

export interface IOrder {
  _id?: string;
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
}
