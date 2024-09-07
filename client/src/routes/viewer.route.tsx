import Dashboard from "../pages/admin/AdminDashboard";
import ViewerBorrowings from "../pages/viewer/ViewerBorrowed/ViewerBorrowings";

export const viewerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Books",
    children: [
      {
        name: "Borrowed Books",
        path: "borrowed-books",
        element: <ViewerBorrowings />,
      },
    ],
  },
];
