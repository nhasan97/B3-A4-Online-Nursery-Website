import { TProduct } from "./product.type";

export type TCartItem = {
  _id?: string;
  title: string;
  price: number;
  stock: number;
  qty: number;
  image: string;
};

export type TCartItemProp = { item: TCartItem };

export type TState = {
  cartItems: TCartItem[];
};

export type TCartContext = {
  itemsInCart: TCartItem[];
  itemsInCartCount: number;
  total: number;
  desiredQty: number;
  handleEditQtyInProductDetails: (passedQty: number, product: TProduct) => void;
  handleAddToCart: (desiredQty: number, product: TProduct) => void;
  handleEditQty: (editedQty: number, item: TCartItem) => void;
  handleDeleteCartItem: (_id: string) => void;
};
