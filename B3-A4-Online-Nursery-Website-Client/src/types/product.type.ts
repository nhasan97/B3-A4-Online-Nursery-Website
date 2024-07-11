export type TProduct = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
};

export type TProductProp = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  editProduct: any;
  deleteProduct?: any;
};
