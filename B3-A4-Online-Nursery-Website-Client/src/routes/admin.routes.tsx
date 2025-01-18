import AdminOverView from "@/pages/AdminPages/AdminOverView";
import ProtectedRoute from "./ProtectedRoute";
import OrderManagement from "@/pages/AdminPages/OrderManagement";
import AllCustomers from "@/pages/AdminPages/AllCustomers";
import ProductManagement from "@/pages/AdminPages/ProductManagement";
import CategoryManagement from "@/pages/AdminPages/CategoryManagement";
import BlogManagement from "@/pages/AdminPages/BlogManagement";
import ProfileManagement from "@/pages/AdminPages/ProfileManagement";
import AddBlogPage from "@/components/modules/AdminComponents/BlogManagement/AddBlogPage";
import BlogDeatilsPage from "@/components/modules/AdminComponents/BlogManagement/BlogDeatilsPage";
import EditBlogPage from "@/components/modules/AdminComponents/BlogManagement/EditBlogPage";
import MessageManagement from "@/pages/AdminPages/MessageManagement";
import AddProductPage from "@/components/modules/AdminComponents/productManagement/AddProductPage";
import EditProductPage from "@/components/modules/AdminComponents/productManagement/EditProductPage/EditProductPage";

const adminDashboardPaths = [
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
    path: "add-products",
    element: (
      <ProtectedRoute role="admin">
        <AddProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit-products/:_id",
    element: (
      <ProtectedRoute role="admin">
        <EditProductPage />
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
    path: "blog-details/:_id",
    element: (
      <ProtectedRoute role="admin">
        <BlogDeatilsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "add-blogs",
    element: (
      <ProtectedRoute role="admin">
        <AddBlogPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "edit-blogs/:_id",
    element: (
      <ProtectedRoute role="admin">
        <EditBlogPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "messages",
    element: (
      <ProtectedRoute role="admin">
        <MessageManagement />
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
];

export default adminDashboardPaths;
