import { TProductCrudContext, TProductProp } from "@/types/product.type";
import { Button } from "../../../../ui/button";
import { MdDelete, MdEditDocument } from "react-icons/md";
import DetailsProductModal from "../DetailsProductModal";
import useProductCrudContext from "@/hooks/useProductCrudContext";
import { Link } from "react-router-dom";

const MobileViewProductCard = ({ product }: TProductProp) => {
  const { handleDeleteProduct } =
    useProductCrudContext() as TProductCrudContext;

  return (
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={product?.images[0]}
            className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
          ></img>

          <h2 className=" text-[#5D7E5F] font-semibold ">{product?.title}</h2>
        </div>

        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-l-full">
            <DetailsProductModal product={product}></DetailsProductModal>
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] border-x-2">
            <Link to={`/admin-dashboard/edit-products/${product?._id}`}>
              <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
                <MdEditDocument />
              </Button>
            </Link>
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
