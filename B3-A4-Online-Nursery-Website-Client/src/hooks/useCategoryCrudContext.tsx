import { CategoryCrudContext } from "@/providers/CategoryCrudFunctionsProvider";
import { useContext } from "react";

const useCategoryCrudContext = () => {
  const categoryCrudInfo = useContext(CategoryCrudContext);

  return categoryCrudInfo;
};

export default useCategoryCrudContext;
