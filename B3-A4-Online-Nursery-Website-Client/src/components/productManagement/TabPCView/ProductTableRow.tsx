import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import EditProductModal from "../EditProductModal";
import { TProduct } from "@/types/product.type";
import productApi from "@/redux/api/ProductApi";
import { toast } from "sonner";
import DetailsProductModal from "../DetailsProductModal";

const ProductTableRow = ({ product }: { product: TProduct }) => {
  const [deleteProduct] = productApi.useDeleteProductMutation();

  const handleDeleteProduct = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
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
          src={product?.image}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{product?.title}</td>

      <td className="flex-1">
        <DetailsProductModal product={product}></DetailsProductModal>
      </td>

      <td className="flex-1">{product?.category}</td>

      <td className="flex-1">{product?.price}</td>

      <td className="flex-1">{product?.stock}</td>

      <td className="flex-1">
        <EditProductModal product={product}></EditProductModal>
        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteProduct(product?._id as string)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
