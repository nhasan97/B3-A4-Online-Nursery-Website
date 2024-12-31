import orderApi from "@/redux/api/orderApi";

const AccountsOverview = () => {
  const { isLoading: loadingTotalSales, data: loadedTotalSales } =
    orderApi.useGetTotalSaleQuery(undefined);

  const overviewData = [
    {
      title: "Total Sales",
      data: loadedTotalSales?.data[0]?.totalSales,
      imageSrc: "https://i.ibb.co.com/TtqcTNX/increase.png",
    },
    {
      title: "Total Purchase",
      data: 456,
      imageSrc: "https://i.ibb.co.com/WtYC7Xr/cart.png",
    },
    {
      title: "Total Expence",
      data: 5675,
      imageSrc: "https://i.ibb.co.com/4wrhphD/spending.png",
    },
    {
      title: "Total Revenue",
      data: loadedTotalSales?.data[0]?.totalSales - (456 + 5675),
      imageSrc: "https://i.ibb.co.com/NC3xcDd/revenue.png",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {loadingTotalSales
        ? Array.from({ length: 4 }).map((_, index: number) => (
            <div
              key={index}
              className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg"
            >
              <div className="flex-1 bg-[#98B299] size-[80px] animate-pulse rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-[#98B299] animate-pulse rounded-lg"></div>
                <div className="h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
              </div>
            </div>
          ))
        : overviewData.map((data) => (
            <div
              key={data.title}
              className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg"
            >
              <div>
                <img src={data.imageSrc} alt="" className="size-[80px]" />
              </div>
              <div>
                <h3 className="text-2xl text-[#202634] font-bold">
                  {data.data}
                </h3>
                <p className="text-base text-[#757575]">{data.title}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default AccountsOverview;
