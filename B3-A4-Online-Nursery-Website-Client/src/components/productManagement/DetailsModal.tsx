import { Button } from "../ui/button";
import { MdInfo } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { TProductProp } from "@/types/product.type";
import StarRating from "../shared/StarRating";

const DetailsModal = ({
  image,
  title,
  description,
  rating,
}: Partial<TProductProp>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-lg text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdInfo />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <img src={image} alt="" className="w-full mb-4" />
          <DialogTitle className="text-[#757575]">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[#808080] text-base leading-7">{description}</p>
          <StarRating rating={rating!}></StarRating>
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

export default DetailsModal;
