import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductManagement from "@/pages/ProductAndCategoryManagement/ProductManagement";
import CategoryManagement from "@/pages/ProductAndCategoryManagement/CategoryManagement";

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
      {
        path: "categories",
        element: <CategoryManagement></CategoryManagement>,
      },
    ],
  },
]);

export default router;
