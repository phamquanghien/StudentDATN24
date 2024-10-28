import Internship from '@/pages/Internship';
import ForgotPassword from '@/pages/Authentication/ForgotPassword';
import Login from '@/pages/Authentication/Login';
import VerifyEmail from '@/pages/Authentication/VerifyEmail';
import Dashboard from '@/pages/Dashboard';
import Department from '@/pages/Department';
import Advisor from '@/pages/Advisor';
import Student from '@/pages/Student';

//Public Routes
const publicRoutes = [
  { path: '/login', component: Login },
  { path: '/verify-email', component: VerifyEmail },
  { path: '/forgot-password', component: ForgotPassword },
];

//Private Routes
const privateRoutes = [
  { path: '/', component: Dashboard },
  { path: '/internship', component: Internship },
  { path: '/department', component: Department },
  { path: '/advisor', component: Advisor },
  { path: '/student', component: Student },
];

export { publicRoutes, privateRoutes };
