import productApi from "@/redux/api/ProductApi";
import { TChildren } from "@/types/children.type";
import { TProductContext } from "@/types/product.type";
import { createContext, useState } from "react";

export const ProductContext = createContext<TProductContext | undefined>(
  undefined
);

const ProductProvider = ({ children }: TChildren) => {
  //loading number of total product
  const { isLoading: loadingNumberOfProducts, data: loadedNumberOfProducts } =
    productApi.useGetProductCountQuery(undefined);

  //loading min and max product price
  const { isLoading: loadingMinMaxPrice, data: loadedMinMaxPrice } =
    productApi.useGetMinMaxProductPriceQuery(undefined);

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryToLoad, setCategoryToLoad] = useState<string[]>([]);
  const [minProductPrice, setMinProductPrice] = useState<number>(
    loadedMinMaxPrice?.data?.minPrice
  );
  const [maxProductPrice, setMaxProductPrice] = useState<number>(
    loadedMinMaxPrice?.data?.maxPrice
  );
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  //loading products
  const { isLoading: loadingProducts, data: loadedProducts } =
    productApi.useGetProductsQuery({
      searchTerm,
      categoryToLoad,
      minProductPrice,
      maxProductPrice,
      sort,
      currentPage,
      itemsPerPage,
    });

  const resetBrower = () => {
    setSearchTerm("");
    setCategoryToLoad([]);
    setSort("");
  };

  const resetPagination = () => {
    setItemsPerPage(10);
    setCurrentPage(0);
  };

  const productInfo: TProductContext = {
    loadingProducts,
    products: loadedProducts?.data,
    loadingNumberOfProducts,
    numberOfProducts: loadedNumberOfProducts?.data,
    loadingMinMaxPrice,
    minProductPrice,
    maxProductPrice,
    defaultMin: loadedMinMaxPrice?.data[0]?.minPrice,
    defaultMax: loadedMinMaxPrice?.data[0]?.maxPrice,

    searchTerm,
    categoryToLoad,
    sort,
    itemsPerPage,
    currentPage,
    setSearchTerm,
    setCategoryToLoad,
    setMinProductPrice,
    setMaxProductPrice,
    setSort,
    setItemsPerPage,
    setCurrentPage,

    resetBrower,
    resetPagination,
  };

  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
