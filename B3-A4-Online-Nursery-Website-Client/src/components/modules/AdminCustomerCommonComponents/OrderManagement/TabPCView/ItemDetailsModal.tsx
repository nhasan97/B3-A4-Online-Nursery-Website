import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { TCartItem } from "@/types/order.type";
import { RiPlantFill } from "react-icons/ri";

const ItemDetailsModal = ({ items }: { items: TCartItem[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <RiPlantFill />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <p className="text-2xl font-medium">Items</p>
        </DialogHeader>
        <table className="w-full border">
          {/* head */}
          <thead>
            <tr className="w-full flex justify-between items-center text-[#757575] text-center p-5 border-b">
              <th className="flex-1">Product</th>
              <th className="flex-1">Stock</th>
              <th className="flex-1">Qty</th>
              <th className="flex-1">Price</th>
            </tr>
          </thead>
          <tbody>
            <div className="h-[300px] overflow-y-auto">
              {items?.map((item) => (
                <tr
                  key={item?._id}
                  className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
                >
                  <td className="flex-1">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <img src={item?.image} alt="" className="size-16" />
                      <p>{item?.title}</p>
                    </div>
                  </td>
                  <td className="flex-1">{item?.stock}</td>
                  <td className="flex-1">{item?.qty}</td>
                  <td className="flex-1">${item?.price}</td>
                </tr>
              ))}
            </div>
          </tbody>
        </table>

        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsModal;