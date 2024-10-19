import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { webPaths } from "./web.route";
import AdminApp from "../AdminApp";
import { viewerPaths } from "./viewer.route";
import { authorPaths } from "./author.route";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFound from "../components/ui/NotFound";
import Error from "../components/ui/Error";

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // The layout component
    errorElement: <Error />,

    children: routeGenerator(webPaths), // Routes generated for web paths
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={["admin"]}>
        <AdminApp />
      </ProtectedRoute>
    ),
    errorElement: <Error />,

    children: routeGenerator(adminPaths),
  },
  {
    path: "/viewer",
    element: (
      <ProtectedRoute role={["viewer"]}>
        <AdminApp />
      </ProtectedRoute>
    ),
    errorElement: <Error />,

    children: routeGenerator(viewerPaths),
  },
  {
    path: "/author",
    element: (
      <ProtectedRoute role={["author"]}>
        <AdminApp />
      </ProtectedRoute>
    ),
    errorElement: <Error />,

    children: routeGenerator(authorPaths),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
