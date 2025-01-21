const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-fit bg-white p-1 space-y-3 rounded-3xl border">
      <div className="w-full bg-[#98b2992f] rounded-[20px] h-[300px]">
        <div className="w-full h-full rounded-[20px] " />
      </div>

      <div className="w-full flex flex-col gap-2 px-2 py-3">
        <div className="w-2/3 h-6 bg-[#98B299] animate-pulse rounded-lg"></div>

        <div className="w-full flex justify-between items-center gap-6">
          <div className="w-2/3 h-4 bg-[#98B299] animate-pulse rounded-lg"></div>

          <div className="w-2/3 h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
