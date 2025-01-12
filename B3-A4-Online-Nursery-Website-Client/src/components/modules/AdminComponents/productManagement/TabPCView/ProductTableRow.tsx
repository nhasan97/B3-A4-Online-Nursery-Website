import { Button } from "../../../../ui/button";
import { MdDelete } from "react-icons/md";
import EditProductModal from "../EditProductModal";
import { TProductCrudContext, TProductProp } from "@/types/product.type";
import DetailsProductModal from "../DetailsProductModal";
import useProductCrudContext from "@/hooks/useProductCrudContext";

const ProductTableRow = ({ product }: TProductProp) => {
  const { handleDeleteProduct } =
    useProductCrudContext() as TProductCrudContext;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src={product?.images[0]}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{product?.title}</td>

      <td className="flex-1">
        <DetailsProductModal product={product}></DetailsProductModal>
      </td>

      <td className="flex-1">{product?.category}</td>

      <td className="flex-1">{product?.price}</td>

      <td className="flex-1">
        {product?.stock}

        {product?.stock > 10 && (
          <div className="w-[60%] h-2 mx-auto bg-green-400 text-green-700 rounded-full"></div>
        )}
        {product?.stock > 3 && product?.stock < 10 && (
          <div className="w-[60%] h-2 mx-auto bg-orange-100 text-orange-600 rounded-full">
            <div className="w-1/2 h-2 bg-orange-400 text-orange-600 rounded-full"></div>
          </div>
        )}
        {product?.stock > 0 && product?.stock <= 3 && (
          <div className="w-[60%] h-2 mx-auto bg-red-100 text-red-600 rounded-full">
            <div className="w-1/4 h-2 bg-red-400 text-red-600 rounded-full"></div>
          </div>
        )}
        {product?.stock <= 0 && (
          <div className="w-[60%] h-2 mx-auto bg-red-100 text-red-600 rounded-full"></div>
        )}
      </td>

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
