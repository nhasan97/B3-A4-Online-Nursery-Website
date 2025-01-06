const LazyLoadingOrderCard = ({ index }: { index: number }) => {
  return (
    <div className="h-fit bg-white p-5 space-y-3 rounded-md shadow-md">
      <div key={index} className="flex items-center justify-between gap-3">
        <div className="w-1/2 h-6 bg-[#98B299] animate-pulse rounded-lg"></div>

        <div className="w-1/2 h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
      </div>

      <div className="w-full h-10 bg-[#98B299] animate-pulse rounded-lg"></div>
    </div>
  );
};

export default LazyLoadingOrderCard;
