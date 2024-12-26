import { MessageContext } from "@/providers/MessageProvider";
import { useContext } from "react";

const useMessageContext = () => {
  const messageInfo = useContext(MessageContext);

  return messageInfo;
};

export default useMessageContext;
