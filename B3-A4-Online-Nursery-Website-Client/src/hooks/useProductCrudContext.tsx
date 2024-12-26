import { ProductCrudContext } from "@/providers/ProductCrudFunctionsProvider";
import { useContext } from "react";

const useProductCrudContext = () => {
  const productCrudInfo = useContext(ProductCrudContext);

  return productCrudInfo;
};

export default useProductCrudContext;
