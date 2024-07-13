import { Button } from "@/components/ui/button";
import { editQty, removeItem } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TCartItem } from "@/types/cart.type";
import { toast } from "sonner";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const CartMobileCard = ({ item }: { item: TCartItem }) => {
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
    <div className="text-[#808080] p-4 space-y-2 border-b">
      <div className="flex items-center gap-2">
        <img
          src={item?.image}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>

        <p className="flex-1 font-semibold text-[#5D7E5F] text-lg">
          {item?.title}
        </p>
      </div>

      <div className=" bg-[#98b2992f] flex items-center text-center rounded-full">
        <p className="flex-1">${item?.price}</p>

        <p className="flex-1">
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
        </p>

        <p className="flex-1">${(item?.price * item?.qty).toFixed(2)}</p>

        <p className="flex-1">
          <Button
            className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
            onClick={() => dispatch(removeItem(item?._id as string))}
          >
            <MdDelete />
          </Button>
        </p>
      </div>
    </div>
  );
};

export default CartMobileCard;
