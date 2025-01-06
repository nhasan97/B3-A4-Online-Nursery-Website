import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import BlogCards from "./BlogCards";
import { Tblog, TBlogContext } from "@/types/blog.type";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useBlogContext from "@/hooks/useBlogContext";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";

const BlogSection = () => {
  const navigate = useNavigate();

  const { loadingTopBlogs, topBlogs } = useBlogContext() as TBlogContext;

  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-12">
          <SiteTitle title={"Blog HighLights"}></SiteTitle>

          {loadingTopBlogs ? (
            <Loading />
          ) : topBlogs.length <= 0 ? (
            <NoData text={"No blog found"} />
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {topBlogs?.slice(0, 2).map((blog: Tblog) => (
                <BlogCards key={blog?._id} blog={blog} />
              ))}
            </div>
          )}

          <Button
            className="bg-[#5D7E5F] text-white text-base md:text-lg rounded-full"
            onClick={() => navigate("/all-blogs")}
          >
            View All Blogs
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default BlogSection;
