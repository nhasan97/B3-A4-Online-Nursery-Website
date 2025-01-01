import MobileViewCustomerCard from "./MobileViewCustomerCard";
import NoData from "@/components/shared/NoData";
import { TUserExtended } from "@/types/auth.type";
import LazyLoadingCustomerCard from "./LazyLoadingCustomerCard";

const MobileView = ({
  loadingCustomers,
  customers,
}: {
  loadingCustomers: boolean;
  customers: TUserExtended[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingCustomers ? (
        Array.from({ length: 10 }).map((_, index) => (
          <LazyLoadingCustomerCard index={index} />
        ))
      ) : customers.length > 0 ? (
        customers.map((customer: TUserExtended) => (
          <MobileViewCustomerCard
            key={customer?._id}
            customer={customer}
          ></MobileViewCustomerCard>
        ))
      ) : (
        <NoData text={"No Customer Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
