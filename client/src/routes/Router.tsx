import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { facultyPaths } from "./faculty.route";
import Login from "../pages/auth/LoginDraft";
import { webPaths } from "./web.route";
import AdminApp from "../AdminApp";
import { viewerPaths } from "./viewer.route";
import { authorPaths } from "./author.route";

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // The layout component
    children: routeGenerator(webPaths), // Routes generated for web paths
  },
  {
    path: "/admin",
    element: <AdminApp />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/viewer",
    element: <AdminApp />,
    children: routeGenerator(viewerPaths),
  },
  {
    path: "/faculty",
    element: <AdminApp />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/author",
    element: <AdminApp />,
    children: routeGenerator(authorPaths),
  },
  {
    path: "/admin/auth/login",
    element: <Login />,
  },
]);

export default router;
