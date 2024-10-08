import About from "../pages/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import BookDetails from "../pages/BookDetails";
import BookPage from "../pages/BookPage";
import Borrowed from "../pages/Borrowed";
import Home from "../pages/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export const webPaths = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/borrowed",
    element: (
      <ProtectedRoute role={["author", "viewer"]}>
        <Borrowed />
      </ProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/books",
    element: <BookPage />,
  },
  {
    path: "/books/:id",
    element: <BookDetails />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
];
