import { IOrder } from "@/types/order.type";
import MobileViewOrderDetailsModal from "./MobileViewOrderDetailsModal";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";
import EditOrderStatusModal from "../EditOrderStatusModal";

const MobileViewOrderCard = ({ order }: { order: IOrder }) => {
  const { _id, estimatedDelivery, status } = order;

  return (
    <div className="h-fit bg-white p-5 space-y-3 rounded-md shadow-md">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[#5D7E5F] text-lg font-semibold">
          #{order?.orderId}
        </h2>
        <p className="text-sm">{timeStampToDateConverter(estimatedDelivery)}</p>
      </div>

      <div className="flex-1 flex justify-center items-center text-center bg-[#98b2992f] rounded-l-full">
        <MobileViewOrderDetailsModal
          key={order?._id}
          order={order}
        ></MobileViewOrderDetailsModal>

        <EditOrderStatusModal
          passedOrderID={_id as string}
          passedOrderStatus={status}
        />
      </div>
    </div>
  );
};

export default MobileViewOrderCard;
