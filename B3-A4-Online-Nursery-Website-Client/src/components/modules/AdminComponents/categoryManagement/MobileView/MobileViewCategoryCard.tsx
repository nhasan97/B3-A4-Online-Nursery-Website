import { Button } from "../../../../ui/button";
import { MdDelete } from "react-icons/md";
import { TCategoryCrudContext, TCategoryProp } from "@/types/category.type";
import DetailsCategoryModal from "../DetailsCategoryModal";
import EditCategoryModal from "../EditCategoryModal";
import useCategoryCrudContext from "@/hooks/useCategoryCrudContext";

const MobileViewCategoryCard = ({ category }: TCategoryProp) => {
  const { handleDeleteCategory } =
    useCategoryCrudContext() as TCategoryCrudContext;

  return (
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={category?.image}
            className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
          ></img>

          <h2 className=" text-[#5D7E5F] font-semibold ">
            {category?.category}
          </h2>
        </div>

        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-l-full">
            <DetailsCategoryModal category={category}></DetailsCategoryModal>
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] border-x-2">
            <EditCategoryModal category={category}></EditCategoryModal>
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-r-full">
            <Button
              className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
              onClick={() => handleDeleteCategory(category?._id as string)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileViewCategoryCard;
