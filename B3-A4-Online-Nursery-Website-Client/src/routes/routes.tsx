import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductManagement from "@/pages/ProductAndCategoryManagement/ProductManagement";
import CategoryManagement from "@/pages/ProductAndCategoryManagement/CategoryManagement";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import Checkout from "@/pages/Checkout";
import SuccessPage from "@/pages/SuccessPage";
import StripePaymentPage from "@/pages/StripePaymentPage";
import ProductDetails from "@/pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products-page/:category",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "/all-products",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "/product-details/:_id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart-page",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout-page",
        element: <Checkout></Checkout>,
      },
      {
        path: "/stripe-page",
        element: <StripePaymentPage></StripePaymentPage>,
      },
      {
        path: "/success-page",
        element: <SuccessPage></SuccessPage>,
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
