import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { BiSolidUserDetail } from "react-icons/bi";

const CustomerDetailsModal = ({
  customerDetails,
}: {
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <BiSolidUserDetail />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <p className="text-2xl font-medium">Customer Details</p>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Name : </span>{" "}
            {customerDetails?.name}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Email : </span>
            {customerDetails?.email}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Phone : </span>
            {customerDetails?.phone}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Address : </span>
            {customerDetails?.address}
          </p>
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

export default CustomerDetailsModal;
