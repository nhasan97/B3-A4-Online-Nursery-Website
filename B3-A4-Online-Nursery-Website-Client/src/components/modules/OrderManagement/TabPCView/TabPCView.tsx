import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { IOrder } from "@/types/order.type";
import OrderTableRow from "./OrderTableRow";

const TabPCView = ({
  loadingOrders,
  orders,
}: {
  loadingOrders: boolean;
  orders: IOrder[];
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      {loadingOrders ? (
        <Loading></Loading>
      ) : orders?.length > 0 ? (
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
            {orders?.map((order: IOrder) => (
              <OrderTableRow key={order?._id} order={order} />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData text={"No Order Found"}></NoData>
      )}
    </div>
  );
};

export default TabPCView;
