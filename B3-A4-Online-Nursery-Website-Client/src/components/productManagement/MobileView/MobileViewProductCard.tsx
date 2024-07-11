import { TProductProp } from "@/types/product.type";
import DetailsModal from "../DetailsModal";
import EditProductModal from "../EditProductModal";
import { Button } from "../../ui/button";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import productApi from "@/redux/api/ProductApi";

const MobileViewProductCard = ({
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
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={image}
            className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
          ></img>

          <h2 className=" text-[#5D7E5F] font-semibold ">{title}</h2>
        </div>

        <div className="flex justify-between">
          <DetailsModal
            image={image}
            title={title}
            description={description}
            rating={rating}
          ></DetailsModal>

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
        </div>
      </div>
    </div>
  );
};

export default MobileViewProductCard;
