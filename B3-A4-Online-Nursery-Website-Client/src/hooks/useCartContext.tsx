import { CartContext } from "@/providers/CartProvider";
import { useContext } from "react";

const useCartContext = () => {
  const cartInfo = useContext(CartContext);
  return cartInfo;
};

export default useCartContext;
