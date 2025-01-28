import { Button } from "@/components/ui/button";
import { Tblog } from "@/types/blog.type";
import { Link } from "react-router-dom";
import "../../../../cssStyles/textPreview.css";
import { dateToISO } from "@/utils/dateToISO";

const BlogCards = ({ blog }: { blog: Tblog }) => {
  const { _id, title, thumbnail, author, authorImage, authorEmail, createdAt } =
    blog;

  return (
    <div className="flex flex-col xl:flex-row items-center mt-12 xl:ml-12 xl:mt-0 relative">
      <div className="absolute xl:left-0 -translate-y-1/4 xl:-translate-x-1/4 xl:translate-y-0 rounded-lg">
        <img
          src={thumbnail}
          loading="lazy"
          className="w-[240px] h-[150px] xl:size-[200px] bg-[#B0C3B1] p-1 rounded-md object-fill object-center shadow-2xl"
        />
      </div>

      <div className="w-full flex flex-col gap-2 px-5 pt-32 pb-5 xl:py-10 xl:pr-5 xl:pl-[170px] bg-[#ECF1EC] text-[#757575] rounded-lg">
        <div>
          <h1 className="text-preview text-[#5D7E5F] text-lg xl:text-xl font-semibold">
            {title}
          </h1>
        </div>

        <div className="h-[28px] flex justify-between items-center text-xs">
          <p>Posted on {dateToISO(createdAt).formattedDate}</p>
          {/* {isFeatured && (
            <div className="w-fit py-1 px-3 rounded-full bg-white text-pink-500">
              <p>Featured</p>
            </div>
          )} */}
        </div>

        <div className="flex items-center gap-3">
          <img
            src={authorImage}
            loading="lazy"
            className="size-12 rounded-full object-fill object-center"
          />
          <div className="space-y-1">
            <p>{author}</p>
            <p>
              <i className="fa-solid fa-envelope"></i> {authorEmail}
            </p>
          </div>
        </div>

        <Link to={`/blog-details/${_id}`}>
          <Button className="w-fit bg-[#5D7E5F] text-base px-8 mt-3 rounded-full">
            Read Blog
          </Button>
        </Link>

        <div className="flex gap-3"></div>
      </div>
    </div>
  );
};

export default BlogCards;
