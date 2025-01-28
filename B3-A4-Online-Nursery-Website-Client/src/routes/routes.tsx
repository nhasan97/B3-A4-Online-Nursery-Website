import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/SitePages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductsPage from "@/pages/SitePages/ProductsPage";
import CartPage from "@/pages/SitePages/CartPage";
import SuccessPage from "@/pages/SitePages/SuccessPage";
import StripePaymentPage from "@/pages/SitePages/StripePaymentPage";
import ProductDetails from "@/pages/SitePages/ProductDetails";
import BlogDetails from "@/pages/SitePages/BlogDetails";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import BlogsPage from "@/pages/SitePages/BlogsPage";
import AboutUsPage from "@/pages/SitePages/AboutUsPage";
import ContactUsPage from "@/pages/SitePages/ContactUsPage";
import PlantCarePage from "@/pages/SitePages/PlantCarePage";
import CheckoutPage from "@/pages/SitePages/CheckoutPage";
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
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/checkout-page",
        element: (
          <ProtectedRoute role="user">
            <CheckoutPage />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/stripe-page",
        element: <StripePaymentPage />,
      },
      {
        path: "/success-page/:orderId",
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
