import orderApi from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { verifyToken } from "@/utils/verifyToken";

const OrderOverview = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { isLoading: loadingOrdersCount, data: ordersCount } =
    orderApi.useGetAllOrdersCountQuery((user as TUser)?.id);

  const {
    isLoading: loadingOrderCountByStatus,
    data: loadedOrderCountByStatus,
  } = orderApi.useGetOrderCountByStatusQuery((user as TUser).id);

  const overviewData = [
    {
      title: "Total Orders",
      data: ordersCount?.data,
      imageSrc: "https://i.ibb.co.com/BcWghB0/sustainable.png",
    },
    {
      title: "Pending Orders",
      data:
        loadedOrderCountByStatus?.data?.find(
          (item: { _id: string; count: number }) => item?._id === "Pending"
        )?.count || 0,
      imageSrc: "https://i.ibb.co.com/LkZ1dxP/clock-1.png",
    },
    {
      title: "Delivered Orders",
      data:
        loadedOrderCountByStatus?.data?.find(
          (item: { _id: string; count: number }) => item?._id === "Delivered"
        )?.count || 0,
      imageSrc: "https://i.ibb.co.com/QNH7QkB/delivered.png",
    },
    {
      title: "Canceled Orders",
      data:
        loadedOrderCountByStatus?.data?.find(
          (item: { _id: string; count: number }) => item?._id === "Canceled"
        )?.count || 0,
      imageSrc: "https://i.ibb.co.com/9gSgnsK/cancelled.png",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {loadingOrdersCount || loadingOrderCountByStatus
        ? Array.from({ length: 4 }).map((_, index: number) => (
            <div
              key={index}
              className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg"
            >
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-[#98B299] animate-pulse rounded-lg"></div>
                <div className="h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
              </div>
              <div className="flex-1 bg-[#98B299] size-[80px] animate-pulse rounded-lg"></div>
            </div>
          ))
        : overviewData.map((data) => (
            <div
              key={data?.title}
              className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg"
            >
              <div>
                <p className="text-base text-[#f1f1f1]">{data?.title}</p>
                <h3 className="text-3xl text-white font-bold">{data?.data}</h3>
              </div>
              <div>
                <img src={data?.imageSrc} alt="" className="size-[80px]" />
              </div>
            </div>
          ))}
    </div>
  );
};

export default OrderOverview;
