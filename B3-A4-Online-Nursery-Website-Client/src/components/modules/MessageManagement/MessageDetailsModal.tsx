import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TMessage } from "@/types/message.type";
import { FaEnvelope } from "react-icons/fa";
import SendReplyModal from "./SendReplyModal";

const MessageDetailsModal = ({
  message,
  caller,
}: {
  message: TMessage;
  caller: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <FaEnvelope />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#696969] text-xl font-bold">
            Message from {message?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-[#808080] text-base leading-7">
            <span className="font-bold text-[#5a5a5a]">Subject:</span>{" "}
            {message?.subject}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="font-bold text-[#5a5a5a]">From:</span>{" "}
            {message?.name}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="font-bold text-[#5a5a5a]">To:</span>{" "}
            {message?.sentTo}
          </p>
          <p className="text-[#808080] text-base leading-7">
            <span className="font-bold text-[#5a5a5a]">Message:</span>{" "}
            {message?.message}
          </p>
        </div>

        {caller === "admin-received" && <SendReplyModal message={message} />}

        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsModal;
