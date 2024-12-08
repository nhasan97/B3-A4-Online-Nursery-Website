import BlogCards from "@/components/Home/BlogSection/BlogCards";
import Container from "@/components/layouts/rootLayout/Container";
// import SiteTitle from "@/components/shared/SiteTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tblog } from "@/types/blog.type";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogsPage = () => {
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
    <div className="w-full h-full md:py-10">
      <Container>
        <div className="w-full h-screen flex flex-col">
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

          {/* <SiteTitle title={"Blog HighLights"}></SiteTitle> */}

          <div className="grid sm:grid-cols-2 gap-6 my-6 overflow-y-auto">
            {data?.map((blog: Tblog) => (
              <BlogCards key={blog?._id} blog={blog} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogsPage;
