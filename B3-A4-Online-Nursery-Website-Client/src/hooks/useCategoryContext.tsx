import { CategoryContext } from "@/providers/CategoryProvider";
import { useContext } from "react";

const useCategoryContext = () => {
  const categoryInfo = useContext(CategoryContext);

  return categoryInfo;
};

export default useCategoryContext;
