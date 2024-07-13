import { TCategory } from "@/types/category.type";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Link } from "react-router-dom";

const CategoryCards = ({ category }: { category: TCategory }) => {
  return (
    <Link to={`/products-page/${category?.category}`}>
      <div>
        <div className="w-full h-full cursor-pointer p-2 rounded-full border-2 border-[#5D7E5F]">
          <Avatar className="w-full h-full">
            <AvatarImage src={category?.image} alt="@shadcn" />
            <AvatarFallback className="bg-[#98b2992f] text-4xl text-[#808080]">
              {category?.category}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="text-center text-xl text-[#757575] mt-2">
          {category?.category}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCards;
