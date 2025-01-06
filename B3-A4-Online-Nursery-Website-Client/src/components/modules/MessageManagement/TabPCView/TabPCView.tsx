import { TMessage } from "@/types/message.type";
import MessageTableRow from "./MessageTableRow";
import NoData from "@/components/shared/NoData";
import LazyLoadingMessageTableRow from "./LazyLoadingMessageTableRow";

const TabPCView = ({
  loadingMessages,
  messages,
  caller,
}: {
  loadingMessages: boolean;
  messages: TMessage[];
  caller?: string;
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-full overflow-y-auto rounded-lg border">
      <table className="w-full h-full">
        {/* head */}
        <thead>
          <tr className="flex  justify-between items-center text-center text-[#757575] p-5 border-b">
            {caller === "admin-received" && <th className="flex-1">Sender</th>}
            {caller === "admin-sent" && <th className="flex-1">Sent To</th>}
            <th className="flex-1">Message</th>
            <th className="flex-1">Sent</th>
            {caller === "admin-received" && <th className="flex-1">Status</th>}
            <th className="flex-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {loadingMessages ? (
            Array.from({ length: 10 }).map((_, index) => (
              <LazyLoadingMessageTableRow
                index={index}
                caller={caller as string}
              />
            ))
          ) : messages?.length > 0 ? (
            messages?.map((message: TMessage) => (
              <MessageTableRow
                key={message?._id}
                message={message}
                caller={caller}
              />
            ))
          ) : (
            <NoData text={"No Message Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
