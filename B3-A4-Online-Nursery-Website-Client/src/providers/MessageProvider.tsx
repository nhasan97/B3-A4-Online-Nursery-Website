/* eslint-disable @typescript-eslint/no-explicit-any */
import messageApi from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { TChildren } from "@/types/children.type";
import { TMessageContext } from "@/types/message.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { verifyToken } from "@/utils/verifyToken";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const MessageContext = createContext<TMessageContext | undefined>(
  undefined
);

const MessageProvider = ({ children }: TChildren) => {
  //loading message count
  //   const { isLoading: loadingMessageCount, data: loadedMessageCount } =
  //     messageApi.useGetMessageCountQuery(undefined);

  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  //States for browsing
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [messageType, setMessageType] = useState("received");

  //loading Messages
  const { isLoading: loadingMessages, data: loadedMessages } =
    messageApi.useGetMessagesQuery({
      searchTerm,
      sort,
      currentPage,
      itemsPerPage,
      messageType,
      userEmail: (user as TUser)?.email || "",
    });

  const resetBrower = () => {
    setSearchTerm("");
    setSort("");
    setMessageType("received");
  };

  const resetPagination = () => {
    setItemsPerPage(5);
    setCurrentPage(0);
  };

  const [deleteMessage] = messageApi.useDeleteMessageMutation();

  const handleDeleteMessage = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: catchAsync(async () => {
          const res = await deleteMessage(_id).unwrap();
          displaySuccessToast(res);
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const messageInfo: TMessageContext = {
    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    messageType,
    setMessageType,

    loadingMessages,
    messages: loadedMessages?.data?.limitQuery,
    totalMessageCount: loadedMessages?.data?.totalMessageCount,

    resetBrower,
    resetPagination,
    handleDeleteMessage,
  };

  return (
    <MessageContext.Provider value={messageInfo}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
