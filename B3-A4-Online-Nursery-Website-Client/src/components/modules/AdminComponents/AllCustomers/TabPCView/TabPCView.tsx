import { TUserExtended } from "@/types/auth.type";
import CustomerTableRow from "./CustomerTableRow";
import NoData from "@/components/shared/NoData";
import LazyLoadingCustomerTableRow from "./LazyLoadingCustomerTableRow";

const TabPCView = ({
  loadingCustomers,
  customers,
}: {
  loadingCustomers: boolean;
  customers: TUserExtended[];
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
            <th className="flex-1">Customer</th>
            <th className="flex-1">Email</th>
            <th className="flex-1">Cell</th>
            <th className="flex-1">Address</th>
            <th className="flex-1">Joined On</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {loadingCustomers ? (
            Array.from({ length: 10 }).map((_, index) => (
              <LazyLoadingCustomerTableRow index={index} />
            ))
          ) : customers?.length > 0 ? (
            customers?.map((customer: TUserExtended) => (
              <CustomerTableRow key={customer?._id} customer={customer} />
            ))
          ) : (
            <NoData text={"No Customer Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
