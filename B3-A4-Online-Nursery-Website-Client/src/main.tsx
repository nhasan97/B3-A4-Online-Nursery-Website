import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "sonner";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiFillInfoCircle,
} from "react-icons/ai";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
      <Toaster
        icons={{
          success: <AiFillCheckCircle className="text-xl text-green-800" />,
          info: <AiFillInfoCircle className="text-xl text-blue-500" />,
          warning: (
            <AiFillExclamationCircle className="text-xl text-yellow-500" />
          ),
          error: <AiFillCloseCircle className="text-xl text-red-800" />,
          // loading: <LoadingIcon />,
        }}
      />
    </HelmetProvider>
  </React.StrictMode>
);
