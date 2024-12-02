import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Root from "@/components/layouts/rootLayout/Root";
import DashboardLayout from "@/components/layouts/dashboardLayout/DashboardLayout";
import ProductManagement from "@/pages/AdminPages/ProductManagement";
import CategoryManagement from "@/pages/AdminPages/CategoryManagement";
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
import AdminOverView from "@/pages/AdminPages/AdminOverView";
import BlogManagement from "@/pages/AdminPages/BlogManagement";
import OrderManagement from "@/pages/AdminPages/OrderManagement";
import AllCustomers from "@/pages/AdminPages/AllCustomers";
import ProfileManagement from "@/pages/AdminPages/ProfileManagement";
import CheckoutPage from "@/pages/CheckoutPage";

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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="admin">
            <AdminOverView />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-overview",
        element: (
          <ProtectedRoute role="admin">
            <AdminOverView />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute role="admin">
            <OrderManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-customers",
        element: (
          <ProtectedRoute role="admin">
            <AllCustomers />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute role="admin">
            <ProductManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute role="admin">
            <CategoryManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "blogs",
        element: (
          <ProtectedRoute role="admin">
            <BlogManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role="admin">
            <ProfileManagement />
          </ProtectedRoute>
        ),
      },
    ],
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
