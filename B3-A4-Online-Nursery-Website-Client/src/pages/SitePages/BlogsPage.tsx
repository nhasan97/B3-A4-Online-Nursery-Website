import Container from "@/components/layouts/rootLayout/Container";
import BlogBrowser from "@/components/modules/AdminComponents/BlogManagement/BlogBrowser";
import LatestBlog from "@/components/modules/SiteComponents/BlogsPage/LatestBlog";
import TopArticle from "@/components/modules/SiteComponents/BlogsPage/TopArticle";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import Pagination from "@/components/shared/Pagination";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useBlogContext from "@/hooks/useBlogContext";
import { TBlogContext } from "@/types/blog.type";
import { useEffect } from "react";

const BlogsPage = () => {
  const {
    loadingBlogCount,
    totalBlogs,

    // searchTerm,
    setSearchTerm,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,

    loadingTopBlogs,
    topBlogs,
    loadingBlogs,
    blogs,

    resetBrowser,
    resetPagination,
  } = useBlogContext() as TBlogContext;

  useEffect(() => {
    resetBrowser();
    resetPagination();
  }, []);

  return (
    <div className="w-full h-full md:py-10">
      <Container>
        <div className="w-full min-h-screen flex flex-col">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Blog Highlights</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {loadingBlogCount || loadingBlogs || loadingTopBlogs ? (
            <Loading />
          ) : (
            <div className="flex flex-col my-6 gap-24">
              <div>
                <h1 className="text-left text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-3 md:mb-6">
                  Top Articles
                </h1>

                {topBlogs?.length <= 0 ? (
                  <NoData text={"No Data Found"} />
                ) : (
                  <TopArticle topBlogs={topBlogs} />
                )}
              </div>

              <div>
                <h1 className="text-left text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-3 md:mb-6">
                  Latest Blogs
                </h1>

                <div>
                  <BlogBrowser
                    // searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sort={sort}
                    setSort={setSort}
                    resetBrowser={resetBrowser}
                  />

                  {blogs?.length <= 0 ? (
                    <NoData text={"No Data Found"} />
                  ) : (
                    <LatestBlog blogs={blogs} />
                  )}

                  {/* </Pagination> */}
                  <Pagination
                    loadingDataLength={loadingBlogCount}
                    dataLength={totalBlogs}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogsPage;
