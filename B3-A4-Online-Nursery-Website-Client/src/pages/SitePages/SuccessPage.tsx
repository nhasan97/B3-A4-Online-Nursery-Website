import Container from "@/components/layouts/rootLayout/Container";
import successGif from "../../assets/images/success.gif";
import SiteTitle from "@/components/shared/SiteTitle";
import { useParams } from "react-router-dom";
import orderApi from "@/redux/api/orderApi";
import Loading from "@/components/shared/Loading";
import { TCartItem } from "@/types/cart.type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";

const SuccessPage = () => {
  const loadedOrderId = useParams();

  const { isLoading: loadingOrder, data: loadedOrder } =
    orderApi.useGetSpecificOrderQuery(loadedOrderId?.orderId);

  return (
    <div className="w-full h-full">
      <Container>
        <div className="w-full min-h-screen 2xl:h-[calc(100vh-64px)]">
          <SiteTitle title={"Order Placed Successfully"}></SiteTitle>

          <div className="w-full h-full flex flex-col xl:flex-row gap-6 px-2 py-2 md:px-10 md:py-5 mt-6">
            <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] bg-[#F7F7F7] flex flex-col justify-center items-center gap-6 rounded-lg">
              <div className="w-full h-[60%] flex flex-col justify-center items-center">
                <img
                  src={successGif}
                  alt=""
                  className="w-full h-full rounded-t-lg"
                />
              </div>

              <div className="w-full h-[40%] flex flex-col justify-center items-center gap-6 p-5">
                <p className="text-[#505050] text-2xl font-medium">
                  Thank you for the order
                </p>

                <div className="space-x-2">
                  <Link to="/all-products">
                    <Button className="bg-[#5D7E5F] text-white text-base sm:text-lg rounded-full -mt-6">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button className="bg-[#98b2992f] text-base md:text-lg text-[#5D7E5F] hover:text-[#98b299] rounded-full">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] border backdrop-blur-md flex flex-col p-5 xl:p-10 rounded-lg">
              {loadingOrder ? (
                <Loading />
              ) : (
                <div className="space-y-6 overflow-y-auto">
                  <div className="space-y-4">
                    <p className="text-[#505050] text-2xl font-medium">
                      Order #{loadedOrder?.data?.orderId}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-[#808080] text-base leading-7">
                        Estimated Delivery on{" "}
                        {timeStampToDateConverter(
                          loadedOrder?.data?.estimatedDelivery
                        )}
                      </p>
                      <p className="text-[#808080] text-base leading-7">
                        {loadedOrder?.data?.status === "Pending" && (
                          <p className="w-fit mx-auto py-2 px-4 bg-gray-100 text-gray-700 rounded-full">
                            {loadedOrder?.data?.status}
                          </p>
                        )}
                        {loadedOrder?.data?.status === "Processing" && (
                          <p className="w-fit mx-auto py-2 px-4 bg-orange-100 text-orange-600 rounded-full">
                            {loadedOrder?.data?.status}
                          </p>
                        )}
                        {loadedOrder?.data?.status === "Delivered" && (
                          <p className="w-fit mx-auto py-2 px-4 bg-green-100 text-green-700 rounded-full">
                            {loadedOrder?.data?.status}
                          </p>
                        )}
                        {loadedOrder?.data?.status === "Canceled" && (
                          <p className="w-fit mx-auto py-2 px-4 bg-red-100 text-red-600 rounded-full">
                            {loadedOrder?.data?.status}
                          </p>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#505050] text-2xl font-medium">
                      Customer Details
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Name :{" "}
                      </span>{" "}
                      {loadedOrder?.data?.name}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Email :{" "}
                      </span>
                      {loadedOrder?.data?.email}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Phone :{" "}
                      </span>
                      {loadedOrder?.data?.phone}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Address :{" "}
                      </span>
                      {loadedOrder?.data?.address}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#505050] text-2xl font-medium">Items</p>
                    <table className="w-full border">
                      {/* head */}
                      <thead>
                        <tr className="w-full flex justify-between items-center text-[#757575] text-center p-5 border-b">
                          <th className="flex-1">Product</th>
                          <th className="flex-1">Qty</th>
                          <th className="flex-1">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <div className="h-[300px] overflow-y-auto">
                          {loadedOrder?.data?.items?.map((item: TCartItem) => (
                            <tr
                              key={item?._id}
                              className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
                            >
                              <td className="flex-1">
                                <div className="flex flex-col justify-center items-center gap-2">
                                  <img
                                    src={item?.image}
                                    alt=""
                                    className="size-16 rounded-lg"
                                  />
                                  <p>{item?.title}</p>
                                </div>
                              </td>
                              <td className="flex-1">{item?.qty}</td>
                              <td className="flex-1">${item?.price}</td>
                            </tr>
                          ))}
                        </div>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[#505050] text-2xl font-medium">
                      Payment Details
                    </p>

                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Total Bill :{" "}
                      </span>{" "}
                      ${loadedOrder?.data?.totalAmount}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Payment Method :{" "}
                      </span>
                      {loadedOrder?.data?.paymentMethod}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Payment Status :{" "}
                      </span>
                      {loadedOrder?.data?.paymentStatus}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Paid Amount :{" "}
                      </span>
                      ${loadedOrder?.data?.paid}
                    </p>
                    <p className="text-[#808080] text-base leading-7">
                      <span className="text-[#696969] font-semibold">
                        Transaction ID :{" "}
                      </span>
                      {loadedOrder?.data?.transactionID}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SuccessPage;
