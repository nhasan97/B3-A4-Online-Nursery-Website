import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import useProductContext from "@/hooks/useProductContext";
import userApi from "@/redux/features/user/userApi";
import { TUserExtended } from "@/types/auth.type";
import { TProduct, TProductContext } from "@/types/product.type";
import timeStampToDateConverter from "@/utils/timeStampToDateConverter";
import { FaEnvelope } from "react-icons/fa";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const AdminOverView = () => {
  const { isLoading: loadingCustomers, data: customers } =
    userApi.useGetAllUsersQuery({
      searchTerm: "",
      currentPage: 0,
      itemsPerPage: 4,
    });

  const { loadingProducts, products, loadingNumberOfProducts } =
    useProductContext() as TProductContext;

  const navigate = useNavigate();

  const data = [
    {
      name: "Dec 8",
      sales: 4000,
      purchase: 2400,
      amt: 2400,
    },
    {
      name: "Dec 9",
      sales: 3000,
      purchase: 1398,
      amt: 2210,
    },
    {
      name: "Dec 10",
      sales: 2000,
      purchase: 9800,
      amt: 2290,
    },
    {
      name: "Dec 11",
      sales: 2780,
      purchase: 3908,
      amt: 2000,
    },
    {
      name: "Dec 12",
      sales: 1890,
      purchase: 4800,
      amt: 2181,
    },
    {
      name: "Dec 13",
      sales: 2390,
      purchase: 3800,
      amt: 2500,
    },
    {
      name: "Dec 14",
      sales: 3490,
      purchase: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Overview</title>
        </Helmet>
        {/* <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin-dashboard/admin-overview">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div> */}

        <div className="w-full min-h-screen space-y-6">
          <Title title={"Overview"}></Title>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg">
              <div>
                <img
                  src="https://i.ibb.co.com/TtqcTNX/increase.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
              <div>
                <h3 className="text-2xl text-[#202634] font-bold">$4857</h3>
                <p className="text-base text-[#757575]">Total Sales</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg">
              <div>
                <img
                  src="https://i.ibb.co.com/WtYC7Xr/cart.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
              <div>
                <h3 className="text-2xl text-[#202634] font-bold">$456</h3>
                <p className="text-base text-[#757575]">Total Purchase</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg">
              <div>
                <img
                  src="https://i.ibb.co.com/4wrhphD/spending.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
              <div>
                <h3 className="text-2xl text-[#202634] font-bold">$768</h3>
                <p className="text-base text-[#757575]">Total Expence</p>
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-6 bg-white p-5 rounded-lg">
              <div>
                <img
                  src="https://i.ibb.co.com/NC3xcDd/revenue.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
              <div>
                <h3 className="text-2xl text-[#202634] font-bold">$3445</h3>
                <p className="text-base text-[#757575]">Total Revenue</p>
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <div className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg">
              <div>
                <p className="text-base text-[#f1f1f1]">Total Customers</p>
                <h3 className="text-3xl text-white font-bold">100</h3>
              </div>{" "}
              <div>
                <img
                  src="https://i.ibb.co.com/Yccq0JY/costumer.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
            </div> */}

            <div className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg">
              <div>
                <p className="text-base text-[#f1f1f1]">Total Orders</p>
                <h3 className="text-3xl text-white font-bold">35</h3>
              </div>{" "}
              <div>
                <img
                  src="https://i.ibb.co.com/BcWghB0/sustainable.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
            </div>

            <div className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg">
              <div>
                <p className="text-base text-[#f1f1f1]">Pending Orders</p>
                <h3 className="text-3xl text-white font-bold">5</h3>
              </div>{" "}
              <div>
                <img
                  src="https://i.ibb.co.com/LkZ1dxP/clock-1.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
            </div>

            <div className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg">
              <div>
                <p className="text-base text-[#f1f1f1]">Delivered Orders</p>
                <h3 className="text-3xl text-white font-bold">24</h3>
              </div>{" "}
              <div>
                <img
                  src="https://i.ibb.co.com/QNH7QkB/delivered.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
            </div>

            <div className="w-full bg-[#98b299] flex justify-between items-center gap-6 p-5 rounded-lg">
              <div>
                <p className="text-base text-[#f1f1f1]">Canceled Orders</p>
                <h3 className="text-3xl text-white font-bold">2</h3>
              </div>{" "}
              <div>
                <img
                  src="https://i.ibb.co.com/9gSgnsK/cancelled.png"
                  alt=""
                  className="size-[80px]"
                />
              </div>
            </div>
          </div>

          <div className="w-full h-full flex justify-between items-center gap-6">
            <div className="flex-1 bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
              {loadingCustomers ? (
                <Loading></Loading>
              ) : customers.data?.length > 0 ? (
                <table className="w-full">
                  {/* head */}
                  <thead>
                    <tr className="flex justify-between items-center text-center text-[#757575] p-5 border-b">
                      <th className="flex-2">Customer</th>
                      <th className="flex-1">Message</th>
                      <th className="flex-1">Sent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {customers.data?.map((customer: TUserExtended) => (
                      <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
                        <td className="flex-2 flex flex-col justify-center items-center gap-2">
                          <div className="flex justify-start items-center gap-3">
                            <img
                              src={customer.imageUrl}
                              alt=""
                              className="size-14 rounded-full object-fill object-center"
                            />
                            <div className="">
                              <p className="font-semibold text-[#5D7E5F]">
                                {customer.name}
                              </p>
                              <p className="text-sm text-[#757575]">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="flex-1">
                          <Button className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full">
                            <FaEnvelope />
                          </Button>
                        </td>

                        <td className="flex-1">
                          {timeStampToDateConverter(customer.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoData text={"No Customer Found"}></NoData>
              )}
            </div>

            <div className="flex-1 bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
              {loadingProducts || loadingNumberOfProducts ? (
                <Loading></Loading>
              ) : products?.length > 0 ? (
                <table className="w-full">
                  {/* head */}
                  <thead>
                    <tr className="flex  justify-between items-center text-[#757575] p-5 border-b">
                      <th className="flex-1">Image</th>
                      <th className="flex-1">Title</th>
                      <th className="flex-1">Price</th>
                      <th className="flex-1">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row  */}
                    {products?.slice(0, 3).map((product: TProduct) => (
                      <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
                        <td className="flex-1 justify-between items-center">
                          <img
                            src={product?.image}
                            className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
                          ></img>
                        </td>

                        <td className="flex-1 font-semibold text-[#5D7E5F]">
                          {product?.title}
                        </td>

                        <td className="flex-1">{product?.price}</td>

                        <td className="flex-1">{product?.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}

              <Button
                className="bg-white text-[#5D7E5F] text-lg rounded-full my-6 mx-auto hover:bg-transparent"
                onClick={() => navigate("/admin-dashboard/products")}
              >
                View All Plants
              </Button>
            </div>
          </div>

          <div className="bg-white p-5">
            <p className="text-2xl font-bold">Sales & Purchase</p>

            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart data={data} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="purchase"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                >
                  <LabelList position="top" offset={10} />
                </Line>
                <Line type="monotone" dataKey="sales" stroke="#82ca9d">
                  <LabelList position="top" offset={10} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AdminOverView;
