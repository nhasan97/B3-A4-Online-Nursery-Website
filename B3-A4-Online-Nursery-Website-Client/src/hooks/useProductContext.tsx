import { ProductContext } from "@/providers/ProductProvider";
import { useContext } from "react";

const useProductContext = () => {
  const productInfo = useContext(ProductContext);
  return productInfo;
};

export default useProductContext;
