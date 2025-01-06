const LazyLaodingCategoryCard = ({ index }: { index: number }) => {
  return (
    <div key={index} className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#98B299] size-14 mx-auto animate-pulse rounded-full"></div>

          <div className="w-2/3 h-6 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
        </div>

        <div className="w-full h-10 bg-[#98B299] animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

export default LazyLaodingCategoryCard;
