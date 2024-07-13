import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    //add reducers here
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
