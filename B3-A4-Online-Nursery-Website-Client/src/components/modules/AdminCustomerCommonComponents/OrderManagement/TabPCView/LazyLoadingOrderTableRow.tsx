const LazyLoadingOrderTableRow = ({ index }: { index: number }) => {
  return (
    <tr
      key={index}
      className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
    >
      <td className="flex-1 p-3 justify-between items-center">
        <div className="w-full h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 p-3 font-semibold text-[#5D7E5F]">
        <div className="w-1/4 h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 p-3">
        <div className="w-1/4 h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 p-3">
        <div className="w-1/4 h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 p-3">
        <div className="w-full h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>

      <td className="flex-1 p-3">
        <div className="w-full h-4 mx-auto bg-[#98B299] animate-pulse rounded-lg"></div>
      </td>
    </tr>
  );
};

export default LazyLoadingOrderTableRow;
