import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Loading from "@/components/shared/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useBlogContext from "@/hooks/useBlogContext";
import blogApi from "@/redux/api/blogAPi";
import { TBlogContext } from "@/types/blog.type";
import { dateToISO } from "@/utils/dateToISO";
import { Helmet } from "react-helmet-async";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const BlogDeatilsPage = () => {
  const { _id } = useParams();

  const { isLoading, data: loadedBlog } = blogApi.useGetSingleBlogQuery(_id);

  const { loadingTopBlogs, topBlogs } = useBlogContext() as TBlogContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Blog Details</title>
        </Helmet>

        <div className="w-full h-full flex flex-col gap-6">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbLink href="/admin-dashboard/blogs">
                  <BreadcrumbPage>Blogs</BreadcrumbPage>
                </BreadcrumbLink>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Blog Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {isLoading ? (
            <div className="h-[calc(100vh-200px)]">
              <Loading />
            </div>
          ) : (
            <div className="bg-white flex flex-col xl:flex-row gap-6 overflow-y-auto rounded-lg">
              <div className="w-full flex flex-col gap-6 text-[#757575] p-5">
                <div>
                  <h1 className="text-[#5D7E5F] text-xl sm:text-3xl xl:text-5xl sm:leading-10 xl:leading-[60px] font-bold">
                    {loadedBlog?.data?.title}
                  </h1>
                </div>

                <div className="flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center gap-6 text-sm sm:text-base">
                  <div className="flex items-center gap-3">
                    <img
                      src={loadedBlog?.data?.authorImage}
                      alt=""
                      className="size-12 rounded-full"
                    />
                    <div className="space-y-1">
                      <p>{loadedBlog?.data?.author}</p>
                      <p>
                        <i className="fa-solid fa-envelope"></i>{" "}
                        {loadedBlog?.data?.authorEmail}
                      </p>
                    </div>
                  </div>

                  <div className="h-[28px] flex items-center gap-3">
                    <p>
                      Posted on{" "}
                      {dateToISO(loadedBlog?.data?.createdAt).formattedDate}
                    </p>
                    <div className="size-2 bg-[#757575] rounded-full"></div>
                    <p>{loadedBlog?.data?.readingTime} Read</p>

                    {/* {isFeatured && (
            <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
              <p>Featured</p>
            </div>
          )} */}
                  </div>
                </div>
                <img
                  src={loadedBlog?.data?.thumbnail}
                  alt=""
                  className="w-full sm:h-[400px] xl:h-[500px] object-cover object-center rounded-xl"
                />

                <div
                  className="text-base text-justify"
                  dangerouslySetInnerHTML={{
                    __html: loadedBlog?.data?.content,
                  }}
                />
              </div>

              <div className="w-full xl:w-1/3 p-5 xl:border-l xl:border-[#e1e2e1] space-y-6">
                <h1 className="text-left text-[#757575] text-lg md:text-2xl xl:text-4xl font-semibold mb-3 md:mb-6">
                  Tags
                </h1>
                <div className="w-full flex flex-wrap gap-3 pb-5">
                  {loadedBlog?.data?.tags?.map(
                    (singleTag: { tag: string }, index: number) => (
                      <div
                        key={index}
                        className="w-fit px-3 py-1 bg-[#5D7E5F] rounded-full"
                      >
                        <p className="text-white">{singleTag?.tag}</p>
                      </div>
                    )
                  )}
                </div>

                <h1 className="text-left text-[#757575] text-lg md:text-2xl xl:text-4xl font-semibold mb-3 md:mb-6">
                  Popular
                </h1>
                <div className="w-full space-y-6 pb-5">
                  {loadingTopBlogs ? (
                    <Loading />
                  ) : (
                    topBlogs?.map((blog) => (
                      <div
                        key={blog._id}
                        className="bg-white p-2 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={blog?.thumbnail}
                            alt=""
                            className="size-12 rounded-lg"
                          />

                          <div className="flex flex-col gap-3">
                            <h4 className="text-preview text-base text-[#5a5a5a] font-medium">
                              {blog?.title}
                            </h4>
                            <div className="flex justify-start items-center gap-1 text-[#757575] text-xs">
                              <p>{dateToISO(blog?.createdAt).formattedDate}</p>
                              <div className="size-1 bg-[#757575] rounded-full"></div>
                              <p>{blog?.readingTime} Read</p>
                              <Link to={`/blog-details/${blog?._id}`}>
                                <FaLongArrowAltRight className="text-base hover:translate-x-1 transition-all" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default BlogDeatilsPage;
