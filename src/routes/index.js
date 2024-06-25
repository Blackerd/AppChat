import LogIn from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Information from "../pages/Information";
import AccountProtection from "../pages/AccountProtection";
import History from "../pages/HistoryLogin";
import ChangeEmail from "../pages/EmailChange";
import ChangePassword from "../pages/PasswordChange";
import ChangeNumber from "../pages/NumberChange";
import PersonalInfoChange from "../pages/personalInfoChange";

const publicRoutes = [
  { path: "/home", component: Home },
  { path: "/", component: LogIn },
  { path: "/signup", component: SignUp },
  { path: "/info", component: Information },
  { path: "/acc_protect", component: AccountProtection },
  { path: "/history", component: History },
  { path: "/email", component: ChangeEmail },
  { path: "/pass", component: ChangePassword },
  { path: "/number", component: ChangeNumber },
  { path: "/personalinfo", component: PersonalInfoChange },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
