import Dashboard from "../pages/admin/AdminDashboard";
import CreateBook from "../pages/admin/book/CreateBook";
import EditBook from "../pages/admin/book/EditBook";
import AuthorBooks from "../pages/author/authorBook/AuthorBooks";

export const authorPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
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
        element: <AuthorBooks />,
      },
      {
        path: "books-edit/:id",
        element: <EditBook />,
      },
    ],
  },
];
