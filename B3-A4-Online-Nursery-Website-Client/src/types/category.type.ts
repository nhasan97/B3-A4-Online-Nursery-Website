// import categoryApi from "@/redux/api/CategoryApi";
import { FormEvent } from "react";

export type TCategory = {
  _id?: string;
  category: string;
  description: string;
  image: string;
};

export type TCategoryProp = { category: TCategory };

// Extract the type of the mutation hook
// type UseDeleteCategoryMutationType =
// typeof categoryApi.useDeleteCategoryMutation;

// Extract the type of the mutation function
// type DeleteCategoryType = ReturnType<UseDeleteCategoryMutationType>[0];

export type TCategoryContext = {
  loadingCategories: boolean;
  categories: TCategory[];
  // deleteCategory: DeleteCategoryType;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleAddCategory: (e: FormEvent) => Promise<void>;
  handleEditCategory: (e: FormEvent, category: TCategory) => Promise<void>;
  handleDeleteCategory: (_id: string) => void;
};
