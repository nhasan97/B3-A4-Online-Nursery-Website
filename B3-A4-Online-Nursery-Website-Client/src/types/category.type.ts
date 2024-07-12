export type TCategory = {
  _id?: string;
  category: string;
  description: string;
  image: string;
};

export type TCategoryProp = {
  _id: string;
  category: string;
  description: string;
  image: string;
  handleDeleteCategory?: unknown;
};

export type TEditCategory = {
  _id: string;
  categoryDetails: TCategory;
};
