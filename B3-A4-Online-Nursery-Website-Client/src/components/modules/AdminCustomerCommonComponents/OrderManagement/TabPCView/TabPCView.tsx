import NoData from "@/components/shared/NoData";
import { IOrder } from "@/types/order.type";
import OrderTableRow from "./OrderTableRow";
import LazyLoadingOrderTableRow from "./LazyLoadingOrderTableRow";

const TabPCView = ({
  loadingOrdersCount,
  loadingOrders,
  orders,
  caller,
}: {
  loadingOrdersCount: boolean;
  loadingOrders: boolean;
  orders: IOrder[];
  caller?: string;
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
            <th className="flex-1">Order ID</th>
            <th className="flex-1">Customer Details</th>
            <th className="flex-1">Items</th>
            <th className="flex-1">Payment Details</th>
            <th className="flex-1">Estimated Delivery</th>
            <th className="flex-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {loadingOrders || loadingOrdersCount ? (
            Array.from({ length: 10 }).map((_, index: number) => (
              <LazyLoadingOrderTableRow index={index} />
            ))
          ) : orders?.length > 0 ? (
            orders?.map((order: IOrder) => (
              <OrderTableRow key={order?._id} order={order} caller={caller} />
            ))
          ) : (
            <NoData text={"No Order Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
