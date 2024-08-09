import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { facultyPaths } from "./faculty.route";
import { studentPaths } from "./student.route";
import Login from "../pages/auth/Login";
import { webPaths } from "./web.route";
import AdminApp from "../AdminApp";

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
    path: "/faculty",
    element: <AdminApp />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <AdminApp />,
    children: routeGenerator(studentPaths),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
