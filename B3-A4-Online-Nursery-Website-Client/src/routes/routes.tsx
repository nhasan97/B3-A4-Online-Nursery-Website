import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductManagement from "@/pages/ProductAndCategoryManagement/ProductManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <ProductManagement></ProductManagement>,
      },
      {
        path: "products",
        element: <ProductManagement></ProductManagement>,
      },
    ],
  },
]);

export default router;
