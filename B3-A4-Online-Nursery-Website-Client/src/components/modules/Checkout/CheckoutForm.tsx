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
} from "../../ui/select";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "@/redux/api/orderApi";
import { toast } from "sonner";
// import useReloadWarner from "@/hooks/useReloadWarner";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  // useReloadWarner();
  const [name, setName] = useState("");
  const [email] = useState((user as TUser)?.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionID, setTransactionID] = useState("");

  const { itemsInCart, total } = useCartContext() as TCartContext;

  const date = new Date();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [placeOrder] = orderApi.usePlaceOrderMutation();

  useEffect(() => {
    // setPrice(fetchedTotalPrice);
    console.log(total);

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/orders/create-payment-intent`,
        {
          price: total,
        }
      )
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, [total]);

  console.log(clientSecret);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    }

    // const orderId = Math.round(Math.random() * 100000).toString();

    // dispatch(setCustomer(customerDetails));

    let order: any = {};

    if (payment === "cod") {
      order = {
        orderId: "BB-" + Math.floor(Math.random() * 10000000 + 1),
        name: name || "Not Found",
        email: email || "Not Found",
        phone: phone || "Not Found",
        address: address || "Not Found",
        items: itemsInCart || "Not Found",
        totalAmount: total || 0,
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

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.log("Error:", error);
        toast.error(error.message);
      } else {
        console.log("Payment Method:", paymentMethod);
        toast.error("");
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
        toast.error("");
        if (paymentIntent.status === "succeeded") {
          setTransactionID(paymentIntent?.id);

          order = {
            orderId: "BB-" + Math.floor(Math.random() * 10000000 + 1),
            name: name || "Not Found",
            email: email || "Not Found",
            phone: phone || "Not Found",
            address: address || "Not Found",
            items: itemsInCart || "Not Found",
            totalAmount: total || 0,
            paymentMethod: "Stripe",
            paymentStatus: "Due",
            paid: total || 0,
            transactionID: transactionID || "Not Found",
            estimatedDelivery: date.setDate(date.getDate() + 5),
            status: "Pending",
          };

          // let cartCarIds = [];

          // cartItems.map((item) => cartCarIds.push(item._id));

          // mutation.mutate({ payment, cartCarIds });
        }
      }
    }

    try {
      const res = await placeOrder(order).unwrap();
      if (res.success && res.statusCode === 200) {
        toast.success(res.message);
        navigate("/success-page");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
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
          value={(user as TUser)?.email}
          readOnly
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

      <div
        className={`${
          payment === "sp" ? "grid grid-cols-4 items-center gap-4" : "hidden"
        } `}
      >
        <Label className="text-left text-[#757575]">Payment Method</Label>
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

      <Button
        type="submit"
        className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
      >
        <p>Place Order</p>
      </Button>
    </form>
  );
};

export default CheckoutForm;