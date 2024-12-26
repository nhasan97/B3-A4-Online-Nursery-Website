import { BlogCrudContext } from "@/providers/BlogCrudFunctionsProvider";
import { useContext } from "react";

const useBlogCrudContext = () => {
  const blogCrudInfo = useContext(BlogCrudContext);

  return blogCrudInfo;
};

export default useBlogCrudContext;
