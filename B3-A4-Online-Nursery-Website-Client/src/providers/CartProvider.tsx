import { addToCart, editQty, removeItem } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TCartContext, TCartItem } from "@/types/cart.type";
import { TChildren } from "@/types/children.type";
import { TProduct } from "@/types/product.type";
import { createContext } from "react";
import { toast } from "sonner";

export const CartContext = createContext<TCartContext | undefined>(undefined);

const CartProvider = ({ children }: TChildren) => {
  //loading cart items
  const itemsInCart = useAppSelector(
    (currentState) => currentState.cart.cartItems
  );

  const dispatch = useAppDispatch();

  //handling add to cart
  const handleAddToCart = (product: TProduct) => {
    if (product.stock > 0) {
      const matchedItem = itemsInCart.find(
        (item) => item?._id === product?._id
      );

      if (matchedItem && matchedItem?.qty + 1 <= product?.stock) {
        const payload = {
          _id: matchedItem?._id,
          qty: matchedItem?.qty + 1,
        };
        dispatch(editQty(payload));
        toast.success("Product quantity increased in cart");
      } else if (product?.stock - 1 > 0) {
        const item = {
          _id: product?._id,
          title: product?.title,
          price: product?.price,
          stock: product?.stock,
          qty: 1,
          image: product?.image,
        };
        dispatch(addToCart(item));
        toast.success("Product successfully added to cart");
      }
    } else {
      toast.error("Out of Stock");
    }
  };

  //handling edit
  const handleEditQty = (editedQty: number, item: TCartItem) => {
    if (item?.qty + editedQty > 0 && item?.qty + editedQty <= item?.stock) {
      const payload = {
        _id: item?._id,
        qty: item?.qty + editedQty,
      };
      dispatch(editQty(payload));
    } else if (item?.qty + editedQty > item?.stock) {
      toast.error("No more left");
    }
  };

  //handling delete
  const handleDeleteCartItem = (_id: string) => {
    toast.warning("Are youAre you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: async () => {
          dispatch(removeItem(_id));
          toast.success("Product removed from cart", {
            duration: 2000,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  //calculating total bill
  const total = Number(
    itemsInCart
      .reduce((partialSum, a) => partialSum + a?.price * a?.qty, 0)
      .toFixed(2)
  );

  const cartInfo: TCartContext = {
    itemsInCart,
    total,
    handleAddToCart,
    handleEditQty,
    handleDeleteCartItem,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
