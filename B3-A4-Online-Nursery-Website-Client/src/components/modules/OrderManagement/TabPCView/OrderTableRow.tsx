import { IOrder } from "@/types/order.type";
import CustomerDetailsModal from "./CustomerDetailsModal";
import ItemDetailsModal from "./ItemDetailsModal";
import PaymentDetailsModal from "./PaymentDetailsModal";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";
import EditOrderStatusModal from "../EditOrderStatusModal";

const OrderTableRow = ({ order }: { order: IOrder }) => {
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

      <td className="flex-1">
        <div className="justify-center xl:justify-end items-center">
          <p>{status}</p>
          <EditOrderStatusModal
            passedOrderID={_id as string}
            passedOrderStatus={status}
          />
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;
