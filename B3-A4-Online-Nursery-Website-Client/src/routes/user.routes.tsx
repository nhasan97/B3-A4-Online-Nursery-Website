import UserOverView from "@/pages/UserPages/UserOverView";
import ProtectedRoute from "./ProtectedRoute";
import CsutomerOrderManagement from "@/pages/UserPages/CsutomerOrderManagement";
// import ProfileManagement from "@/pages/AdminPages/ProfileManagement";

const userDashboardPaths = [
  {
    index: true,
    element: (
      <ProtectedRoute role="user">
        <UserOverView />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-overview",
    element: (
      <ProtectedRoute role="user">
        <UserOverView />
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
  //   {
  //     path: "profile",
  //     element: (
  //       <ProtectedRoute role="admin">
  //         <ProfileManagement />
  //       </ProtectedRoute>
  //     ),
  //   },
];

export default userDashboardPaths;
