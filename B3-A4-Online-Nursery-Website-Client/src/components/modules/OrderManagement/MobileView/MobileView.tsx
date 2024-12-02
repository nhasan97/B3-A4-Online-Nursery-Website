import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { IOrder } from "@/types/order.type";
import MobileViewOrderCard from "./MobileViewOrderCard";

const MobileView = ({
  loadingOrders,
  orders,
}: {
  loadingOrders: boolean;
  orders: IOrder[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingOrders ? (
        <Loading></Loading>
      ) : orders.length > 0 ? (
        orders.map((order: IOrder) => (
          <MobileViewOrderCard
            key={order?._id}
            order={order}
          ></MobileViewOrderCard>
        ))
      ) : (
        <NoData text={"No Order Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
