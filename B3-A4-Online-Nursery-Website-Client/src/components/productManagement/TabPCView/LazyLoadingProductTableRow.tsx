const LazyLoadingProductTableRow = ({ index }: { index: number }) => {
  return (
    <tr
      key={index}
      className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
    >
      <td className="flex-1 justify-between items-center">
        <div className="bg-[#98B299] size-14 mx-auto animate-pulse rounded-full"></div>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">
        <div className="w-2/3 h-6 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1">
        <div className="size-4 bg-[#98B299] mx-auto animate-pulse rounded-full"></div>
      </td>

      <td className="flex-1">
        <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1">
        <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1">
        <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 flex justify-between items-center">
        <div className="size-4 bg-[#98B299] mx-auto animate-pulse rounded-full"></div>

        <div className="size-4 bg-[#98B299] mx-auto animate-pulse rounded-full"></div>
      </td>
    </tr>
  );
};

export default LazyLoadingProductTableRow;
