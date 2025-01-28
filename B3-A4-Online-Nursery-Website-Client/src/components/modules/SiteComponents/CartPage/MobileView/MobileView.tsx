import NoData from "@/components/shared/NoData";
import CartMobileCard from "./CartMobileCard";
import { TCartContext, TCartItem } from "@/types/cart.type";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useCartContext from "@/hooks/useCartContext";

const MobileView = () => {
  const { itemsInCart, total } = useCartContext() as TCartContext;

  return (
    <div className="sm:hidden w-full h-screen flex flex-col gap-6">
      <div className="bg-white block sm:hidden w-full h-[90%] overflow-y-auto rounded-lg border">
        {itemsInCart.length > 0 ? (
          <div>
            {itemsInCart.map((item: TCartItem) => (
              <CartMobileCard key={item._id} item={item}></CartMobileCard>
            ))}
          </div>
        ) : (
          <NoData text={"No Items Found"}></NoData>
        )}
      </div>

      <div className="w-full rounded-lg border p-3 space-y-6">
        <h5 className="text-[#757575] text-xl font-semibold">Grand Total</h5>

        <div className="text-[#808080] text-base space-y-3">
          <p className="flex justify-between">
            <span className="font-medium text-[#757575]">Total -</span>
            <span>${total}</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-[#757575]">
              Delivery Charge -
            </span>
            <span>$80</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium text-[#757575]">Grand Total -</span>
            <span>${(total + Number(80)).toFixed(2)}</span>
          </p>
        </div>

        <Link to="/checkout-page">
          <Button
            className="w-full bg-[#5D7E5F] text-lg  mt-6 rounded-full"
            disabled={itemsInCart.length <= 0}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileView;
