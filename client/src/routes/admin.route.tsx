import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/userManagement/Users";
import CreateUsers from "../pages/admin/userManagement/CreateUsers";
import CreateBook from "../pages/admin/book/CreateBook";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Users",
        path: "create-users",
        element: <CreateUsers />,
      },
      {
        name: "Users",
        path: "user-list",
        element: <Users />,
      },
    ],
  },
  {
    name: "Books",
    children: [
      {
        name: "Create Book",
        path: "create-book",
        element: <CreateBook />,
      },
      // {
      //   name: "Books",
      //   path: "book-list",
      //   element: <Books />,
      // },
    ],
  },
];
