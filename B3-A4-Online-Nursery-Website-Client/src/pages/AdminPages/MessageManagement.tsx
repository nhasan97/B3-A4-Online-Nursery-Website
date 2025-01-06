import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import TabPCView from "@/components/modules/MessageManagement/TabPCView/TabPCView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useMessageContext from "@/hooks/useMessageContext";
import { TMessageContext } from "@/types/message.type";
import { Helmet } from "react-helmet-async";
import "../../components/cssStyles/Tab.css";
import Pagination from "@/components/shared/Pagination";
import MessageBrowser from "@/components/modules/MessageManagement/MessageBrowser";
import MobileView from "@/components/modules/MessageManagement/MobileView/MobileView";

const MessageManagement = () => {
  const {
    setSearchTerm,
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    setMessageType,

    loadingMessages,
    messages,
    totalMessageCount,

    resetBrower,
  } = useMessageContext() as TMessageContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Messages</title>
        </Helmet>

        <div className="w-full h-full flex flex-col justify-between gap-6">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Messages</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full flex justify-between items-center">
            <MessageBrowser
              setSearchTerm={setSearchTerm}
              sort={sort}
              setSort={setSort}
              resetBrowser={resetBrower}
            />
          </div>

          <Tabs defaultValue="received" className="w-full h-[68%] 2xl:h-[80%]">
            <TabsList className="TabsList bg-[#98b2992f]">
              <TabsTrigger
                className="TabsTrigger"
                value="received"
                onClick={() => setMessageType("received")}
              >
                Received Messages
              </TabsTrigger>
              <TabsTrigger
                className="TabsTrigger"
                value="sent"
                onClick={() => setMessageType("sent")}
              >
                Sent Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="received"
              className="w-full h-[calc(100%-45px)]"
            >
              {/*tab pc view */}
              <TabPCView
                loadingMessages={loadingMessages}
                messages={messages}
                caller={"admin-received"}
              />

              {/* mobile view */}
              <MobileView
                loadingMessages={loadingMessages}
                messages={messages}
                caller={"admin-received"}
              />
            </TabsContent>

            <TabsContent value="sent" className="w-full h-[calc(100%-45px)]">
              {/*tab pc view */}
              <TabPCView
                loadingMessages={loadingMessages}
                messages={messages}
                caller={"admin-sent"}
              />

              {/* mobile view */}
              <MobileView
                loadingMessages={loadingMessages}
                messages={messages}
                caller={"admin-sent"}
              />
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <Pagination
            loadingDataLength={loadingMessages}
            dataLength={totalMessageCount}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default MessageManagement;
