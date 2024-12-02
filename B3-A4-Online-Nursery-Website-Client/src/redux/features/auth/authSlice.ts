import { TAuthState } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (currentState, action) => {
      const { user, token } = action.payload;
      currentState.user = user;
      currentState.token = token;
    },
    logout: (currentState) => {
      currentState.user = null;
      currentState.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
