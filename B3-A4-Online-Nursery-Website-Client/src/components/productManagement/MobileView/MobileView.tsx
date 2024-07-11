import Loading from "@/components/shared/Loading";
import MobileViewProductCard from "./MobileViewProductCard";
import NoData from "@/components/shared/NoData";

const MobileView = ({ loadingProducts, products }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingProducts ? (
        <Loading></Loading>
      ) : products!.data?.length > 0 ? (
        products!.data?.map((product) => (
          <MobileViewProductCard
            key={product._id}
            {...product}
          ></MobileViewProductCard>
        ))
      ) : (
        <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
