import { IOrder } from "@/types/order.type";
import CustomerDetailsModal from "./CustomerDetailsModal";
import ItemDetailsModal from "./ItemDetailsModal";
import PaymentDetailsModal from "./PaymentDetailsModal";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";
import EditOrderStatusModal from "../EditOrderStatusModal";

const OrderTableRow = ({
  order,
  caller,
}: {
  order: IOrder;
  caller?: string;
}) => {
  const {
    _id,
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
    estimatedDelivery,
    status,
  } = order;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center font-semibold text-[#5D7E5F]">
        {orderId}
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">
        <CustomerDetailsModal
          customerDetails={{ name, email, phone, address }}
        />
      </td>

      <td className="flex-1">
        <ItemDetailsModal items={items} />
      </td>

      <td className="flex-1">
        <PaymentDetailsModal
          paymentDetails={{
            totalAmount,
            paymentMethod,
            paymentStatus,
            paid,
            transactionID,
          }}
        />
      </td>

      <td className="flex-1">{timeStampToDateConverter(estimatedDelivery)}</td>

      {caller === "admin" ? (
        <td className="flex-1 flex justify-center items-center gap-3">
          <EditOrderStatusModal
            passedOrderID={_id as string}
            passedOrderStatus={status}
          />
        </td>
      ) : (
        <td className="flex-1 flex justify-center items-center">
          {status === "Pending" && (
            <p className="w-fit mx-auto py-2 px-4 bg-gray-100 text-gray-700 rounded-full">
              {status}
            </p>
          )}
          {status === "Processing" && (
            <p className="w-fit mx-auto py-2 px-4 bg-orange-100 text-orange-600 rounded-full">
              {status}
            </p>
          )}
          {status === "Delivered" && (
            <p className="w-fit mx-auto py-2 px-4 bg-green-100 text-green-700 rounded-full">
              {status}
            </p>
          )}
          {status === "Canceled" && (
            <p className="w-fit mx-auto py-2 px-4 bg-red-100 text-red-600 rounded-full">
              {status}
            </p>
          )}
        </td>
      )}
    </tr>
  );
};

export default OrderTableRow;
