const LazyLoadingCustomerCard = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="h-fit bg-white flex justify-between gap-3 p-5 rounded-md shadow-md"
    >
      <div className="space-y-2">
        <div className="bg-[#98B299] size-14 mx-auto animate-pulse rounded-full"></div>

        <div className="w-full h-6 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </div>

      <div className="size-6 bg-[#98B299] animate-pulse rounded-full"></div>
    </div>
  );
};

export default LazyLoadingCustomerCard;
