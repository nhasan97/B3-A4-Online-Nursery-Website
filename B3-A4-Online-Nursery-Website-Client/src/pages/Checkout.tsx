import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import orderApi from "@/redux/api/orderApi";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const itemsInCart = useAppSelector(
    (currentState) => currentState.cart.cartItems
  );

  const total = Number(
    itemsInCart
      .reduce((partialSum, a) => partialSum + a?.price * a?.qty, 0)
      .toFixed(2)
  );

  const navigate = useNavigate();

  const [placeOrder] = orderApi.usePlaceOrderMutation();
  //   const dispatch = useAppDispatch();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const orderId = "wer78r7r4r";

    const order = {
      orderId,
      name,
      email,
      phone,
      address,
      Items: itemsInCart,
      totalAmount: total,
      paymentMethod: payment === "cod" ? "COD" : "Stripe",
      paymentStatus: "Due",
      paid: 0,
    };

    // dispatch(setCustomer(customerDetails));

    if (payment === "cod") {
      placeOrder(order);
      navigate("/success-page");
    } else {
      navigate("/stripe-page");
    }
  };

  return (
    <div className="w-full h-full">
      <Container>
        <div className="sm:w-2/3 h-full mx-auto flex flex-col gap-10">
          <SiteTitle title={"Checkout"}></SiteTitle>

          <form className="grid gap-4 py-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left text-[#757575]">Name</Label>
              <Input
                id="name"
                className="col-span-3"
                required
                onBlur={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left text-[#757575]">Email</Label>
              <Input
                type="email"
                id="email"
                className="col-span-3"
                required
                onBlur={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left text-[#757575]">Phone</Label>
              <Input
                id="phone"
                required
                className="col-span-3"
                onBlur={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left text-[#757575]">Address</Label>
              <Input
                id="address"
                required
                className="col-span-3"
                onBlur={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-left text-[#757575]">Payment Method</Label>
              <Select required onValueChange={(value) => setPayment(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cod">Cash On Delivery</SelectItem>
                    <SelectItem value="sp">Pay with Strip</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
            >
              <p>Place Order</p>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
