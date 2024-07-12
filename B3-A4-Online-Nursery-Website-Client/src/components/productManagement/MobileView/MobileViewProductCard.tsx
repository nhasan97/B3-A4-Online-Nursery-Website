import { TProduct } from "@/types/product.type";
import EditProductModal from "../EditProductModal";
import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import productApi from "@/redux/api/ProductApi";
import DetailsProductModal from "../DetailsProductModal";

const MobileViewProductCard = ({ product }: { product: TProduct }) => {
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
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={product?.image}
            className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
          ></img>

          <h2 className=" text-[#5D7E5F] font-semibold ">{product?.title}</h2>
        </div>

        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-l-full">
            <DetailsProductModal product={product}></DetailsProductModal>
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] border-x-2">
            <EditProductModal product={product}></EditProductModal>
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-r-full">
            <Button
              className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
              onClick={() => handleDeleteProduct(product?._id as string)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileViewProductCard;
