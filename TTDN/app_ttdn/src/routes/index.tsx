import Internship from "@/pages/Internship";
import ForgotPassword from "@/pages/Authentication/ForgotPassword";
import Login from "@/pages/Authentication/Login";
import VerifyEmail from "@/pages/Authentication/VerifyEmail";
import Dashboard from "@/pages/Dashboard";
import Department from "@/pages/Department";
import Advisor from "@/pages/Advisor";
import NotFoundPage from "@/pages/Authentication/NotFoundPage.tsx";
import Council from "@/pages/Council";

//Public Routes
const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/verify-email", component: VerifyEmail },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "*", component: NotFoundPage },
];

//Private Routes
const privateRoutes = [
  { path: "/", component: Dashboard },
  { path: "/internship", component: Internship },
  { path: "/department", component: Department },
  { path: "/advisor", component: Advisor },
  { path: "/council", component: Council },
];

export { publicRoutes, privateRoutes };
