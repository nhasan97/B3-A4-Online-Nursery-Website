import { TUserExtended } from "@/types/auth.type";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";

const CustomerTableRow = ({ customer }: { customer: TUserExtended }) => {
  const { name, email, phone, address, imageUrl, createdAt } = customer;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 font-semibold text-[#5D7E5F] flex flex-col justify-center items-center gap-2">
        <img
          src={imageUrl}
          alt=""
          className="size-14 rounded-full object-fill object-center"
        />
        <p>{name}</p>
      </td>

      <td className="flex-1">
        <p>{email}</p>
      </td>

      <td className="flex-1">
        <p>+{phone}</p>
      </td>

      <td className="flex-1">
        <p>{address}</p>
      </td>

      <td className="flex-1">{timeStampToDateConverter(createdAt)}</td>
    </tr>
  );
};

export default CustomerTableRow;
