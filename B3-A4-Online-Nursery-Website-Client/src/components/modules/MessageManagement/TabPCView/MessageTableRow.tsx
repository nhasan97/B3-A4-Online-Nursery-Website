import { TMessage, TMessageContext } from "@/types/message.type";
import { dateToISO } from "@/utils/dateToISO";
import MessageDetailsModal from "../MessageDetailsModal";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import useMessageContext from "@/hooks/useMessageContext";
import SendReplyModal from "../SendReplyModal";

const MessageTableRow = ({
  message,
  caller,
}: {
  message: TMessage;
  caller?: string;
}) => {
  const { handleDeleteMessage } = useMessageContext() as TMessageContext;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      {caller === "admin-received" && (
        <td className="flex-1 flex flex-col justify-center items-center gap-2">
          <div className="w-full flex justify-start items-center gap-3">
            <img
              src={message?.sendersImage}
              alt=""
              className="size-14 rounded-full object-fill object-center"
            />
            <div className="text-left">
              <p className="font-semibold text-[#5D7E5F]">{message.name}</p>
              <p className="text-sm text-[#757575]">{message.email}</p>
            </div>
          </div>
        </td>
      )}

      {caller === "admin-sent" && (
        <td className="flex-1 flex flex-col justify-center items-center gap-2">
          <p className="text-sm text-[#757575]">{message.sentTo}</p>
        </td>
      )}

      <td className="flex-1">
        <MessageDetailsModal message={message} caller={caller as string} />
      </td>

      <td className="flex-1">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="flex items-center gap-3">
            <p> {dateToISO(message?.createdAt).formattedDate}</p>

            <p>{dateToISO(message?.createdAt).formattedTime}</p>
          </div>
        </div>
      </td>

      {caller === "admin-received" && (
        <td className="flex-1 flex justify-center items-center gap-3">
          <div
            className={`size-2 rounded-full ${
              message?.status === "Replied" ? "bg-green-600" : "bg-[#dd6c20]"
            }`}
          ></div>
          <p>{message?.status}</p>
        </td>
      )}

      <td className="flex-1">
        {caller === "admin-received" && <SendReplyModal message={message} />}{" "}
        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteMessage(message?._id as string)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default MessageTableRow;
