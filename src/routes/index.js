import LogIn from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Information from "../pages/Information";
import AccountProtection from "../pages/AccountProtection";
import History from "../pages/HistoryLogin";

const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/", component: LogIn },
  { path: "/signup", component: SignUp },
  { path: "/info", component:Information},
  { path: "/acc_protect", component:AccountProtection},
  { path: "/history", component:History},
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
