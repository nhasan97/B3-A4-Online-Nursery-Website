import { MdEditDocument } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import orderApi from "@/redux/api/orderApi";
import { catchAsync } from "@/utils/catchAsync";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const EditOrderStatusModal = ({
  passedOrderID,
  passedOrderStatus,
}: {
  passedOrderID: string;
  passedOrderStatus: string;
}) => {
  const [orderStatus, setOrderStatus] = useState("");

  const [editOrderStatus] = orderApi.useEditOrderStatusMutation();

  const handleEditOrderStatus = catchAsync(async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      _id: passedOrderID,
      status: orderStatus,
    };

    const res = await editOrderStatus(payload).unwrap();
    toast.success(res.message);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`flex justify-between items-center gap-1 px-2 text-xl sm:text-base text-[#757575] hover:text-[#5D7E5F] font-normal bg-transparent hover:bg-[#98b2992f] ${
            passedOrderStatus === "Pending"
              ? "sm:bg-gray-100 sm:hover:bg-gray-700 sm:text-gray-700 sm:hover:text-gray-100"
              : passedOrderStatus === "Processing"
              ? "sm:bg-orange-100 sm:hover:bg-orange-600 sm:text-orange-600 sm:hover:text-orange-100"
              : passedOrderStatus === "Delivered"
              ? "sm:bg-green-100 sm:hover:bg-green-700 sm:text-green-700 sm:hover:text-green-100"
              : "sm:bg-red-100 sm:hover:bg-red-600 sm:text-red-600 sm:hover:text-red-100"
          } rounded-full`}
        >
          <p className="hidden sm:flex">{passedOrderStatus}</p>{" "}
          <MdEditDocument />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#757575]">
            Edit Order Status
          </DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => handleEditOrderStatus(e)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left text-[#757575]">
              Category
            </Label>
            <Select
              defaultValue={passedOrderStatus}
              onValueChange={(value) => setOrderStatus(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"Pending"}>Pending</SelectItem>
                  <SelectItem value={"Processing"}>Processing</SelectItem>
                  <SelectItem value={"Delivered"}>Delivered</SelectItem>
                  <SelectItem value={"Canceled"}>Canceled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderStatusModal;
