import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
// import { persistor,PersistGate } from "redux-persist/integration/react";

import CustomToaster from "./components/shared/CustomToaster.tsx";
import CategoryProvider from "./providers/CategoryProvider.tsx";
import ProductProvider from "./providers/ProductProvider.tsx";
import CartProvider from "./providers/CartProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
        {/* </PersistGate> */}
      </Provider>
      <CustomToaster></CustomToaster>
    </HelmetProvider>
  </React.StrictMode>
);
