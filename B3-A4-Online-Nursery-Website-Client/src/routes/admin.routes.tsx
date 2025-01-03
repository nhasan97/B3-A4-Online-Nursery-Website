import AdminOverView from "@/pages/AdminPages/AdminOverView";
import ProtectedRoute from "./ProtectedRoute";
import OrderManagement from "@/pages/AdminPages/OrderManagement";
import AllCustomers from "@/pages/AdminPages/AllCustomers";
import ProductManagement from "@/pages/AdminPages/ProductManagement";
import CategoryManagement from "@/pages/AdminPages/CategoryManagement";
import BlogManagement from "@/pages/AdminPages/BlogManagement";
import ProfileManagement from "@/pages/AdminPages/ProfileManagement";
import AddBlogPage from "@/components/modules/BlogManagement/AddBlogPage";
import BlogDeatilsPage from "@/components/modules/BlogManagement/BlogDeatilsPage";
import EditBlogPage from "@/components/modules/BlogManagement/EditBlogPage";
import MessageManagement from "@/pages/AdminPages/MessageManagement";

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
