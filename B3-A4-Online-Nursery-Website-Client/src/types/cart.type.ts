export type TCartItem = {
  _id?: string;
  title: string;
  price: number;
  stock: number;
  qty: number;
  image: string;
};

export type TState = {
  cartItems: TCartItem[];
};
