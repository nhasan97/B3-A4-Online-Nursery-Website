import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import BlogBrowser from "@/components/modules/AdminComponents/BlogManagement/BlogBrowser";
import BlogManagementCard from "@/components/modules/AdminComponents/BlogManagement/BlogManagementCard";
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
import { Button } from "@/components/ui/button";
import useBlogContext from "@/hooks/useBlogContext";
import { Tblog, TBlogContext } from "@/types/blog.type";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogManagement = () => {
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
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Blogs</title>
        </Helmet>

        <div className="w-full h-full flex flex-col justify-between gap-6">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Blogs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full flex justify-between items-center gap-12">
            <BlogBrowser
              // searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sort={sort}
              setSort={setSort}
              resetBrowser={resetBrowser}
            />

            <Link to="/admin-dashboard/add-blogs">
              <Button className="bg-[#5D7E5F] text-base md:text-lg font-semibold space-x-2 rounded-full">
                <FaCirclePlus /> <p>Blog</p>
              </Button>
            </Link>
          </div>

          <div className="w-full h-[80%] overflow-y-auto">
            {loadingBlogCount || loadingBlogs ? (
              <Loading />
            ) : blogs?.length <= 0 ? (
              <NoData text={"No Data Found"} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {blogs?.map((blog: Tblog) => (
                  <BlogManagementCard key={blog?._id} blog={blog} />
                ))}
              </div>
            )}
          </div>

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
      </DashboardContainer>
    </div>
  );
};

export default BlogManagement;
