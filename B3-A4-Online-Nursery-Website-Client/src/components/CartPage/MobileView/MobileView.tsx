import NoData from "@/components/shared/NoData";
import { useAppSelector } from "@/redux/hooks";
import CartMobileCard from "./CartMobileCard";
import { TCartItem } from "@/types/cart.type";
import { Button } from "@/components/ui/button";

const MobileView = () => {
  const itemsInCart = useAppSelector(
    (currentState) => currentState.cart.cartItems
  );

  const total = Number(
    itemsInCart
      .reduce((partialSum, a) => partialSum + a?.price * a?.qty, 0)
      .toFixed(2)
  );

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
            <span>${total + Number(80)}</span>
          </p>
        </div>

        <Button className="w-full bg-[#5D7E5F] text-lg rounded-full">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default MobileView;
