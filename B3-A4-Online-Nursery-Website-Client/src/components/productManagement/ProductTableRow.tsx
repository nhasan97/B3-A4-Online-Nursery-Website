import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import DetailsModal from "./DetailsModal";
import EditProductModal from "./EditProductModal";

const ProductTableRow = () => {
  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src="https://i.postimg.cc/BbK80zxC/images.jpg"
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold">sdfdfgfdg</td>

      <td className="flex-1">
        <DetailsModal></DetailsModal>
      </td>

      <td className="flex-1">sdfkhkjd</td>

      <td className="flex-1">scsdfsdf</td>

      <td className="flex-1">scsdfsdf</td>

      <td className="flex-1">
        <EditProductModal></EditProductModal>
        <Button className="bg-transparent hover:bg-red-100 text-2xl text-[#757575] hover:text-red-600">
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
