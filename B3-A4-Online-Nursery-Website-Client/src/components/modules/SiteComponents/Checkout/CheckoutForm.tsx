/* eslint-disable @typescript-eslint/no-explicit-any */

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
} from "../../../ui/select";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "@/redux/api/orderApi";
import { toast } from "sonner";
// import useReloadWarner from "@/hooks/useReloadWarner";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { removeAllItemsFromCart } from "@/redux/features/cartSlice";

const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  // useReloadWarner();
  const [name, setName] = useState((user as TUser)?.name);
  const [email] = useState((user as TUser)?.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { itemsInCart, total } = useCartContext() as TCartContext;

  const date = new Date();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [placeOrder] = orderApi.usePlaceOrderMutation();

  useEffect(() => {
    if (total && total > 0) {
      axios
        .post(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/v1/orders/create-payment-intent`,
          {
            price: (total + Number(80)).toFixed(2),
          }
        )
        .then((res) => {
          setClientSecret(res.data.data.clientSecret);
        });
    }
  }, [total]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    }

    let order: any = {};

    if (payment === "cod") {
      order = {
        orderId: "BB-" + Math.floor(Math.random() * 10000000 + 1),
        name: name || "Not Found",
        email: email || "Not Found",
        phone: phone || "Not Found",
        address: address || "Not Found",
        items: itemsInCart || "Not Found",
        totalAmount: Number((total + Number(80)).toFixed(2)) || 0,
        paymentMethod: "COD",
        paymentStatus: "Due",
        paid: 0,
        transactionID: "N/A",
        estimatedDelivery: date.setDate(date.getDate() + 5),
        status: "Pending",
      };
    } else if (payment === "sp") {
      if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }

      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast.error(error.message);
      }

      const { paymentIntent, error: paymentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: (user as TUser)?.name || "Not Found",
              email: (user as TUser)?.email || "Not Found",
            },
          },
        });

      if (paymentError) {
        toast.error(paymentError.message);
      } else {
        if (paymentIntent.status === "succeeded") {
          // setTransactionID(paymentIntent?.id);

          order = {
            orderId: "BB-" + Math.floor(Math.random() * 10000000 + 1),
            name: name || "Not Found",
            email: email || "Not Found",
            phone: phone || "Not Found",
            address: address || "Not Found",
            items: itemsInCart || "Not Found",
            totalAmount: Number((total + Number(80)).toFixed(2)) || 0,
            paymentMethod: "Stripe",
            paymentStatus: paymentIntent?.id ? "Paid" : "Due",
            paid: Number((total + Number(80)).toFixed(2)) || 0,
            transactionID: paymentIntent?.id || "Not Found",
            estimatedDelivery: date.setDate(date.getDate() + 5),
            status: "Pending",
          };
        }
      }
    }

    try {
      const res = await placeOrder(order).unwrap();

      if (res.success && res.statusCode === 200) {
        dispatch(removeAllItemsFromCart());
        toast.success(res.message);
        navigate(`/success-page/${res?.data[0]?._id}`);
      }
    } catch (err: any) {
      toast.error(err.data.message);
    }
  };

  return (
    // <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] bg-[#98b29950] backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg">
    <div className="w-full xl:h-screen 2xl:h-[95%] bg-[#98b29950] backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg">
      <form
        className="bg-[#98b2998c] p-5 rounded-xl shadow-lg"
        onSubmit={onSubmit}
      >
        <h1 className="text-white text-lg md:text-2xl font-semibold mb-6">
          Shipping Info
        </h1>

        <div className="space-y-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left text-gray-600 font-semibold">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              required
              defaultValue={name}
              onBlur={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left text-gray-600 font-semibold">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              className="col-span-3"
              required
              value={(user as TUser)?.email}
              readOnly
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left text-gray-600 font-semibold">
              Phone
            </Label>
            <Input
              id="phone"
              required
              className="col-span-3"
              onBlur={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left text-gray-600 font-semibold">
              Address
            </Label>
            <Input
              id="address"
              required
              className="col-span-3"
              onBlur={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-left text-gray-600 font-semibold">
              Payment Method
            </Label>
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

          <div
            className={`${
              payment === "sp"
                ? "grid grid-cols-4 items-center gap-4"
                : "hidden"
            } `}
          >
            <Label className="text-left text-gray-600 font-semibold">
              Payment Method
            </Label>
            <div className="col-span-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "black",
                      "::placeholder": {
                        color: "black",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 mt-6 rounded-full"
        >
          <p>Place Order</p>
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
