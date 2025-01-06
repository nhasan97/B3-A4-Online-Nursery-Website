const LazyLoadingMessageTableRow = ({
  index,
  caller,
}: {
  index: number;
  caller: string;
}) => {
  return (
    <tr
      key={index}
      className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
    >
      {caller === "admin-received" && (
        <td className="flex-1 flex flex-col justify-center items-center gap-2">
          <div className="w-full flex justify-start items-center gap-3">
            <div className="bg-[#98B299] size-14 animate-pulse rounded-full"></div>

            <div className="w-1/2 space-y-3">
              <div className="w-full h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
              <div className="w-full h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
            </div>
          </div>
        </td>
      )}

      {caller === "admin-sent" && (
        <td className="flex-1">
          <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
        </td>
      )}

      <td className="flex-1">
        <div className="size-4 bg-[#98B299] mx-auto animate-pulse rounded-full"></div>
      </td>

      <td className="flex-1">
        <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
      </td>

      {caller === "admin-received" && (
        <td className="flex-1 ">
          <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
        </td>
      )}

      {caller === "admin-received" && (
        <td className="flex-1 flex justify-center gap-8">
          <div className="size-4 bg-[#98B299] animate-pulse rounded-full"></div>

          <div className="size-4 bg-[#98B299] animate-pulse rounded-full"></div>
        </td>
      )}

      {caller === "admin-sent" && (
        <td className="flex-1">
          <div className="size-4 mx-auto bg-[#98B299] animate-pulse rounded-full"></div>
        </td>
      )}
    </tr>
  );
};

export default LazyLoadingMessageTableRow;
