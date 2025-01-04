import NoData from "@/components/shared/NoData";
import messageApi from "@/redux/api/messageApi";
import { useAppSelector } from "@/redux/hooks";
import { TMessage } from "@/types/message.type";
import { dateToISO } from "@/utils/dateToISO";
import { verifyToken } from "@/utils/verifyToken";
import MessageDetailsModal from "../MessageManagement/MessageDetailsModal";
import { TUser } from "@/types/auth.type";
import { FaEnvelope } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MessagesOverview = ({ caller }: { caller: string }) => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { isLoading: loadingMessages, data: loadedMessages } =
    messageApi.useGetMessagesQuery({
      searchTerm: "",
      sort: "-createdAt",
      currentPage: 0,
      itemsPerPage: 3,
      messageType: "received",
      userEmail: (user as TUser)?.email || "",
    });

  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-white w-full h-[80%] overflow-x-auto rounded-lg">
      <h1 className="text-2xl font-semibold p-5">Latest Messages</h1>

      <table className="w-full">
        <thead className="w-full">
          <tr className="w-full flex justify-between items-center text-left text-[#757575] p-5 border-b">
            <th className="w-1/2">Sender</th>
            <th className="w-1/4">Message</th>
            <th className="w-1/4">Sent</th>
          </tr>
        </thead>
        <tbody>
          {loadingMessages ? (
            Array.from({ length: 3 }).map((_, index: number) => (
              <tr
                key={index}
                className="w-full flex justify-between items-center text-left text-[#808080] p-5 border-b"
              >
                <td className="w-1/2 flex flex-col justify-center items-center gap-2">
                  <div className="w-full flex items-center gap-3">
                    <div className="bg-[#98B299] size-14 animate-pulse rounded-full"></div>

                    <div className="w-1/2 space-y-3">
                      <div className="w-full h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
                      <div className="w-full h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
                    </div>
                  </div>
                </td>

                <td className="w-1/4">
                  <Button className="bg-transparent hover:bg-transparent text-2xl sm:text-xl text-[#98B299] mx-auto">
                    <FaEnvelope />
                  </Button>
                </td>

                <td className="w-1/4">
                  <div className="h-4 bg-[#98B299] animate-pulse rounded-lg"></div>
                </td>
              </tr>
            ))
          ) : loadedMessages.data?.limitQuery?.length > 0 ? (
            loadedMessages.data?.limitQuery?.map((message: TMessage) => (
              <tr className="w-full flex justify-between items-center text-[#808080] text-left p-5 border-b">
                <td className="w-1/2 flex flex-col justify-center items-center gap-2">
                  <div className="w-full flex justify-start items-center gap-3">
                    <img
                      src={message?.sendersImage}
                      alt=""
                      className="size-14 rounded-full object-fill object-center"
                    />
                    <div className="">
                      <p className="font-semibold text-[#5D7E5F]">
                        {message?.name}
                      </p>
                      <p className="text-sm text-[#757575]">{message?.email}</p>
                    </div>
                  </div>
                </td>

                <td className="w-1/4">
                  <MessageDetailsModal
                    message={message}
                    caller="admin-received"
                  />
                </td>

                <td className="w-1/4">
                  {dateToISO(message?.createdAt).formattedDate}
                </td>
              </tr>
            ))
          ) : (
            <NoData text={"No Messages Found"}></NoData>
          )}
        </tbody>
      </table>

      {caller === "admin-received" && (
        <Button
          className="group bg-white text-[#5D7E5F] text-lg rounded-full my-6 mx-auto hover:bg-transparent"
          onClick={() => navigate("/admin-dashboard/messages")}
        >
          View All Messages{" "}
          <FaArrowRightLong className="ml-2 group-hover:translate-x-2 transition-all" />
        </Button>
      )}
    </div>
  );
};

export default MessagesOverview;
