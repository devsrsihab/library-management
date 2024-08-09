import About from "../pages/About";
import BookPage from "../pages/BookPage";
import Borrowed from "../pages/Borrowed";
import Home from "../pages/home/Home";

export const webPaths = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/borrowed",
    element: <Borrowed />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/books",
    element: <BookPage />,
  },
];
