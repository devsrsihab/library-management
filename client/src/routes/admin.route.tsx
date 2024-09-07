import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/userManagement/Users";
import CreateUsers from "../pages/admin/userManagement/CreateUsers";

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
      // {
      //   name: "Authors",
      //   path: "author-list",
      //   element: <Authors />,
      // },
      // {
      //   name: "Users",
      //   path: "user-list",
      //   element: <Users />,
      // },
    ],
  },
];
