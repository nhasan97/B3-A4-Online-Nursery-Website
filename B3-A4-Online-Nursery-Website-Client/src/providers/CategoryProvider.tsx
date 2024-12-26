import categoryApi from "@/redux/api/CategoryApi";
import { TCategoryContext } from "@/types/category.type";
import { TChildren } from "@/types/children.type";
import { createContext, useState } from "react";

export const CategoryContext = createContext<TCategoryContext | undefined>(
  undefined
);

const CategoryProvider = ({ children }: TChildren) => {
  //loading category count
  const { isLoading: loadingCategoryCount, data: loadedCategoryCount } =
    categoryApi.useGetCategoryCountQuery(undefined);

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  //loading Categories
  const { isLoading: loadingCategories, data: loadedCategories } =
    categoryApi.useGetCategoriesQuery({
      searchTerm,
      sort,
      currentPage,
      itemsPerPage,
    });

  const resetBrower = () => {
    setSearchTerm("");
    setSort("");
  };

  const resetPagination = () => {
    setItemsPerPage(5);
    setCurrentPage(0);
  };

  const categoryInfo: TCategoryContext = {
    loadingCategoryCount,
    totalCategory: loadedCategoryCount?.data,

    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,

    loadingCategories,
    categories: loadedCategories?.data,

    resetBrower,
    resetPagination,
  };

  return (
    <CategoryContext.Provider value={categoryInfo}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
