import { TCartItem, TState } from "@/types/cart.type";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: TState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (currentState, action: PayloadAction<TCartItem>) => {
      currentState.cartItems.push(action.payload);
    },
    editQty: (
      currentState,
      action: PayloadAction<{ _id?: string; qty: number }>
    ) => {
      const matchedItem = currentState.cartItems.find(
        (item) => item._id === action.payload._id
      );
      matchedItem!.qty = action.payload.qty;
    },
    removeItem: (currentState, action: PayloadAction<string>) => {
      currentState.cartItems = currentState.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    removeAllItemsFromCart: (currentState) => {
      currentState.cartItems = [];
    },
  },
});

export const { addToCart, removeItem, editQty, removeAllItemsFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
