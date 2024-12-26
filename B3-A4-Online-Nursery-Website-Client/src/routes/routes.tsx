import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductsPage from "@/pages/ProductsPage";
import CartPage from "@/pages/CartPage";
import SuccessPage from "@/pages/SuccessPage";
import StripePaymentPage from "@/pages/StripePaymentPage";
import ProductDetails from "@/pages/ProductDetails";
import BlogDetails from "@/pages/BlogDetails";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import BlogsPage from "@/pages/BlogsPage";
import AboutUsPage from "@/pages/AboutUsPage";
import ContactUsPage from "@/pages/ContactUsPage";
import WhishListPage from "@/pages/WhishListPage";
import PlantCarePage from "@/pages/PlantCarePage";
import CheckoutPage from "@/pages/CheckoutPage";
import adminDashboardPaths from "./admin.routes";
import userDashboardPaths from "./user.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products-page/:category",
        element: <ProductsPage />,
      },
      {
        path: "/all-products",
        element: <ProductsPage />,
      },
      {
        path: "/product-details/:_id",
        element: <ProductDetails />,
      },
      {
        path: "/all-blogs",
        element: <BlogsPage />,
      },
      {
        path: "/blog-details/:_id",
        element: <BlogDetails />,
      },
      {
        path: "/all-blogs/blog-details/:_id",
        element: <BlogDetails />,
      },
      {
        path: "/whishlist-page",
        element: (
          <ProtectedRoute role="user">
            <WhishListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart-page",
        element: (
          // <ProtectedRoute role="user">
          <CartPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/checkout-page",
        element: <CheckoutPage />,
      },
      {
        path: "/stripe-page",
        element: <StripePaymentPage />,
      },
      {
        path: "/success-page",
        element: <SuccessPage />,
      },
      {
        path: "/plantcare-page",
        element: <PlantCarePage />,
      },
      {
        path: "/about-page",
        element: <AboutUsPage />,
      },
      {
        path: "/contact-page",
        element: <ContactUsPage />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: adminDashboardPaths,
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: userDashboardPaths,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
