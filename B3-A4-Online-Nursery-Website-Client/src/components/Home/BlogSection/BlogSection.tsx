import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCards from "./BlogCards";
import { Tblog } from "@/types/blog.type";

const BlogSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/blogData.json") // Specify the relative path from the public folder
      .then((response) => {
        setData(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, []);

  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col gap-8 sm:gap-16">
          <SiteTitle title={"Blog HighLights"}></SiteTitle>

          <div className="grid sm:grid-cols-2 gap-6">
            {data?.slice(0, 2).map((blog: Tblog) => (
              <BlogCards key={blog?._id} blog={blog} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogSection;
