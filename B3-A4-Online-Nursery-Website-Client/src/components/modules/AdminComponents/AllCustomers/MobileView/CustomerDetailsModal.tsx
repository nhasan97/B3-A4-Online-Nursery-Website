import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TUserExtended } from "@/types/auth.type";
import { dateToISO } from "@/utils/dateToISO";
import { MdInfo } from "react-icons/md";

const CustomerDetailsModal = ({ customer }: { customer: TUserExtended }) => {
  const { name, email, phone, address, imageUrl, createdAt } = customer;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full overflow-y-auto">
          <MdInfo />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-full overflow-y-auto">
        <DialogHeader>
          <img
            src={imageUrl}
            alt=""
            className="w-full h-[250px] mb-4 object-fill object-center rounded-lg"
          />
          <DialogTitle className="text-[#5D7E5F] text-xl font-semibold ">
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
          <p className="text-[#808080] text-base leading-7">
            <span className="text-[#696969] font-semibold">Joined : </span>
            {dateToISO(createdAt).formattedDate}
          </p>
        </div>

        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-base md:text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModal;
