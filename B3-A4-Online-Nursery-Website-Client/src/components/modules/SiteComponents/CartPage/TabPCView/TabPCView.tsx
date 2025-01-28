/* eslint-disable @typescript-eslint/no-explicit-any */
import NoData from "@/components/shared/NoData";

import { TCartContext, TCartItem } from "@/types/cart.type";
import CartTableRow from "./CartTableRow";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useCartContext from "@/hooks/useCartContext";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

const TabPCView = () => {
  const { itemsInCart, total } = useCartContext() as TCartContext;

  const navigate = useNavigate();

  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const handleNavigateToCheckout = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    } else {
      navigate("/checkout-page");
    }
  };

  return (
    <div className="hidden w-full h-[80%] sm:flex gap-6">
      <div className="bg-white hidden sm:block w-[80%] h-full overflow-y-auto rounded-lg border">
        {itemsInCart.length > 0 ? (
          <table className="w-full">
            {/* head */}
            <thead>
              <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
                <th className="flex-1">Image</th>
                <th className="flex-1">Title</th>
                <th className="flex-1">Price</th>
                <th className="flex-1">Qty</th>
                <th className="flex-1">SubTotal</th>
                <th className="flex-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {itemsInCart.map((item: TCartItem) => (
                <CartTableRow key={item._id} item={item}></CartTableRow>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData text={"No Items Found"}></NoData>
        )}
      </div>

      <div className="w-[20%] rounded-lg border p-3 space-y-6">
        <h5 className="text-[#757575] text-2xl font-semibold">Grand Total</h5>

        <div className="text-[#808080] text-lg space-y-3">
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

        <Button
          className="w-full bg-[#5D7E5F] text-lg rounded-full mt-6"
          disabled={itemsInCart.length <= 0}
          onClick={() => handleNavigateToCheckout()}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default TabPCView;
