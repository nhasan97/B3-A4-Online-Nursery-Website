import blogApi from "@/redux/api/blogAPi";
import { TBlogContext } from "@/types/blog.type";
import { TChildren } from "@/types/children.type";
import { createContext, useState } from "react";

export const BlogContext = createContext<TBlogContext | undefined>(undefined);

const BlogProvider = ({ children }: TChildren) => {
  //loading blog count
  const { isLoading: loadingBlogCount, data: loadedBlogCount } =
    blogApi.useGetBlogCountQuery(undefined);

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  //loading Blogs
  const { isLoading: loadingBlogs, data: loadedBlogs } =
    blogApi.useGetBlogsQuery({
      searchTerm,
      sort,
      currentPage,
      itemsPerPage,
    });

  //loading Top Blogs
  const { isLoading: loadingTopBlogs, data: loadedTopBlogs } =
    blogApi.useGetTopBlogsQuery(undefined);

  const resetBrowser = () => {
    setSearchTerm("");
    setSort("");
  };

  const resetPagination = () => {
    setItemsPerPage(6);
    setCurrentPage(0);
  };

  const blogInfo: TBlogContext = {
    loadingBlogCount,
    totalBlogs: loadedBlogCount?.data,

    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,

    loadingTopBlogs,
    topBlogs: loadedTopBlogs?.data,
    loadingBlogs,
    blogs: loadedBlogs?.data,

    resetBrowser,
    resetPagination,
  };

  return (
    <BlogContext.Provider value={blogInfo}>{children}</BlogContext.Provider>
  );
};

export default BlogProvider;
