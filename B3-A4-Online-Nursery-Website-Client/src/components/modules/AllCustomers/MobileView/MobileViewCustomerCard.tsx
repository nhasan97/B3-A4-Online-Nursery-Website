import CustomerDetailsModal from "./CustomerDetailsModal";
import { TUserExtended } from "@/types/auth.type";

const MobileViewCustomerCard = ({ customer }: { customer: TUserExtended }) => {
  const { name, imageUrl } = customer;

  return (
    <div className="h-fit bg-white flex justify-between gap-3 p-5 rounded-md shadow-md">
      <div className="space-y-2">
        <img
          src={imageUrl}
          alt=""
          className="size-14 rounded-full object-fill object-center"
        />
        <h2 className=" text-[#5D7E5F] font-semibold ">{name}</h2>
      </div>

      <div className="rounded-full">
        <CustomerDetailsModal customer={customer} />
      </div>
    </div>
  );
};

export default MobileViewCustomerCard;
