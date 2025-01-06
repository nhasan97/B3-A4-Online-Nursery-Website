import { TCategoryProp } from "@/types/category.type";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../ui/avatar";
import { Link } from "react-router-dom";

const CategoryCards = ({ category }: TCategoryProp) => {
  return (
    <Link to={`/products-page/${category?.category}`}>
      <div>
        <div className="w-full h-full">
          <Avatar className="w-full h-full cursor-pointer p-2 border-2 border-[#5D7E5F]">
            <AvatarImage
              src={category?.image}
              alt="@shadcn"
              className=" rounded-full"
            />
            <AvatarFallback className="bg-[#98b2992f] text-4xl text-[#808080]">
              <div className="bg-[#98b299] w-[214px] h-[214px] rounded-full animate-pulse "></div>
            </AvatarFallback>
          </Avatar>

          {/*<img
            src={category?.image}
            alt={category?.category}
            className="w-[214px] h-[214px]"
          />*/}
        </div>
        <p className="text-center text-xl text-[#757575] mt-2">
          {category?.category}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCards;
