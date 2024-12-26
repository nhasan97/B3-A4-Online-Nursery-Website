import { BlogContext } from "@/providers/BlogProvider";
import { useContext } from "react";

const useBlogContext = () => {
  const blogInfo = useContext(BlogContext);

  return blogInfo;
};

export default useBlogContext;
