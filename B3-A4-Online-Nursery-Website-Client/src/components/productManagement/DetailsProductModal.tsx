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

const DetailsProductModal = ({ product }: TProductProp) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdInfo />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <img src={product?.image} alt="" className="w-full mb-4" />
          <DialogTitle className="text-[#757575]">{product?.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[#808080] text-base leading-7">
            {product?.description}
          </p>
          <StarRating rating={product?.rating}></StarRating>
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

export default DetailsProductModal;
