import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBook from "../pages/admin/book/CreateBook";
import Books from "../pages/admin/book/Books";
import EditBook from "../pages/admin/book/EditBook";
import Categories from "../pages/admin/category/Categories";
import EditCategory from "../pages/admin/category/EditCategory";
import CreateCategory from "../pages/admin/category/CreateCategory";
import CreateUsers from "../pages/admin/userManagement/CreateUsers";
import Users from "../pages/admin/userManagement/Users";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  {
    name: "Books",
    children: [
      {
        name: "Create Book",
        path: "create-book",
        element: <CreateBook />,
      },
      {
        name: "Books",
        path: "book-list",
        element: <Books />,
      },
      {
        path: "books-edit/:id",
        element: <EditBook />,
      },
    ],
  },

  {
    name: "Categories",
    children: [
      {
        name: "Create Category",
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        name: "Categories",
        path: "categories-list",
        element: <Categories />,
      },
      {
        path: "categories-edit/:id",
        element: <EditCategory />,
      },
    ],
  },
  {
    name: "User Managment",
    children: [
      {
        name: "Create User",
        path: "create-user",
        element: <CreateUsers />,
      },
      {
        name: "Users",
        path: "user-list",
        element: <Users />,
      },
    ],
  },
];
