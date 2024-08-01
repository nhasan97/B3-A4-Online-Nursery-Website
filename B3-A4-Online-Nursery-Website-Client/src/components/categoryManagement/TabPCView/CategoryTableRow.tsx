import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import { TCategoryContext, TCategoryProp } from "@/types/category.type";
import EditCategoryModal from "../EditCategoryModal";
import DetailsCategoryModal from "../DetailsCategoryModal";
import useCategoryContext from "@/hooks/useCategoryContext";

const CategoryTableRow = ({ category }: TCategoryProp) => {
  const { handleDeleteCategory } = useCategoryContext() as TCategoryContext;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src={category?.image}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">
        {category?.category}
      </td>

      <td className="flex-1">
        <DetailsCategoryModal category={category}></DetailsCategoryModal>
      </td>

      <td className="flex-1">
        <EditCategoryModal category={category}></EditCategoryModal>
        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteCategory(category?._id as string)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
