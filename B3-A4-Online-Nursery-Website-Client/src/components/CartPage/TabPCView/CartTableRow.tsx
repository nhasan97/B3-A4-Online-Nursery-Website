import { Button } from "@/components/ui/button";
import { editQty, removeItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCartItem } from "@/types/cart.type";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const CartTableRow = ({ item }: { item: TCartItem }) => {
  const dispatch = useAppDispatch();

  const handleEditQty = (editedQty: number) => {
    if (item?.qty + editedQty > 0 && item?.qty + editedQty <= item?.stock) {
      const payload = {
        _id: item?._id,
        qty: item?.qty + editedQty,
      };

      dispatch(editQty(payload));
    } else if (item?.qty + editedQty > item?.stock) {
      toast.error("No more left");
    }
  };

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src={item?.image}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{item?.title}</td>

      <td className="flex-1">${item?.price}</td>

      <td className="flex-1">
        <div className="flex justify-center items-center gap-4">
          {item?.qty}
          <div className="text-2xl">
            <IoMdArrowDropup
              className="hover:text-green-500"
              onClick={() => handleEditQty(1)}
            />
            <IoMdArrowDropdown
              className="hover:text-red-500"
              onClick={() => handleEditQty(-1)}
            />
          </div>
        </div>
      </td>

      <td className="flex-1">${(item?.price * item?.qty).toFixed(2)}</td>

      <td className="flex-1">
        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => dispatch(removeItem(item?._id as string))}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default CartTableRow;
