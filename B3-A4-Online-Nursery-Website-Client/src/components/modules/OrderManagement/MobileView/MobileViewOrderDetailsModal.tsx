import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { IOrder } from "@/types/order.type";
import { BiSolidUserDetail } from "react-icons/bi";

const MobileViewOrderDetailsModal = ({ order }: { order: IOrder }) => {
  const {
    orderId,
    name,
    email,
    phone,
    address,
    items,
    totalAmount,
    paymentMethod,
    paymentStatus,
    paid,
    transactionID,
  } = order;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <BiSolidUserDetail />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[570px] overflow-y-auto">
        <DialogHeader>
          <p className="text-2xl font-medium">#{orderId}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Customer Details</h3>

            <div className="space-y-2">
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">Name : </span>{" "}
                {name}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">Email : </span>
                {email}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">Phone : </span>
                {phone}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">Address : </span>
                {address}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Items</h3>

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
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Customer Details</h3>

            <div className="space-y-2">
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">
                  Total Bill :{" "}
                </span>
                ${totalAmount}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">
                  Payment Method :{" "}
                </span>
                {paymentMethod}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">
                  Payment Status :{" "}
                </span>
                {paymentStatus}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">
                  Paid Amount :{" "}
                </span>
                ${paid}
              </p>
              <p className="text-[#808080] text-base leading-7">
                <span className="text-[#696969] font-semibold">
                  Transaction ID :{" "}
                </span>
                {transactionID}
              </p>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default MobileViewOrderDetailsModal;
