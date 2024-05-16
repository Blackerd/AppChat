import LogIn from "../pages/Login";
import Home from "../pages/Home";
const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/", component: LogIn },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
