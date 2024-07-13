import NoData from "@/components/shared/NoData";
import { useAppSelector } from "@/redux/hooks";
import { TCartItem } from "@/types/cart.type";
import CartTableRow from "./CartTableRow";
import { Button } from "@/components/ui/button";

const TabPCView = () => {
  const itemsInCart = useAppSelector(
    (currentState) => currentState.cart.cartItems
  );

  const total = Number(
    itemsInCart
      .reduce((partialSum, a) => partialSum + a?.price * a?.qty, 0)
      .toFixed(2)
  );

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

export default TabPCView;
