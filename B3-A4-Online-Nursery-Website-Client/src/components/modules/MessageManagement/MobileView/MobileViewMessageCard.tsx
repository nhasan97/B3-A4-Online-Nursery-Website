import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { TMessage, TMessageContext } from "@/types/message.type";
import useMessageContext from "@/hooks/useMessageContext";
import MessageDetailsModal from "../MessageDetailsModal";

const MobileViewMessageCard = ({
  message,
  caller,
}: {
  message: TMessage;
  caller: string;
}) => {
  const { handleDeleteMessage } = useMessageContext() as TMessageContext;

  return (
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex justify-between items-center">
          {caller === "admin-received" && (
            <div className="flex items-center gap-3">
              <img
                src={message?.sendersImage}
                className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
              ></img>

              <h2 className=" text-[#5D7E5F] font-semibold ">
                {message?.name}
              </h2>
            </div>
          )}

          {caller === "admin-sent" && (
            <div className="flex items-center gap-3">
              <h2 className=" text-[#5D7E5F] font-semibold ">
                {message?.sentTo}
              </h2>
            </div>
          )}

          {caller === "admin-received" && (
            <div
              className={`size-2 rounded-full ${
                message?.status === "Replied" ? "bg-green-600" : "bg-[#dd6c20]"
              }`}
            ></div>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-l-full">
            <MessageDetailsModal message={message} caller={caller as string} />
          </div>

          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-r-full">
            <Button
              className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
              onClick={() => handleDeleteMessage(message?._id as string)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileViewMessageCard;
