import CustomerOverview from "@/pages/CustomerPages/CustomerOverview";
import ProtectedRoute from "./ProtectedRoute";
import CsutomerOrderManagement from "@/pages/CustomerPages/CsutomerOrderManagement";
import WhishListPage from "@/pages/CustomerPages/WhishListPage";

// import ProfileManagement from "@/pages/AdminPages/ProfileManagement";

const userDashboardPaths = [
  {
    index: true,
    element: (
      <ProtectedRoute role="user">
        <CustomerOverview />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-overview",
    element: (
      <ProtectedRoute role="user">
        <CustomerOverview />
      </ProtectedRoute>
    ),
  },
  {
    path: "orders",
    element: (
      <ProtectedRoute role="user">
        <CsutomerOrderManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "whishlist-page",
    element: (
      <ProtectedRoute role="user">
        <WhishListPage />
      </ProtectedRoute>
    ),
  },
];

export default userDashboardPaths;
