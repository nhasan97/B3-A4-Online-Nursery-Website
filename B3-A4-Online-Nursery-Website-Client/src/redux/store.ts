import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cartSlice";
import customerReducer from "./features/customerSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: cartReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

// import { configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "./api/baseApi";
// import cartReducer from "./features/cartSlice";
// import customerReducer from "./features/customerSlice";
// // import {
// //   persistReducer,
// //   persistStore,
// //   FLUSH,
// //   REHYDRATE,
// //   PAUSE,
// //   PERSIST,
// //   PURGE,
// //   REGISTER,
// // } from "redux-persist";
// // import storage from "redux-persist/lib/storage";

// // const persistConfig = {
// //   key: "cart",
// //   storage,
// // };
// // const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// export const store = configureStore({
//   reducer: {
//     //add reducers here
//     [baseApi.reducerPath]: baseApi.reducer,
//     cart: cartReducer,
//     customer: customerReducer,
//   },
//   middleware: (getDefaultMiddlewares) =>
//     getDefaultMiddlewares().concat(baseApi.middleware),
//     //   {
//     //   serializableCheck: {
//     //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     //   },
//     // }
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
// // export const persistor = persistStore(store);
