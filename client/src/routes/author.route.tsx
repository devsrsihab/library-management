import CreateBook from "../pages/admin/book/CreateBook";
import EditBook from "../pages/admin/book/EditBook";
import AuthorBooks from "../pages/author/authorBook/AuthorBooks";
import AuthorDashboard from "../pages/author/AuthorDashboard";

export const authorPaths = [
  {
    name: "Faculty",
    path: "dashboard",
    element: <AuthorDashboard />,
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
