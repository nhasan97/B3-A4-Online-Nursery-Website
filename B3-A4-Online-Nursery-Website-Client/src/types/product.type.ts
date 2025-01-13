/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";

export type TProduct = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  botanicalName: string;
  plantType: string;
  growthRate: string;
  height: string;
  spread: string;
  sunlightRequirements: string;
  wateringNeeds: string;
  soilType: string;
  careInstructions: string;
};

export type TProductProp = { product: TProduct };

export type TProductContext = {
  loadingProducts: boolean;
  products: TProduct[];
  loadingNumberOfProducts: boolean;
  numberOfProducts: number;
  loadingMinMaxPrice: boolean;
  defaultMin: number;
  defaultMax: number;
  minProductPrice: number;
  maxProductPrice: number;
  searchTerm: string;
  categoryToLoad: string[];
  setMinProductPrice: React.Dispatch<any>;
  setMaxProductPrice: React.Dispatch<any>;
  sort: string;
  itemsPerPage: number;
  currentPage: number;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCategoryToLoad: React.Dispatch<React.SetStateAction<string[]>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  resetBrowser: () => void;
  resetPagination: () => void;
};

export type TProductCrudContext = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setStock: React.Dispatch<React.SetStateAction<number>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleAddProduct: (e: FormEvent) => Promise<void>;
  handleEditProduct: (e: FormEvent, passedProduct: TProduct) => Promise<void>;
  handleDeleteProduct: (_id: string) => void;
};

export type TProductManagementProp = {
  loadingProducts: boolean;
  products: TProduct[];
  loadingNumberOfProducts: boolean;
};
