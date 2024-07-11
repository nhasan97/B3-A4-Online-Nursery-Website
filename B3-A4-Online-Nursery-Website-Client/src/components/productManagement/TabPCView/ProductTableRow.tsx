import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import DetailsModal from "../DetailsModal";
import EditProductModal from "../EditProductModal";
import { TProductProp } from "@/types/product.type";
import productApi from "@/redux/api/ProductApi";
import { toast } from "sonner";

const ProductTableRow = ({
  _id,
  title,
  description,
  category,
  price,
  rating,
  stock,
  image,
}: TProductProp) => {
  const [deleteProduct] = productApi.useDeleteProductMutation();

  const handleDeleteProduct = (_id) => {
    toast.warning("Are youAre you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: async () => {
          try {
            const res = await deleteProduct(_id).unwrap();
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

      <td className="flex-1 font-semibold text-[#5D7E5F]">{title}</td>

      <td className="flex-1">
        <DetailsModal
          image={image}
          title={title}
          description={description}
          rating={rating}
        ></DetailsModal>
      </td>

      <td className="flex-1">{category}</td>

      <td className="flex-1">{price}</td>

      <td className="flex-1">{stock}</td>

      <td className="flex-1">
        <EditProductModal
          _id={_id}
          title={title}
          description={description}
          category={category}
          price={price}
          rating={rating}
          stock={stock}
          image={image}
        ></EditProductModal>
        <Button
          className="bg-transparent hover:bg-red-100 text-lg text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteProduct(_id)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
