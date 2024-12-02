import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const PaymentDetailsModal = ({
  paymentDetails,
}: {
  paymentDetails: {
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    paid: number;
    transactionID: string;
  };
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <FaMoneyBillTransfer />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <p className="text-2xl font-medium">Payment Details</p>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Total Bill : </span>{" "}
            ${paymentDetails?.totalAmount}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">
              Payment Method :{" "}
            </span>
            {paymentDetails?.paymentMethod}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">
              Payment Status :{" "}
            </span>
            {paymentDetails?.paymentStatus}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Paid Amount : </span>
            ${paymentDetails?.paid}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">
              Transaction ID :{" "}
            </span>
            {paymentDetails?.transactionID}
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

export default PaymentDetailsModal;
