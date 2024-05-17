import LogIn from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/", component: LogIn },
  { path: "/signup", component: SignUp },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
