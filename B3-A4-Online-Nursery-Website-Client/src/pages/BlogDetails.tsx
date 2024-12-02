import Container from "@/components/layouts/rootLayout/Container";
import { Tblog } from "@/types/blog.type";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { _id } = useParams();
  const [matchedBlog, setMatchedBlog] = useState<Tblog | undefined>(undefined);

  useEffect(() => {
    axios
      .get("/blogData.json")
      .then((response) => {
        const blog = response.data.find((blog: Tblog) => blog._id === _id);
        setMatchedBlog(blog);
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  }, [_id]);

  if (!matchedBlog) {
    return <p>Loading blog...</p>; // Show a loading state
  }

  return (
    <div>
      <Container>
        <div className="w-full min-h-screen flex flex-col lg:flex-row lg:p-5">
          <div className="w-full lg:w-1/2">
            <img
              src={matchedBlog?.thumbnail}
              alt=""
              className="w-full h-full object-cover object-center rounded-xl"
            />
          </div>
          <div className="w-full flex flex-col gap-6 text-[#757575] py-5 lg:p-5 lg:border-r lg:border-[#e1e2e1]">
            <div>
              <h1 className="text-[#5D7E5F] text-lg xl:text-xl font-semibold">
                {matchedBlog?.title}
              </h1>
            </div>

            <div className="h-[28px] flex justify-between items-center text-xs">
              <p>Posted on {matchedBlog?.date}</p>
              {/* {isFeatured && (
            <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
              <p>Featured</p>
            </div>
          )} */}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={matchedBlog?.authorImage}
                alt=""
                className="size-12 rounded-full"
              />
              <div className="space-y-1">
                <p>{matchedBlog?.author}</p>
                <p>
                  <i className="fa-solid fa-envelope"></i>{" "}
                  {matchedBlog?.authorEmail}
                </p>
              </div>
            </div>

            <div
              className="text-preview text-base text-justify"
              dangerouslySetInnerHTML={{ __html: matchedBlog?.content }}
            />

            <div className="flex gap-3">
              tags ||
              {matchedBlog?.tags?.map((tag: string) => (
                <div key={tag} className="px-3 py-1 bg-[#5D7E5F] rounded-full">
                  <p className="text-white">{tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
