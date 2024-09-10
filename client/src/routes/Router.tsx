import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import Login from "../pages/auth/LoginDraft";
import { webPaths } from "./web.route";
import AdminApp from "../AdminApp";
import { viewerPaths } from "./viewer.route";
import { authorPaths } from "./author.route";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // The layout component
    children: routeGenerator(webPaths), // Routes generated for web paths
  },
  {
    path: "/admin",
    element: <ProtectedRoute role={["admin"]}><AdminApp /></ProtectedRoute>,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/viewer",
    element: <ProtectedRoute role={["viewer"]}><AdminApp /></ProtectedRoute>,
    children: routeGenerator(viewerPaths),
  },
  {
    path: "/author",
    element: <ProtectedRoute role={["author"]}><AdminApp /></ProtectedRoute>,
    children: routeGenerator(authorPaths),
  },
  {
    path: "/admin/auth/login",
    element: <Login />,
  },
]);

export default router;
