import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { TCategoryProp } from "@/types/category.type";
import categoryApi from "@/redux/api/CategoryApi";
import EditCategoryModal from "../EditCategoryModal";
import DetailsCategoryModal from "../DetailsCategoryModal";

const CategoryTableRow = ({
  _id,
  category,
  description,
  image,
}: TCategoryProp) => {
  const [deleteCategory] = categoryApi.useDeleteCategoryMutation();

  const handleDeleteCategory = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: async () => {
          try {
            const res = await deleteCategory(_id).unwrap();
            if (res.success && res.statusCode === 200) {
              toast.success(res.message, {
                duration: 2000,
              });
            }
          } catch (err) {
            toast.error(err.data.message, { duration: 2000 });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };
  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src={image}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{category}</td>

      <td className="flex-1">
        <DetailsCategoryModal
          image={image}
          category={category}
          description={description}
        ></DetailsCategoryModal>
      </td>

      <td className="flex-1">
        <EditCategoryModal
          _id={_id}
          category={category}
          description={description}
          image={image}
        ></EditCategoryModal>
        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteCategory(_id)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
