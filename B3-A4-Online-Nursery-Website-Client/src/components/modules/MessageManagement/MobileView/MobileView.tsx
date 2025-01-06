import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import { TMessage } from "@/types/message.type";
import MobileViewMessageCard from "./MobileViewMessageCard";

const MobileView = ({
  loadingMessages,
  messages,
  caller,
}: {
  loadingMessages: boolean;
  messages: TMessage[];
  caller?: string;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingMessages ? (
        <Loading></Loading>
      ) : messages?.length > 0 ? (
        messages?.map((message: TMessage) => (
          <MobileViewMessageCard
            key={message?._id}
            message={message}
            caller={caller as string}
          ></MobileViewMessageCard>
        ))
      ) : (
        <NoData text={"No Message Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
