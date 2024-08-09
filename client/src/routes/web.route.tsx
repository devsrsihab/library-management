import About from "../pages/About";
import ArchiveCategory from "../pages/ArchiveCategory";
import BookDetails from "../pages/BookDetails";
import BookPage from "../pages/BookPage";
import Borrowed from "../pages/Borrowed";
import Home from "../pages/Home";

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
  {
    path: "/books/:id",
    element: <BookDetails />,
  },
  {
    path: "/category/:catname",
    element: <ArchiveCategory />,
  },
];
