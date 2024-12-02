import { TCustomerState } from "@/types/customer.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TCustomerState = {
  customer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (currentState, action) => {
      currentState.customer = action.payload;
    },
  },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
