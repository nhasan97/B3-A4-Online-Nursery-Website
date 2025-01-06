// import Pagination from "@/components/shared/Pagination";
import { Tblog } from "@/types/blog.type";
import BlogCards from "../Home/BlogSection/BlogCards";

const LatestBlog = ({ blogs }: { blogs: Tblog[] }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-6 my-6 overflow-y-auto">
      {blogs?.map((blog: Tblog) => (
        <BlogCards key={blog?._id} blog={blog} />
      ))}
    </div>
  );
};

export default LatestBlog;
