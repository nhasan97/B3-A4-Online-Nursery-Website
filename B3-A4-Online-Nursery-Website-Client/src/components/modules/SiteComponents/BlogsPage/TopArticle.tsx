import { Button } from "@/components/ui/button";
import { Tblog } from "@/types/blog.type";
import { Link } from "react-router-dom";
import "../../../cssStyles/textPreview.css";
import { dateToISO } from "@/utils/dateToISO";

const TopArticle = ({ topBlogs }: { topBlogs: Tblog[] }) => {
  return (
    <div>
      <div className="hidden md:grid grid-cols-2 gap-6">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="w-full rounded-lg">
              <img
                src={topBlogs[0]?.thumbnail}
                className="w-full h-[380px] bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
              />
            </div>

            <div className="w-full flex flex-col gap-2 pt-5 text-[#757575] rounded-lg">
              <div>
                <h1 className="text-preview text-[#5D7E5F] text-lg xl:text-xl font-semibold">
                  {topBlogs[0]?.title}
                </h1>
              </div>

              <div className="h-[28px] flex justify-between items-center text-xs">
                <p>
                  Posted on {dateToISO(topBlogs[0]?.createdAt).formattedDate}
                </p>
                {/* {isFeatured && (
            <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
              <p>Featured</p>
            </div>
          )} */}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={topBlogs[0]?.authorImage}
                  className="size-12 rounded-full object-fill object-center"
                />
                <div className="space-y-1">
                  <p>{topBlogs[0]?.author}</p>
                  <p>
                    <i className="fa-solid fa-envelope"></i>{" "}
                    {topBlogs[0]?.authorEmail}
                  </p>
                </div>
              </div>

              <Link to={`/blog-details/${topBlogs[0]?._id}`}>
                <Button className="w-fit bg-[#5D7E5F] text-base px-8 mt-3 rounded-full">
                  Read Blog
                </Button>
              </Link>
            </div>

            <div className="flex gap-3"></div>
          </div>
        </div>

        <div className="w-full grid grid-rows-2 gap-6">
          {topBlogs?.slice(1).map((blog: Tblog) => (
            <div className="w-full h-full">
              <div className="h-full flex items-center">
                <div className="h-full rounded-lg">
                  <img
                    src={blog?.thumbnail}
                    className="h-full bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
                  />
                </div>

                <div className="w-full flex flex-col gap-2 px-5 text-[#757575] rounded-lg">
                  <div>
                    <h1 className="text-preview text-[#5D7E5F] text-lg xl:text-xl font-semibold">
                      {blog?.title}
                    </h1>
                  </div>

                  <div className="h-[28px] flex justify-between items-center text-xs">
                    <p>Posted on {dateToISO(blog?.createdAt).formattedDate}</p>
                    {/* {isFeatured && (
              <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
                <p>Featured</p>
              </div>
            )} */}
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={blog?.authorImage}
                      className="size-12 rounded-full object-fill object-center"
                    />
                    <div className="space-y-1">
                      <p>{blog?.author}</p>
                      <p>
                        <i className="fa-solid fa-envelope"></i>{" "}
                        {blog?.authorEmail}
                      </p>
                    </div>
                  </div>

                  <Link to={`/blog-details/${blog?._id}`}>
                    <Button className="w-fit bg-[#5D7E5F] text-base px-8 mt-3 rounded-full">
                      Read Blog
                    </Button>
                  </Link>
                </div>

                <div className="flex gap-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden grid grid-cols-1 gap-6">
        {topBlogs?.map((blog: Tblog) => (
          <div className="flex flex-col shadow-sm">
            <div className="rounded-lg">
              <img
                src={blog?.thumbnail}
                className="w-full h-[200px] sm:h-[500px] bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
              />
            </div>

            <div className="w-full flex flex-col gap-2 py-5 text-[#757575] rounded-lg">
              <div>
                <h1 className="text-preview text-[#5D7E5F] text-lg xl:text-xl font-semibold">
                  {blog?.title}
                </h1>
              </div>

              <div className="h-[28px] flex justify-between items-center text-xs">
                <p>Posted on {blog?.date}</p>
                {/* {isFeatured && (
        <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
          <p>Featured</p>
        </div>
      )} */}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={blog?.authorImage}
                  className="size-12 rounded-full object-fill object-center"
                />
                <div className="space-y-1">
                  <p>{blog?.author}</p>
                  <p>
                    <i className="fa-solid fa-envelope"></i> {blog?.authorEmail}
                  </p>
                </div>
              </div>

              <div
              // className="text-preview text-base text-justify"
              // dangerouslySetInnerHTML={{ __html: content }}
              />

              <Link to={`blog-details/${topBlogs[0]?._id}`}>
                <Button className="w-fit bg-[#5D7E5F] text-base px-8 mt-3 rounded-full">
                  Read Blog
                </Button>
              </Link>
            </div>

            <div className="flex gap-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArticle;
