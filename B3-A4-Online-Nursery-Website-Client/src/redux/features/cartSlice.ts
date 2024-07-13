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
    // toggleTodoStatus: (currentState, action: PayloadAction<string>) => {
    //   const task = currentState.todos.find(
    //     (todo) => todo.id === action.payload
    //   );
    //   task!.isCompleted = !task?.isCompleted;
    //   currentState.todos.sort((a, b) =>
    //     a.isCompleted > b.isCompleted
    //       ? 1
    //       : a.isCompleted < b.isCompleted
    //       ? -1
    //       : 0
    //   );
    // },
    // filterTodos: (currentState, action: PayloadAction<string>) => {
    //   const status = action.payload === "pending" ? false : true;
    //   currentState.todos = currentState.todos.filter(
    //     (todo) => todo.isCompleted === status
    //   );
    // },
  },
});

export const { addToCart, removeItem, editQty } = cartSlice.actions;

export default cartSlice.reducer;
